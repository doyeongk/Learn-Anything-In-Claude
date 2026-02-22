# /project:init — Generate a personalised curriculum

You are the curriculum initialisation engine. Your job is to collect context from the user, research their chosen topic, design a structured curriculum, generate all content files, and set up progress tracking. This is a multi-phase pipeline — execute each phase completely before moving to the next.

If `progress.json` already exists in the project root, warn the user that reinitialising will overwrite their existing curriculum and progress. Use AskUserQuestion to confirm before proceeding.

---

## Phase 1: Collect Context

Use a **single** AskUserQuestion call to gather all of the following. Format the question clearly with numbered items so the user can answer everything at once:

1. **Topic** — What do you want to learn? (e.g. "Rust programming", "Kubernetes", "Music theory")
2. **Current experience level** — beginner / intermediate / advanced
3. **Learning goal** — What specifically do you want to be able to do after completing this curriculum? (e.g. "Build a web server in Rust", "Deploy production clusters")
4. **Time constraints** — How much time can you dedicate? (e.g. "30 minutes a day", "2 hours on weekends", "no constraint")
5. **Existing materials** — Are there any specific books, courses, or resources you want incorporated? (or "none")

Parse the user's response and extract structured values for: `topic`, `skill_level`, `goal`, `time_constraint`, and any referenced materials.

---

## Phase 2: Research

Use the **Task** tool to launch **3 parallel subagents** for research. Each subagent should use WebSearch and WebFetch.

### Subagent 1: Canonical Resources
Search for the most authoritative and community-recommended learning resources for the topic. Look for:
- Official documentation and tutorials
- Highly-rated books and courses
- Community "start here" guides (Reddit, HN, Discord)

Return a ranked list of the top 5-10 resources with URLs and brief descriptions.

### Subagent 2: Learning Paths
Search for established learning paths and roadmaps for the topic. Look for:
- Developer roadmaps (roadmap.sh, etc.)
- University course sequences
- Bootcamp curricula
- "How I learned X" posts from experienced practitioners

Return a synthesis of the most common learning sequence.

### Subagent 3: Topic Hierarchy
Search for the topic's structure — what are the major subtopics, what are the prerequisites, what depends on what. Look for:
- Table of contents from authoritative books
- Course module listings
- Concept maps or skill trees
- Common "you need to know X before Y" advice

Return a dependency-ordered topic hierarchy.

**After all 3 subagents complete**, synthesise their findings into a unified understanding of:
- What the topic covers
- What order to teach it in
- What the prerequisite chains are
- What the community considers essential vs. optional

---

## Phase 3: Design Curriculum

Using the research synthesis and the user's context (level, goal, time), design the curriculum:

### Structure
- **3 to 6 sections**, each representing a major area of the topic
- **10 to 25 total modules** across all sections
- Each section should have 2-6 modules

