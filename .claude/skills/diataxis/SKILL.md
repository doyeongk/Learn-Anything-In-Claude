# Diataxis Framework — Classifier and Writer

The Diataxis framework organises documentation into four types based on two axes. This skill provides the classification system and writing guidelines for each type. Use it when generating module content during `/project:init` and when classifying existing content.

## The Compass

Every piece of documentation can be located on a 2x2 grid by answering two questions:

### Question 1: Is this about action or cognition?

- **Action (practical)**: The reader wants to DO something. They want steps, commands, procedures, outcomes.
- **Cognition (theoretical)**: The reader wants to UNDERSTAND something. They want explanations, context, reasons, connections.

### Question 2: Is this about acquisition or application?

- **Acquisition (learning)**: The reader is studying. They do not have an immediate problem to solve. They want to build knowledge for future use.
- **Application (working)**: The reader is working. They have a specific task or question right now. They want to get something done or look something up.

### The Four Quadrants

```
                     ACQUISITION              APPLICATION
                     (studying)               (working)
                 ┌─────────────────────┬─────────────────────┐
                 │                     │                     │
    ACTION       │     TUTORIAL        │     HOW-TO          │
    (practical)  │                     │                     │
                 │  Learn by doing     │  Solve a problem    │
                 │  "Follow along"     │  "Get it done"      │
                 │                     │                     │
                 ├─────────────────────┼─────────────────────┤
                 │                     │                     │
    COGNITION    │    EXPLANATION      │    REFERENCE         │
    (theoretical)│                     │                     │
                 │  Understand why     │  Look up facts       │
                 │  "Tell me more"     │  "What is X?"        │
                 │                     │                     │
                 └─────────────────────┴─────────────────────┘
```

## Quick Reference Table

| Aspect | Tutorial | How-to | Explanation | Reference |
|--------|----------|--------|-------------|-----------|
| **Purpose** | Teach a skill through doing | Solve a specific problem | Deepen understanding | Provide factual lookup |
| **Orientation** | Learning-oriented | Task-oriented | Understanding-oriented | Information-oriented |
| **Voice** | "We" (inclusive, guiding) | Imperative (direct, practical) | Discursive (exploring, questioning) | Neutral (precise, austere) |
| **Reader state** | Newcomer, willing to follow | Practitioner with a problem | Curious, wants depth | Working, needs a fact |
| **Path structure** | Linear, sequential | Step-by-step, flexible | Exploratory, branching | Flat, alphabetical/categorical |
| **Content structure** | Setup → steps → result | Goal → prerequisites → steps → done | Question → context → explanation → implications | Entry → definition → properties → example |
| **Language patterns** | "Let's...", "We'll...", "Now we can see..." | "Do this", "Run this", "Set X to Y" | "Because...", "Therefore...", "This matters because..." | "X is...", "Returns...", "Valid values are..." |
| **Anti-patterns** | Over-explaining why; non-linear jumps | Teaching fundamentals mid-guide; unnecessary background | Step-by-step procedures; imperative instructions | Tutorials embedded in entries; narrative prose |
| **Outcome** | The reader has learned a skill | The reader has solved a problem | The reader understands a concept | The reader has found a fact |

## Per-Type Writing Guidelines

### Tutorial

**The golden rule:** A tutorial must ALWAYS work. If a reader follows every step exactly, they must reach the promised outcome. Test your tutorials.

**Structure:**
1. State what the reader will build/achieve (concrete, tangible)
2. State prerequisites (keep them minimal — tutorials should be accessible)
3. Walk through each step in exact sequence
4. Each step produces a visible result
5. After each step, briefly explain what just happened (1-2 sentences, not a lecture)
6. End with the completed outcome and a brief "what you learned" summary

**Writing rules:**
- Use "we" language throughout. The reader is a partner, not a subordinate.
- Never explain "why" at length. Save deep explanations for explanation-type content. A brief "this works because..." is fine; a three-paragraph digression on design philosophy is not.
- Every step must be reproducible. Include exact commands, exact file paths, exact expected output.
- The tutorial's scenario can be artificial. It does not need to be a realistic production use case. It needs to teach the skill effectively.
- If something might go wrong (version differences, platform issues), include a brief note: "If you see X instead, try Y."
- Never offer choices. A tutorial is a guided path. "Now choose whether to use X or Y" breaks the flow. Pick one and use it.

**Quality signals:**
- A newcomer can follow it without prior knowledge of the topic
- Every step produces a visible change
- The outcome is something the reader can point to and say "I made that"
- No unexplained magic (every command or action is at least briefly contextualized)

### How-to

**The golden rule:** A how-to must solve the problem. If the reader has the problem described, following the guide must fix it. Unlike tutorials, how-to guides assume competence.

**Structure:**
1. State the goal (one sentence)
2. State prerequisites (what the reader must already have)
3. Numbered steps, each with an action and expected result
4. Handle variations: "If your setup is different in X way, adjust step N..."
5. Verify: how to confirm it worked
6. Troubleshooting: common failures and fixes (optional but valuable)

**Writing rules:**
- Imperative voice. "Run", "Add", "Set", "Check". No "we" — the reader is the one doing it.
- No teaching. Do not explain why unless the "why" is essential to choosing the right option. The reader is here to solve a problem, not to learn.
- Be flexible. Unlike tutorials, how-to guides should accommodate variations. "If you're using X instead of Y, substitute..."
- Use descriptive headings that match what the reader is searching for. "Deploying to AWS", not "Step 3: Cloud Configuration".
- Keep it scannable. Readers often know most of the steps and are looking for the one they are stuck on.

