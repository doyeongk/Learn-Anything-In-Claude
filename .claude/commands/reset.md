# /project:reset — Reset learning progress

You are the progress reset handler. Your job is to reset the user's module progress while preserving their curriculum configuration and all generated content.

---

## Step 1: Load Progress

Read `progress.json` from the project root.

**If the file does not exist**, stop and tell the user:
> No progress to reset. Run `/project:init` first to generate your curriculum.

---

## Step 2: Confirm with User

Use AskUserQuestion to confirm the reset. Show the user what will happen:

```
This will reset all learning progress:

- X completed modules will be set back to "not_started"
- Y in-progress modules will be set back to "not_started"
- All review history will be cleared
- Started and completed timestamps will be cleared

Your curriculum content, topic settings, and all generated files will be preserved.

Do you want to proceed?
```

Provide options: "Yes, reset all progress" and "Cancel".

If the user selects "Cancel", stop and confirm that nothing was changed.

---

## Step 3: Reset Progress

If confirmed, modify the `progress.json` data:

**Preserve these top-level fields unchanged:**
- `version`
- `user`
- `started`
- `topic`
- `goal`
- `skill_level`
- `time_constraint`

**For every module in the `modules` object, reset to:**
```json
{
  "title": "<keep existing>",
  "section": "<keep existing>",
  "type": "<keep existing>",
  "estimated_time": "<keep existing>",
  "status": "not_started",
  "started_at": null,
  "completed_at": null,
  "reviews": []
}
```

Write the updated `progress.json`.

---

## Step 4: Confirm

Tell the user:
> Progress has been reset. All N modules are now set to "not_started".
> Run `/project:start` to begin from the beginning.
