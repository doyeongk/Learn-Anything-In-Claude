# /project:progress — Show completion status

You are the progress tracker. Your job is to read the user's learning state and present a clear, formatted summary of their completion status across all modules.

---

## Step 1: Load Progress

Read `progress.json` from the project root.

**If the file does not exist**, stop and tell the user:
> No curriculum found. Run `/project:init` first to generate your personalised curriculum.

---

## Step 2: Calculate Statistics

From the modules object in `progress.json`, compute:

- **Total modules**: count of all modules
- **Completed**: count where status is `completed`
- **In progress**: count where status is `in_progress`
- **Not started**: count where status is `not_started`
- **Completion percentage**: `(completed / total) * 100`, rounded to nearest integer
- **Total estimated time**: sum of all `estimated_time` values
- **Time completed**: sum of `estimated_time` for completed modules
- **Time remaining**: sum of `estimated_time` for non-completed modules

---

## Step 3: Group by Section

Group modules by their `section` field. For each section, calculate:
- Number of modules in the section
- Number completed
- Section completion percentage
- List each module with its status indicator

Use these status indicators:
- `[x]` — completed
- `[~]` — in progress
- `[ ]` — not started

---

## Step 4: Flag Modules Due for Review

For each **completed** module, check if it is due for spaced repetition review. The review schedule has three intervals:

### R1 — 1-day review
- **Due when**: `completed_at` is at least 1 day ago AND the module's `reviews` array does NOT contain an entry with `interval: "1d"`
- Flag as: "Due for 1-day review"

### R2 — 7-day review
- **Due when**: `completed_at` is at least 7 days ago AND the `reviews` array contains a `"1d"` entry AND does NOT contain a `"7d"` entry
- Flag as: "Due for 7-day review"

### R3 — 30-day review
- **Due when**: `completed_at` is at least 30 days ago AND the `reviews` array contains a `"7d"` entry AND does NOT contain a `"30d"` entry
- Flag as: "Due for 30-day review"

A module that has completed all three review intervals (has 1d, 7d, and 30d entries) needs no further review.

---

## Step 5: Display Summary

Format the output as follows. Use plain text with alignment — do not use code blocks for the entire output.

```
PROGRESS: [Topic Name]
Learner: [User Name] | Level: [Skill Level]
Goal: [Goal]

Overall: XX% complete (N/M modules)
Time: ~Xh completed, ~Yh remaining

────────────────────────────────────────

Section 1: [Section Name] (N/M complete)
  [x] 1.1  Module Title                    (tutorial, ~20 min)   Completed 2025-01-15
  [~] 1.2  Module Title                    (explanation, ~25 min) In progress
  [ ] 1.3  Module Title                    (how-to, ~15 min)

Section 2: [Section Name] (N/M complete)
  [ ] 2.1  Module Title                    (tutorial, ~30 min)
  [ ] 2.2  Module Title                    (reference, ~20 min)

────────────────────────────────────────

REVIEWS DUE:
  1.1  Module Title — Due for 7-day review (completed 8 days ago)
  1.2  Module Title — Due for 1-day review (completed 2 days ago)

Next review: Module 2.1 will be due for 1-day review in 3 days.
```

If no reviews are due, show:
```
REVIEWS: All caught up. Next review due in X days.
```

Calculate "next review due" by finding the completed module with the earliest upcoming review milestone.

If no modules are completed yet, omit the reviews section entirely and instead show:
```
Complete your first module with /project:start to begin tracking reviews.
```

---

## Step 6: Suggest Actions

Based on the current state, suggest the most relevant next action:

- If there's a module in progress: "Continue where you left off with `/project:start`"
- If reviews are due: "You have reviews due — run `/project:review`"
- If all modules are complete and all reviews done: "Curriculum complete! Add new content with `/project:add-content`"
- Otherwise: "Start your next module with `/project:start`"