**Quality signals:**
- Solves the stated problem
- Works for reasonable variations of the problem
- Can be scanned quickly to find the relevant step
- Does not waste time teaching fundamentals

### Explanation

**The golden rule:** An explanation must change how the reader THINKS about the topic. If they understood it the same way before and after reading, the explanation failed.

**Structure:**
1. State the question or topic being explored
2. Provide context: why this matters, where it came from
3. Explain the core mechanism or principle
4. Consider alternatives: other approaches, historical choices, trade-offs
5. Connect to the broader system: how this fits into the larger picture
6. Summarise the key insight

**Writing rules:**
- Discursive, exploratory tone. Use "because" and "therefore" frequently. These are the words of explanation.
- No step-by-step procedures. If you find yourself writing numbered steps, you've drifted into tutorial or how-to territory.
- It is fine to approach the topic from multiple angles. Explanation benefits from iteration: explain it one way, then explain it another way, then synthesise.
- Discuss alternatives and trade-offs. "X works well, but Y is preferred when..." — this is the bread and butter of explanation.
- History and motivation can be very effective. "The designers chose X because at the time, Y was not available" gives the reader a mental model for why things are the way they are.
- Counterexamples and edge cases are welcome. "This principle holds for most cases, but breaks down when..."

**Quality signals:**
- The reader's mental model is improved after reading
- The content answers "why" and "how come", not "how to"
- Alternatives and trade-offs are discussed
- No procedures or instructions (those belong in tutorials/how-tos)

### Reference

**The golden rule:** A reference must be COMPLETE and CONSISTENT. If a reader looks up an item and it is missing or structured differently from other items, the reference has failed.

**Structure:**
1. State the scope (what this reference covers)
2. Organise entries logically (alphabetical, categorical, or by frequency of use)
3. Each entry follows the same template: name, definition, key properties, constraints, one example
4. Cross-reference related entries

**Writing rules:**
- Neutral, precise, austere. Like a dictionary or specification. No stories, no persuasion, no analogies (unless genuinely needed for clarity).
- Consistency is paramount. Every entry must have the same sections in the same order. If one function entry has "Parameters", "Returns", "Throws", "Example", then EVERY function entry must have those four sections.
- Completeness over curation. A reference must list EVERYTHING, even boring or rarely-used items. If something exists, it must be in the reference.
- Organised for lookup, not reading. No one reads a reference front-to-back. It must be searchable, scannable, and structured for random access.
- No tutorials embedded in reference entries. A reference entry for `Array.map()` should define what it does, its parameters, its return value, and show one example. It should NOT walk the reader through learning what mapping is.

**Quality signals:**
- Every item in the scope is documented
- All entries follow the same structure
- Can be used for lookup without reading surrounding entries
- Precise enough to resolve ambiguity ("Does X accept null?" — the reference should answer this)

## Classification Decision Process

Given a piece of content to classify:

1. **Ask Question 1**: Is this about doing (action) or understanding (cognition)?
   - If the content contains steps, commands, procedures → action
   - If the content contains explanations, context, reasoning → cognition

2. **Ask Question 2**: Is this about studying (acquisition) or working (application)?
   - If the reader is learning something new, building a skill → acquisition
   - If the reader has a specific task or question right now → application

3. **Map to quadrant**: The answers to both questions uniquely identify the type.

4. **Check for mixing**: If the answer to either question is "both", the content is likely mixed and should be split. See the classification guide reference for how to handle mixed content.

### Common Classification Mistakes

| Content | Commonly Misclassified As | Actually Is | Why |
|---------|--------------------------|-------------|-----|
| "Getting Started" guide | Tutorial | Often a How-to | If it assumes a real project and rushes to a result, it's a how-to. A true tutorial teaches a skill through a crafted exercise. |
| API docs with examples | Tutorial | Reference | Examples in reference docs don't make them tutorials. They're still organised for lookup. |
| "Best Practices" guide | Explanation | Often a How-to | If it gives actionable steps, it's a how-to. If it discusses WHY certain practices are better, it's an explanation. |
| FAQ | Explanation | Usually Reference | FAQs are organised for lookup. Each entry is a self-contained answer. That's reference. |
| Architecture overview | Reference | Usually Explanation | If it discusses design decisions and trade-offs, it's explanation. Reference would be a flat listing of components and their interfaces. |

## Using This Skill During Content Generation

When generating module content for `/project:init`:

1. **Determine the diataxis type** based on the module's learning objective and position in the curriculum.
2. **Read the appropriate section** of this skill for writing guidelines.
3. **Read the documentation-types reference** at `.claude/skills/diataxis/reference/documentation-types.md` for the structural template.
4. **Write the content** following the guidelines strictly. Do not mix types.
5. **Set the `diataxis_type` frontmatter field** to one of: `tutorial`, `how-to`, `explanation`, `reference`.

### Type Selection Heuristic for Curriculum Modules

- **First module in a section**: Usually a tutorial (learning by doing) or an explanation (building mental models). Depends on whether the section is practical or theoretical.
- **Middle modules**: Mix of tutorials and explanations for learning, how-to guides for practical skills.
- **Final module in a section**: Often a how-to (applying what was learned to a real problem) or a reference (consolidating facts for future lookup).
- **Exercise modules**: Always tutorials.
- **Concept modules**: Usually explanations.
- **Cheat sheet modules**: Always reference.
