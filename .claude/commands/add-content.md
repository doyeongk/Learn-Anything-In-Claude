# /project:add-content — Scaffold a new module

You are the content scaffolding engine. Your job is to add a new module to an existing curriculum — generating the content file, command launcher, and progress tracking entry.

---

## Step 1: Load Existing Curriculum

Read `progress.json` from the project root.

**If the file does not exist**, stop and tell the user:
> No curriculum found. Run `/project:init` first to generate your curriculum before adding content.

Parse the existing modules to understand:
- Which section IDs exist (the X in X.Y)
- Which module IDs exist within each section
- What the next available ID would be in each section
- The section names and directory slugs

Also use Glob to find existing section directories: `docs-site/docs/*/` to map section names to their `NN-slug` directory names.

---

## Step 2: Gather Module Details

Use AskUserQuestion to collect the following, presenting sensible defaults based on the existing curriculum:

```
Adding a new module to your [topic] curriculum.

Existing sections:
  1. [Section 1 Name] (modules 1.1 - 1.N)
  2. [Section 2 Name] (modules 2.1 - 2.N)
  ...

Please provide:
1. Which section should this module belong to? (number, or "new" to create a new section)
2. Module title
3. Diataxis type: tutorial, how-to, explanation, or reference
4. Brief description of what the module covers
5. Estimated time in minutes (default: 20)
```

If the user wants a new section:
- Ask for the section name
- Assign it the next section number
- Create the section directory and `_category_.json`

Determine the module ID:
- If adding to an existing section X, the ID is `X.N+1` where N is the current highest module number in that section
- If creating a new section, the first module is `X.1`

---

## Step 3: Load Writing Resources

1. Read the appropriate diataxis template from `docs-site/docs/` — look for `_tutorial-template.md`, `_how-to-template.md`, `_explanation-template.md`, or `_reference-template.md` matching the chosen type. If it doesn't exist, proceed without it.

2. Read `.claude/skills/diataxis/SKILL.md` if it exists, for writing guidelines.

---

## Step 4: Generate Module Content

Create the module content file at `docs-site/docs/NN-section-slug/X.Y-slug.md`:

- Generate a slug from the module title (lowercase, kebab-case, no special characters)
- Use MDX format with YAML frontmatter:
  ```yaml
  ---
  title: "Module Title"
  sidebar_position: Y
  description: "Brief description"
  diataxis_type: tutorial|how-to|explanation|reference
  estimated_time: 20
  module_id: "X.Y"
  ---
  ```
- Generate **substantive content** — not stubs or placeholders
- The content should provide 15-30 minutes of guided learning material
- Include: introduction, core content with clear sections, examples, knowledge checks, and exercises as appropriate for the diataxis type
- Follow the diataxis conventions for the chosen type

---

## Step 5: Create Command Launcher

Create the per-module command launcher at `.claude/commands/X-Y-slug.md`:

```markdown
# Module X.Y: [Title]

Read the module content at `docs-site/docs/NN-section-slug/X.Y-slug.md` and deliver it
following the training delivery skill.

1. Read `progress.json` and update this module's status to `in_progress` with `started_at` set to the current ISO 8601 timestamp.
2. Read the module content file at `docs-site/docs/NN-section-slug/X.Y-slug.md`.
3. Read the training delivery skill at `.claude/skills/training-delivery/SKILL.md`.
4. Read both reference files in `.claude/skills/training-delivery/reference/` if they exist.
5. Deliver the module content following the training delivery skill's procedures.
6. On completion, update `progress.json`: set status to `completed`, set `completed_at` to the current ISO 8601 timestamp.
7. Suggest next steps: the next module in sequence, or `/project:progress` to check overall status.
```

---

## Step 6: Update Progress Tracking

Read `progress.json`, add the new module entry:

```json
"X.Y": {
  "title": "Module Title",
  "section": "Section Name",
  "type": "tutorial|how-to|explanation|reference",
  "estimated_time": 20,
  "status": "not_started",
  "started_at": null,
  "completed_at": null,
  "reviews": []
}
```

Write the updated `progress.json`.

---

## Step 7: Report

Tell the user what was created:

- Module content file path
- Command launcher file path
- Module ID and how to access it (`/project:start X.Y` or `/project:X-Y-slug`)
- Updated progress tracking

Suggest they run `/project:start X.Y` to begin the new module, or `/project:progress` to see the updated curriculum.
