# Learn Anything In Claude

Turn Claude Code into a personalised learning environment. Clone this repo, tell the AI what you want to learn, and it generates a full curriculum — then teaches you interactively with checkpoints, exercises, progress tracking, and spaced repetition review.

Your curriculum doubles as a browsable Docusaurus documentation site.

## Quick Start

1. Clone this repository into an empty directory
2. Open it in your terminal with Claude Code
3. Run `/project:init` and describe what you want to learn
4. Run `/project:start` to begin your first lesson

## Commands

| Command | What it does |
|---------|-------------|
| `/project:init` | Collect your topic, level, and goals. Researches the subject, designs a curriculum, generates all content files. |
| `/project:start` | Begin or resume training from your current position. Delivers lessons interactively. |
| `/project:progress` | Show completion status across all modules. Flags modules due for review. |
| `/project:reset` | Reset all progress to zero. Keeps your topic and curriculum intact. |
| `/project:add-content` | Scaffold a new module into your existing curriculum. |
| `/project:review` | Spaced repetition review of completed modules (1 day, 7 days, 30 days). |
| `/project:help` | Display command reference. |
| `/project:X-Y-slug` | Jump directly to a specific module (e.g., `/project:1-2-variables`). |

## How It Works

### Curriculum Generation

`/project:init` runs a multi-phase pipeline:

1. **Collect context** — topic, experience level, learning goals, time constraints
2. **Research** — parallel agents search for canonical sources, community learning paths, topic structure
3. **Design** — produces 3–6 sections with 10–25 modules, each classified by Diataxis type
4. **Review** — presents the curriculum for your approval before generating
5. **Generate** — parallel agents create all content files, command launchers, and progress tracking
6. **Landing page** — generates a topic-specific Docusaurus landing page

### Interactive Teaching

`/project:start` uses the training delivery engine to teach you one concept at a time:

- Skill-tree decomposition of each module into atomic concepts
- Chunked delivery (2–4 paragraphs per concept with concrete examples)
- Checkpoints after each concept (multiple choice or free-text)
- Adaptive pacing — speeds up when you're getting it, slows down when you're not
- Diataxis-adapted voice — tutorials use "we", how-to guides use imperative, etc.
- Session close with retrieval practice

### Spaced Repetition

`/project:review` implements three review intervals after module completion:

- **R1 (1 day)** — guided recall with cues and multiple choice
- **R2 (7 days)** — prompted retrieval, you generate the concept list
- **R3 (30 days)** — free retrieval, you teach the content back

### Content Types (Diataxis)

Every module is classified as one of four types:

| Type | Orientation | You are... |
|------|-------------|------------|
| Tutorial | Learning | Following along to acquire a skill |
| How-to guide | Task | Solving a specific problem |
| Explanation | Understanding | Building mental models |
| Reference | Information | Looking up facts and specifications |

## Documentation Site

The `docs-site/` directory is a Docusaurus 3 site. Your curriculum content lives in `docs-site/docs/` and is browsable as a static site.

### Local Development

```bash
cd docs-site
cp .env.template .env
# Edit .env: set LOCAL=true
npm install
npm start
```

### Deploy to GitHub Pages

```bash
cd docs-site
# Edit .env: set SITE_ORG and SITE_REPO
npm run build
npm run deploy
```

## Architecture

- `CLAUDE.md` — project instructions, always loaded by Claude Code
- `.claude/commands/` — slash command prompt templates
- `.claude/skills/` — reference knowledge (training delivery, Diataxis, Docusaurus, frontend design)
- `progress.json` — your learning state (gitignored, created by `/project:init`)
- `Code/` — exercise workspace
- `docs-site/` — Docusaurus 3 static site with your curriculum

## Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI
- Node.js 18+ (for Docusaurus)
