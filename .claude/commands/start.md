# /project:start — Begin or resume training

You are the training session launcher. Your job is to find the user's next module, load the teaching engine, and deliver the lesson interactively.

**Arguments:** `$ARGUMENTS`

If `$ARGUMENTS` is provided and non-empty, treat it as a module ID (e.g. "2.3") and jump directly to that module instead of following the normal sequencing logic.

---

## Step 1: Load Progress

Read `progress.json` from the project root.

**If the file does not exist**, stop and tell the user:
> No curriculum found. Run `/project:init` first to generate your personalised curriculum.

Do not proceed further.

---

## Step 2: Check for First Run

Inspect the modules in `progress.json`. If **no modules** have status `in_progress` or `completed` (i.e. the user has never started any module), this is a first-time session.

In this case, read and follow the instructions in `.claude/commands/onboarding.md` to welcome the user before proceeding. After onboarding completes, continue to Step 3.

---

## Step 3: Find the Next Module

If `$ARGUMENTS` was provided as a module ID:
- Verify the module ID exists in `progress.json`. If not, list available module IDs and ask the user which one they meant.
- Use that module regardless of its current status.

Otherwise, find the next module automatically:
1. **First priority**: any module with status `in_progress` (resume interrupted session). If multiple exist, pick the one with the lowest ID.
2. **Second priority**: the first module with status `not_started`, ordered by ID (1.1 before 1.2 before 2.1).
3. **If all modules are completed**: congratulate the user on completing the entire curriculum. Suggest `/project:review` for spaced repetition, or `/project:add-content` to extend the curriculum with new modules.

---

## Step 4: Load Module Content

1. Read `progress.json` and update the target module's status to `in_progress` and set `started_at` to the current ISO 8601 timestamp (only if it was `not_started` — don't overwrite an existing `started_at`).
2. Determine the module's content file path. The module content lives in `docs-site/docs/`. Use the module ID and Glob to find the file matching `docs-site/docs/*/X.Y-*.md` where X.Y is the module ID.
3. Read the module content file.

If the file cannot be found, report the error and suggest the user run `/project:init` to regenerate, or check that the module ID is correct.

---

## Step 5: Load Training Delivery Skill

Read the following files to load the teaching engine:

1. `.claude/skills/training-delivery/SKILL.md` — the core teaching methodology
2. All files in `.claude/skills/training-delivery/reference/` — supporting reference material (use Glob to find `*.md` files in that directory)

If the skill files don't exist, fall back to these default teaching behaviours:
- Break the module into atomic concepts
- Deliver 2-4 paragraphs per concept with concrete examples
- Ask a checkpoint question after each concept (multiple choice or free-text)
- Wait for the user's answer before continuing
- Provide feedback on their answer (explain why correct/incorrect)
- Adapt pace based on accuracy
- End with a retrieval practice summary

---

## Step 6: Deliver the Module

Follow the training delivery skill's instructions to teach the module content. Key requirements:

- Deliver concepts one at a time — do NOT dump the entire module at once
- After each concept chunk, ask a plain-text checkpoint question in your message (do NOT use AskUserQuestion for individual checkpoints)
- Wait for and evaluate the user's response before proceeding
- If the user gets a question wrong, explain the correct answer and optionally revisit the concept
- Track which concepts the user struggled with
- When all concepts in the module are covered, run a brief session-close retrieval practice (2-3 questions covering the full module)

---

## Step 7: Complete the Module

After the user has successfully worked through all concepts and the session close:

1. Update `progress.json`:
   - Set the module's `status` to `completed`
   - Set `completed_at` to the current ISO 8601 timestamp
2. Write the updated `progress.json`.

---

## Step 8: Suggest Next Steps

After completing the module, tell the user:

1. **What they just completed** — module title and ID
2. **Next module** — identify the next `not_started` module by ID order. Show its title, type, and estimated time.
3. **Commands available**:
   - `/project:start` — continue to the next module
   - `/project:progress` — see overall completion status
   - `/project:review` — review previously completed modules (if any are due)
4. **If this was the last module**, congratulate them on completing the curriculum and suggest `/project:review` for retention.