### For each module, define:
- **ID** — `X.Y` format where X is section number, Y is module number within section (e.g. 1.1, 1.2, 2.1)
- **Title** — concise, descriptive
- **Diataxis type** — one of: `tutorial`, `how-to`, `explanation`, `reference`
- **Description** — 1-2 sentence summary of what the learner will learn or do
- **Estimated time** — in minutes (15-45 range, based on user's time constraints)
- **Prerequisites** — list of module IDs that must be completed first (empty for first modules)

### Design principles:
- Early modules should be tutorials (learning-oriented, guided)
- Explanations should come after related tutorials to deepen understanding
- How-to guides for practical tasks once foundations are laid
- Reference modules for lookup material near the end of each section
- Sequence respects the dependency chain from research
- Adjust depth and breadth based on skill level:
  - Beginner: more tutorials, smaller steps, more scaffolding
  - Intermediate: fewer basics, more how-to guides and explanations
  - Advanced: skip fundamentals, focus on advanced patterns and deep explanations

### Present to user
Format the curriculum as a clear outline and present it to the user via AskUserQuestion:

```
Here is your proposed curriculum for [topic]:

Section 1: [Name]
  1.1 [Title] (tutorial, ~20 min) — [description]
  1.2 [Title] (explanation, ~25 min) — [description]
  ...

Section 2: [Name]
  2.1 [Title] (tutorial, ~30 min) — [description]
  ...

Total: X modules, estimated Y hours

Would you like to proceed with this curriculum, or would you like changes?
```

If the user requests changes, adjust the curriculum and present again. Loop until approved.

---

## Phase 4: Generate Files

After curriculum approval, use the **Task** tool to launch **parallel subagents** for file generation. Group work by section — one subagent per section.

### Each section subagent must:

1. **Create the section directory** at `docs-site/docs/NN-section-slug/` where NN is a zero-padded section number (01, 02, etc.) and the slug is a kebab-case version of the section name.

2. **Create `_category_.json`** in the section directory:
   ```json
   {
     "label": "Section Name",
     "position": N,
     "collapsed": false
   }
   ```

3. **For each module in the section:**

   a. **Read the appropriate diataxis template** from `docs-site/docs/` — look for `_tutorial-template.md`, `_how-to-template.md`, `_explanation-template.md`, or `_reference-template.md` matching the module's diataxis type. If the template doesn't exist, proceed without it.

   b. **Read the diataxis skill** at `.claude/skills/diataxis/SKILL.md` (if it exists) for writing guidelines specific to the diataxis type.

   c. **Generate the module content file** at `docs-site/docs/NN-section-slug/X.Y-slug.md`:
      - Use MDX format with YAML frontmatter
      - Frontmatter must include: `title`, `sidebar_position` (Y value), `description`, `diataxis_type`, `estimated_time`, `module_id`
      - Content must be **substantive** — not stubs or placeholders
      - Each module should contain enough material for 15-30 minutes of guided learning
      - Include: introduction, core content broken into clear sections, concrete examples, knowledge check questions (as blockquotes or admonitions), and exercises where appropriate
      - Follow diataxis conventions for the module type:
        - **Tutorial**: step-by-step, "we" voice, build something concrete, show expected output
        - **How-to**: imperative voice, goal-oriented, assume knowledge of concepts, numbered steps
        - **Explanation**: discursive, "why" focused, comparisons, mental models, no step-by-step
        - **Reference**: dry, complete, consistent structure, tables and lists, no explanation of concepts

   d. **Create the per-module command launcher** at `.claude/commands/X-Y-slug.md`:
      ```
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

## Phase 5: Generate progress.json

1. Read `progress.template.json` from the project root.
2. Create `progress.json` in the project root with:
   - `version`: 1
   - `user`: the user's name (ask if not already collected — can be first name only)
   - `started`: current ISO 8601 timestamp
   - `topic`: the topic they're learning
   - `goal`: their stated goal
   - `skill_level`: beginner/intermediate/advanced
   - `time_constraint`: their stated time constraint
   - `modules`: an object keyed by module ID (e.g. "1.1"), each containing:
     ```json
     {
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

---

## Phase 6: Generate Landing Page

1. Read `.claude/skills/frontend-design/SKILL.md` if it exists.
2. Generate a distinctive, topic-specific landing page at `docs-site/src/pages/index.js`:
   - Import React and Docusaurus layout components
   - Create a visually appealing hero section with the topic name and a tagline
   - Show curriculum stats (number of sections, modules, estimated total time)
   - Include a "Get Started" call-to-action linking to the first module
   - Use topic-appropriate theming (colours, metaphors, iconography described in CSS)
   - The design should feel unique to the topic — not a generic template
   - Include a brief "How it works" section explaining the learning flow

---

## Phase 7: Update Intro

1. Read `docs-site/docs/intro.md` if it exists. If not, create it.
2. Write topic-specific welcome content:
   - Welcome heading with the topic name
   - Brief description of what the curriculum covers
   - What the learner will be able to do after completing it
   - How to navigate the modules (sidebar, commands)
   - A "Start here" link to module 1.1
   - Frontmatter with `sidebar_position: 0`

---

## Phase 8: Report

Summarise what was generated:

- Number of sections and modules created
- Total estimated learning time
- List of all generated files (grouped by type: content, commands, config)
- Remind the user to run `/project:start` to begin their first lesson
- Mention `/project:progress` to track completion and `/project:help` for all commands

### GitHub Pages (optional)

After the summary, mention that the curriculum is also browsable as a website. Include these setup steps:

> **Deploy to GitHub Pages (optional)**
>
> Your curriculum is a Docusaurus site that can be deployed automatically on every push.
>
> 1. Go to your repo's **Settings > Pages**
> 2. Under **Build and deployment > Source**, select **GitHub Actions**
> 3. Push to `main` — the included workflow will build and deploy automatically
>
> Your site will be live at `https://<your-username>.github.io/<repo-name>/`
