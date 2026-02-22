# Documentation Types — Deep Reference

Comprehensive reference for each of the four diataxis documentation types. Use this when writing module content to ensure structural and tonal consistency.

---

## Tutorial

### Definition and Purpose

A tutorial is a lesson. Its purpose is to help the reader LEARN by DOING. The reader comes with no prior knowledge of the topic and leaves with a new skill. The tutorial achieves this by guiding the reader through a carefully designed sequence of actions that produce a tangible outcome.

The outcome matters, but it is secondary. A tutorial's real product is the skill the reader acquires, not the artefact they build. The artefact is evidence that learning occurred.

### The Reader's State of Mind

The reader is a newcomer. They do not know what they do not know. They are willing to follow instructions, but they need confidence that the instructions will work. They are vulnerable to frustration — if something fails and they do not know why, they may abandon the tutorial entirely.

The reader is NOT:
- Looking for the fastest way to get something done (that's a how-to)
- Trying to understand a concept deeply (that's an explanation)
- Looking up a specific fact (that's a reference)

### Structural Template

```markdown
# [Build/Create/Make] [Tangible Outcome]

## Introduction
One paragraph: what we will build, why it is a useful learning exercise, what you will know by the end.

## Prerequisites
Bulleted list. Keep minimal. Link to installation guides if needed.

## Step 1: [Action That Produces a Visible Result]
1-2 paragraphs of instruction.
Code or commands to run.
Expected output.
Brief explanation of what happened (1-2 sentences).

## Step 2: [Next Action]
[Same structure as Step 1]

## Step N: [Final Action]
[Same structure]

## What We Built
1-2 paragraphs summarising the outcome and the skills learned.

## Next Steps
Brief pointers to related how-to guides, deeper explanations, or the next tutorial.
```

### Language Patterns

**Use:**
- "Let's start by..." / "Now let's..."
- "We need to..." / "We're going to..."
- "You should see..." / "The output will look like..."
- "This creates..." / "What this does is..."
- "If everything worked, you'll see..."

**Avoid:**
- "You should know that..." (teaching, not doing)
- "It's important to understand..." (deferring to explanation)
- "Optionally, you can..." (tutorials do not offer choices)
- "For more information, see..." mid-step (breaks flow)
- "In production, you would..." (scope creep)

### Common Mistakes and Fixes

| Mistake | Fix |
|---------|-----|
| Explaining "why" at length | Move the explanation to a separate explanation document. Keep 1-2 sentences max. |
| Offering choices ("you can use X or Y") | Pick one. Tutorials are guided paths, not choose-your-own-adventures. |
| Skipping steps that seem obvious | Newcomers do not share your sense of "obvious". Include every step. |
| Not showing expected output | After every significant step, tell the reader what they should see. |
| Starting with theory | Start with action. Theory comes in explanation documents. |
| Assuming the reader will "just know" how to fix errors | Anticipate common errors and include troubleshooting notes inline. |

### Quality Checklist

- [ ] A newcomer can follow it from start to finish without external help
- [ ] Every step produces a visible or verifiable result
- [ ] There is a concrete outcome at the end (a working thing)
- [ ] No unexplained commands or magic incantations
- [ ] No choices are offered — there is one path
- [ ] "Why" explanations are 1-2 sentences, not paragraphs
- [ ] Prerequisites are minimal and explicit

---

## How-to

### Definition and Purpose

A how-to guide is a recipe. Its purpose is to help the reader ACCOMPLISH a specific task. The reader comes with a problem and leaves with a solution. Unlike a tutorial, a how-to does not teach — it directs.

The distinction is critical: a tutorial's outcome is learning; a how-to's outcome is a result. A tutorial can use an artificial scenario; a how-to must address a real-world problem.

### The Reader's State of Mind

The reader is a practitioner. They already know the basics. They have a specific problem right now and want to solve it efficiently. They do not want to be taught or lectured — they want steps that work.

The reader is NOT:
- A newcomer who needs everything explained (that's a tutorial audience)
- Curious about the theory behind their problem (that's an explanation audience)
- Looking up a parameter's type (that's a reference audience)

### Structural Template

```markdown
# [Verb] [Specific Task]

## Overview
One sentence: what this guide helps you accomplish.

## Prerequisites
Bulleted list of what the reader must have before starting.

## Steps

### 1. [First Action]
Command or instruction.
Expected result.

### 2. [Next Action]
Command or instruction.
Expected result.
If applicable: "If you see [alternative], do [adjustment] instead."

### N. [Final Action]
Command or instruction.
Expected result.

## Verification
How to confirm the task was completed successfully.

## Variations
- If your situation differs in [way], adjust step [N] by...
- For [alternative platform/tool], substitute...

## Troubleshooting (optional)
| Problem | Cause | Solution |
|---------|-------|----------|
| [Symptom] | [Why it happens] | [What to do] |
```

### Language Patterns

**Use:**
- "Run..." / "Execute..." / "Add..."
- "Set X to Y" / "Change X from Y to Z"
- "Verify by checking..." / "Confirm that..."
- "If you see [X], then [Y]"
- "This step is only needed if..."

**Avoid:**
- "Let's understand why..." (explanation territory)
- "Before we begin, it's important to know..." (teaching)
- "We" language in general (the reader is doing this alone)
- "First, let me explain..." (just give the steps)
- Lengthy background paragraphs before the steps

### Common Mistakes and Fixes

| Mistake | Fix |
|---------|-----|
| Teaching fundamentals mid-guide | Remove them. Link to an explanation or tutorial if needed. |
| Only working for one specific setup | Add a "Variations" section for common alternatives. |
| Too many prerequisites | If the prerequisite list is long, the guide's scope might be too broad. Split it. |
| No verification step | Always tell the reader how to confirm success. |
| Steps that are too granular ("Click File, then click Save") | Consolidate trivial sub-steps. The reader is a practitioner. |
| Steps that are too coarse ("Configure the database") | Break into specific actions. Each step should be unambiguous. |

### Quality Checklist

- [ ] The title clearly states what task it solves
- [ ] Prerequisites are listed up front
- [ ] Steps are numbered and sequential
- [ ] Each step has a clear action and expected result
- [ ] Variations are addressed for common alternative setups
- [ ] No teaching or explaining — just doing
- [ ] A verification step confirms success

---

## Explanation

### Definition and Purpose

An explanation is a discussion. Its purpose is to help the reader UNDERSTAND a topic. The reader comes with curiosity or confusion and leaves with a better mental model. Explanations do not tell the reader what to do — they tell the reader why things are the way they are.

Explanations are the most undervalued documentation type. They are what make the difference between a reader who can follow instructions and a reader who can make good decisions independently.

### The Reader's State of Mind

The reader is curious. They have enough context to know what they are asking about, but they want to understand it more deeply. They might be asking "Why does X work this way?", "What's the difference between X and Y?", or "What are the trade-offs?"

The reader is NOT:
- Following steps to achieve a goal (tutorial or how-to audience)
- Looking up a specific fact (reference audience)
- A complete newcomer (they have context)

### Structural Template

```markdown
# [Understanding/How/Why] [Topic]

## The Problem / The Question
What question does this explanation answer? Why is it worth understanding?

## Context
Historical background, motivation, or the landscape in which this topic exists.

## The Core Idea
The central mechanism, principle, or concept. This is the heart of the explanation.

## How It Works
Detailed walkthrough of the mechanism. Diagrams encouraged. Multiple angles if helpful.

## Trade-offs and Alternatives
What are the alternatives? Why was this approach chosen over others? What are its costs?

## Implications
What does this mean for the reader's work? How should this understanding change their decisions?

## Summary
The key insight in 2-3 sentences.
```

### Language Patterns

**Use:**
- "Because..." / "Therefore..." / "This means that..."
- "The reason X works this way is..."
- "Consider what would happen if..."
- "Another way to think about this is..."
- "The trade-off here is..." / "The cost of X is..."
- "Historically, this arose because..."
- "You might expect X, but actually..."

**Avoid:**
- "Step 1..." / "First, do..." (procedure territory)
- "Run this command..." (how-to territory)
- Imperative voice in general
- Bullet-point lists of facts without connective tissue (reference territory)
- "You should..." / "Best practice is..." (that's a how-to making value judgements)

### Common Mistakes and Fixes

| Mistake | Fix |
|---------|-----|
| Embedding procedures ("First, install X, then configure Y") | Extract procedures into a separate how-to. Link to it. |
| Not discussing alternatives | Every design decision has alternatives. Discuss at least one. |
| Being too abstract (no concrete examples) | Ground every principle in at least one concrete example. |
| Being too concrete (just an extended example) | Extract the principle from the example. State it explicitly. |
| Stating conclusions without reasoning | Show the reasoning chain. Use "because" and "therefore". |
| Assuming too little context (re-explaining basics) | Trust the reader's existing knowledge. Link to prerequisites if needed. |

### Quality Checklist

- [ ] Answers "why" or "how come", not "how to"
- [ ] Discusses alternatives and trade-offs
- [ ] Contains no procedures or step-by-step instructions
- [ ] Uses "because" and "therefore" to show reasoning
- [ ] Grounds abstract principles in concrete examples
- [ ] The reader's mental model is improved after reading
- [ ] Does not assume the reader is a complete newcomer

---

## Reference

### Definition and Purpose

A reference is a catalogue. Its purpose is to provide COMPLETE, ACCURATE, STRUCTURED information for LOOKUP. The reader comes with a specific question ("What are the parameters of X?", "What values are valid for Y?") and expects to find the answer quickly.

Reference documentation is like a dictionary: nobody reads it front-to-back, but everybody needs it to be complete and consistent.

### The Reader's State of Mind

The reader is working. They are in the middle of a task and need a specific fact. They know what they are looking for. They want to find it quickly, read the answer, and return to their work.

The reader is NOT:
- Learning the topic for the first time (tutorial audience)
- Solving a multi-step problem (how-to audience)
- Trying to understand the theory (explanation audience)

### Structural Template

```markdown
# [Topic] Reference

## Overview
One paragraph: what this reference covers and how it is organised.

## [Category 1]

### [Entry Name]
**Description:** What it is, in one sentence.
**Syntax/Signature:** Exact syntax or function signature.
**Parameters/Properties:** Table of parameters, types, defaults, constraints.
**Returns/Produces:** What output to expect.
**Constraints:** Limitations, edge cases, invalid inputs.
**Example:**
Brief code example showing typical usage.

### [Next Entry]
[Same structure as above — consistency is critical]

## [Category 2]
[Same structure]

## See Also
Links to related reference pages, how-to guides, or explanations.
```

### Language Patterns

**Use:**
- "X is..." / "X returns..." / "X accepts..."
- "Valid values are..." / "Defaults to..."
- "Required" / "Optional" / "Deprecated"
- "See also: [related entry]"
- "Since version X.Y" / "Removed in version X.Y"

**Avoid:**
- "Let's look at..." (tutorial voice)
- "You should use X when..." (how-to voice)
- "The reason X exists is..." (explanation voice)
- Narrative prose (everything should be scannable)
- Varying structure between entries (inconsistency is the cardinal sin of reference)

### Common Mistakes and Fixes

| Mistake | Fix |
|---------|-----|
| Embedding tutorials ("First, install X, then call Y") | Extract into a separate tutorial or how-to. Link to it. |
| Inconsistent entry structure | Define a template and apply it to EVERY entry without exception. |
| Missing entries ("X is not documented") | Reference must be complete. Audit against the source of truth (API, schema, spec). |
| Too much prose | Replace paragraphs with tables, type signatures, and bullet points. |
| No examples | Include one concise example per entry. Examples are the most-used part of reference docs. |
| Organising by internal architecture instead of user need | Organise by what the user is looking for, not by how the code is structured. |

### Quality Checklist

- [ ] Every item in scope is documented (completeness)
- [ ] All entries follow the same structure (consistency)
- [ ] Entries can be found without reading surrounding content (independence)
- [ ] Types, defaults, and constraints are specified (precision)
- [ ] Each entry has at least one example (usability)
- [ ] Organisation serves lookup, not linear reading (structure)
- [ ] Cross-references link related entries (discoverability)
