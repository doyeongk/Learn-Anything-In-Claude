# /project:review — Spaced repetition review

You are the spaced repetition review engine. Your job is to identify completed modules due for review, then deliver review sessions at the appropriate depth to strengthen retention.

---

## Step 1: Load Progress

Read `progress.json` from the project root.

**If the file does not exist**, stop and tell the user:
> No curriculum found. Run `/project:init` first to generate your curriculum.

---

## Step 2: Identify Modules Due for Review

Get the current date/time. For each module with status `completed`, check if it is due for a review by evaluating the following rules **in order**. A module qualifies for at most one review level.

### R1 — 1-day review
**Conditions (all must be true):**
- `completed_at` is at least 1 day (24 hours) ago
- The module's `reviews` array does NOT contain an entry with `"interval": "1d"`

### R2 — 7-day review
**Conditions (all must be true):**
- `completed_at` is at least 7 days ago
- The module's `reviews` array DOES contain an entry with `"interval": "1d"`
- The module's `reviews` array does NOT contain an entry with `"interval": "7d"`

### R3 — 30-day review
**Conditions (all must be true):**
- `completed_at` is at least 30 days ago
- The module's `reviews` array DOES contain an entry with `"interval": "7d"`
- The module's `reviews` array does NOT contain an entry with `"interval": "30d"`

### No review needed
If the module's `reviews` array contains entries for all three intervals (1d, 7d, 30d), it has completed the review cycle and needs no further review.

---

## Step 3: Handle No Reviews Due

If no modules are due for review, report that to the user:

```
All caught up — no reviews due right now.
```

Then calculate when the next review will be due:
- Find all completed modules that still have pending review milestones
- For each, compute when the next milestone will trigger (e.g. if completed 5 hours ago and no 1d review, it's due in ~19 hours)
- Report the soonest upcoming review

If all completed modules have finished all three review intervals, tell the user:
```
All completed modules have finished their review cycles. Complete more modules to generate new reviews.
```

Stop here — do not proceed to Step 4.

---

## Step 4: Prioritise and Present

Sort the due modules by urgency: **longest overdue first** (the module whose review milestone was triggered the longest ago should be reviewed first).

Show the user what's due:

```
REVIEWS DUE:

  R1 (1-day):
    1.1  Module Title — completed 2 days ago
    1.2  Module Title — completed 1 day ago

  R2 (7-day):
    1.3  Module Title — completed 10 days ago

  R3 (30-day):
    (none due)

Starting with module 1.1 (most overdue)...
```

---

## Step 5: Deliver Reviews

For each due module (in priority order), deliver the review. Process one module at a time.

### 5a: Load Module Content

1. Find the module content file using Glob: `docs-site/docs/*/X.Y-*.md`
2. Read the module content file.
3. Read `.claude/skills/training-delivery/SKILL.md` if it exists.
4. Read `.claude/skills/training-delivery/reference/delivery-mechanics.md` if it exists.

### 5b: Deliver at Appropriate Depth

The review depth increases with each interval — the learner should rely less on cues and more on their own recall.

#### R1 (1-day review) — Guided Recall
The goal is to reactivate the memory traces with support.

1. Briefly remind the user which module this is: "Let's review [Module Title] which you completed [time ago]."
2. For each key concept in the module (3-5 concepts):
   - Provide a **concept cue** — a brief phrase or context hint that points toward the concept without stating it directly
   - Ask a **multiple-choice question** testing that concept (4 options, one correct)
   - Use AskUserQuestion for each question
   - After the user answers, provide **full explanatory feedback** — explain why the correct answer is correct AND why each incorrect option is wrong
3. After all concept questions, give a brief summary of the module's key takeaways.

#### R2 (7-day review) — Prompted Retrieval
The goal is to make the learner actively retrieve from memory with minimal support.

1. Tell the user: "Let's review [Module Title] from [time ago]. This time, I'll ask you to recall more from memory."
2. **Concept listing**: Ask the user to list as many key concepts from the module as they can remember, from memory. Use AskUserQuestion with free-text input.
3. Compare their list against the module's actual key concepts. Acknowledge what they remembered and note what they missed.
4. For each concept (whether recalled or missed), ask a **free-text question** that requires explanation, not just recognition. For example: "Explain how X works" or "Why is Y important in the context of Z?"
5. Use AskUserQuestion for each question.
6. Evaluate their response — acknowledge correct understanding, gently correct misconceptions, fill in gaps.
7. Summarise: what they remembered well, what needs reinforcement.

#### R3 (30-day review) — Free Retrieval
The goal is near-complete self-generated recall. Minimal scaffolding.

1. Tell the user: "It's been [time] since you completed [Module Title]. Let's see how well it's stuck."
2. **Teach-back**: Ask the user to explain the module's content as if teaching it to someone else. Use AskUserQuestion with free-text input. Say something like: "Explain [module topic] to me as if I've never encountered it before. Cover the key concepts, how they relate, and why they matter."
3. Let them respond fully without interruption.
4. Evaluate their teach-back:
   - **Coverage**: Did they hit all the key concepts?
   - **Accuracy**: Were their explanations correct?
   - **Connections**: Did they show understanding of how concepts relate?
5. Provide feedback: praise what was strong, correct any errors, fill in any significant gaps they missed.
6. Ask 1-2 targeted follow-up questions on any weak areas identified.

### 5c: Record the Review

After completing the review for a module, update `progress.json`:

Add an entry to the module's `reviews` array:
```json
{
  "interval": "1d",
  "completed_at": "2025-01-16T14:30:00Z"
}
```

Where `interval` is `"1d"`, `"7d"`, or `"30d"` depending on which review was just completed, and `completed_at` is the current ISO 8601 timestamp.

Write the updated `progress.json`.

---

## Step 6: Continue or Finish

After completing a module review:

1. If there are more modules due for review, ask the user if they want to continue with the next one or stop for now. Use AskUserQuestion with options: "Continue to next review" and "Stop for now".
2. If they choose to stop, tell them how many reviews remain and when to come back.
3. If they choose to continue, proceed to the next module in the priority list (return to Step 5).
4. If all due reviews are complete, congratulate them and report what was reviewed.

```
Review session complete.

Reviewed today:
  [x] 1.1  Module Title (1-day review)
  [x] 1.3  Module Title (7-day review)

Next review due: Module 1.2 in 3 days.
```
