# Classification Guide — Decision Matrices and Edge Cases

Use this reference when you are unsure how to classify a piece of documentation, or when content seems to straddle multiple types.

## Primary Classification Matrix

```
                         ACQUISITION                    APPLICATION
                        (studying, learning)           (working, doing a task)
                ┌──────────────────────────────┬──────────────────────────────┐
                │                              │                              │
                │         TUTORIAL              │          HOW-TO              │
   ACTION       │                              │                              │
   (practical,  │  "Your First REST API"       │  "Deploy to Production"      │
    doing)      │  "Build a Chat App"          │  "Migrate from MySQL to PG"  │
                │  "Learn Git by Example"      │  "Set Up SSL Certificates"   │
                │  "Create Your First Test"    │  "Fix CORS Errors"           │
                │                              │                              │
                ├──────────────────────────────┼──────────────────────────────┤
                │                              │                              │
                │        EXPLANATION            │         REFERENCE            │
   COGNITION    │                              │                              │
   (theoretical,│  "How DNS Actually Works"    │  "HTTP Status Code Table"    │
    understanding│  "Why Immutability Matters" │  "CSS Property Reference"    │
                │  "The CAP Theorem Explained" │  "React Hooks API"           │
                │  "What is Event-Driven Arch?"│  "Git Command Reference"     │
                │                              │                              │
                └──────────────────────────────┴──────────────────────────────┘
```

### Decision Flowchart

```
Start
  │
  ├─ Does the reader NEED TO DO something?
  │   ├─ YES → Are they LEARNING a skill or SOLVING a problem?
  │   │   ├─ Learning a skill → TUTORIAL
  │   │   └─ Solving a problem → HOW-TO
  │   │
  │   └─ NO → Do they need UNDERSTANDING or FACTS?
  │       ├─ Understanding (context, reasons, trade-offs) → EXPLANATION
  │       └─ Facts (definitions, values, syntax) → REFERENCE
```

## The Tutorial vs How-to Confusion

This is the single most common misclassification. Both involve action and steps. The difference is the OUTCOME.

### The Core Distinction

| | Tutorial | How-to |
|---|---|---|
| **Outcome** | The reader has LEARNED a skill | The reader has SOLVED a problem |
| **Scenario** | Can be artificial (crafted for learning) | Must be real (a problem the reader actually has) |
| **Prerequisites** | Minimal (newcomer-friendly) | Substantial (assumes competence) |
| **Choices** | None — one guided path | Flexible — variations welcomed |
| **"Why" explanations** | Brief, in service of the next step | Omitted unless essential to choosing an option |
| **Reader's question** | "How do I learn to do X?" | "How do I do X right now?" |

### Test: Is It a Tutorial or a How-to?

Ask: **"If the reader never uses this exact procedure again, was the document still valuable?"**

- **Yes** → It's a tutorial. The value was the learning, not the procedure.
- **No** → It's a how-to. The value was the result.

### Examples of the Confusion

**"Quick Start" guides** — These are almost always how-to guides mislabelled as tutorials. A true tutorial would teach the reader HOW the tool works through a crafted exercise. A quick start says "do these 5 steps to get up and running" — that is a how-to for the task "set up X".

**"Cookbook" entries** — These are how-to guides. Despite the learning-oriented framing of "cookbook", each entry solves a specific problem.

**"Workshop" materials** — These are tutorials. Even though they might address real-world problems, their purpose is learning, and they are designed to be followed in sequence.

## Red Flags for Type Mixing

### Signs a Document Is Trying to Be Two Types

| Red Flag | What It Means | What to Do |
|----------|--------------|------------|
| A tutorial that includes a reference table | Tutorial + Reference mixed | Extract the table into a separate reference document. Link to it. |
| A how-to that starts with 3 paragraphs of background | How-to + Explanation mixed | Move the background to a separate explanation. Start the how-to with the steps. |
| A reference page with a "Getting Started" section | Reference + Tutorial mixed | Extract the getting started content into a separate tutorial. |
| An explanation that ends with "Steps to implement" | Explanation + How-to mixed | Split at the boundary. The explanation discusses why; the how-to shows how. |
| A tutorial that says "For alternative approaches, see..." | Tutorial + How-to tendencies | Remove the alternatives. A tutorial has one path. Save alternatives for a how-to. |
| A reference entry with a 5-paragraph explanation | Reference + Explanation mixed | Trim the explanation to 1-2 sentences. Link to a separate explanation for depth. |

### The Mixing Test

Read each paragraph and ask: "What type is THIS paragraph?" If the type changes from one paragraph to the next, the document is mixed. Mark the boundaries and consider splitting.

Not every type change requires splitting. A 1-sentence transition is fine. A 3-paragraph digression is not.

## Edge Cases

### FAQ Pages

**Usually: Reference**

Each FAQ entry is a self-contained question-answer pair. The page is organised for lookup (the reader scans for their question). This is reference behaviour.

However, if the FAQ entries are long and discursive ("Why does X happen? Well, the reason is..."), they are closer to a collection of micro-explanations. In that case, consider whether they'd be better structured as an explanation document with sections.

**Recommendation:** Keep FAQs as reference. If an answer exceeds 3-4 sentences, it probably deserves its own explanation page, with the FAQ entry linking to it.

### Troubleshooting Guides

**Usually: How-to**

"When you see error X, do Y" is a how-to pattern. The reader has a problem (the error) and wants a solution (the fix). Troubleshooting sections are essentially a collection of micro how-to guides.

**Structure them as:** A table or list of symptom → cause → solution entries. Each entry is a tiny how-to.

**Exception:** "Understanding Common Errors" — if the document explains WHY errors occur without giving fix steps, it is an explanation.

### Architecture Documentation

**Usually: Explanation**

Architecture docs discuss design decisions, component relationships, data flow, and trade-offs. This is explanation territory — the reader wants to understand the system, not do something with it.

**Exception:** If the architecture doc is a flat listing of components with their interfaces and responsibilities (like a system reference), it is closer to reference. If it includes steps to set up the architecture locally, that's how-to content that should be separated.

### API Documentation

**Primarily: Reference**

API docs list endpoints, parameters, request/response schemas, status codes. This is reference — organised for lookup, consistent structure, complete.

**Often mixed with:** How-to examples ("How to paginate results", "How to authenticate"). These should be clearly separated — either in a dedicated "Guides" section or as separate how-to documents that link back to the reference.

**Also sometimes mixed with:** Tutorials ("Build your first app with our API"). Again, separate these.

### Changelog / Release Notes

**Usually: Reference**

Changelogs list facts about what changed, when, and how. They are organised for lookup (by version number). That's reference.

**Exception:** If release notes include migration guides ("To upgrade from v2 to v3, do..."), that migration content is a how-to and should be separated or clearly demarcated.

### "Best Practices" Documents

**Ambiguous — could be Explanation or How-to**

Ask: Does this document explain WHY certain practices are better (explanation) or tell you WHAT to do (how-to)?

- "Why You Should Use Parameterised Queries" → Explanation
- "Secure Your API: 10 Steps" → How-to
- "Database Performance Best Practices" → Often mixed. Split the "why" parts into explanation and the "do this" parts into how-to.

### "Concepts" Pages

**Usually: Explanation**

A "Concepts" page in documentation frameworks (like Kubernetes docs) is almost always an explanation. It introduces a mental model.

**Exception:** If the concepts page is actually a glossary (term → definition → done), it is reference.

### Interactive Playground / Sandbox

**Usually: Tutorial**

The reader learns by doing in a guided environment. The outcome is learning, not a result they need.

### Onboarding / Setup Guide

**Usually: How-to**

The reader has a specific task (set up the tool). Despite being their "first time", they are not learning — they are installing and configuring. A true tutorial would teach them HOW the tool works; a setup guide just gets it running.

**Test:** If the guide works for someone who has done this before on a different machine, it's a how-to. If it only makes sense for a first-timer learning the concepts, it's a tutorial.

## When to Break the Rules

Sometimes a document genuinely serves two purposes and splitting would create an awkward reading experience. Guidelines for when mixed content is acceptable:

### Acceptable Mixing

1. **Brief reference tables inside explanations.** If an explanation of HTTP status codes includes a summary table, that table is reference-like, but extracting it would harm readability. Keep it. The table serves the explanation.

2. **Short procedural sections in tutorials.** A tutorial might include a 3-step setup ("Install X, configure Y, run Z") that is how-to-like. If the setup is just enabling the tutorial's core exercise, keep it inline.

3. **Motivational context in how-to guides.** A single paragraph of "why you'd want to do this" before the steps is acceptable in a how-to. It helps the reader confirm they're in the right place. More than a paragraph is explanation creep.

### Unacceptable Mixing

1. **Multi-page tutorials with reference appendices.** Split them. The reference should be its own page.

2. **How-to guides that teach fundamentals.** If you need to teach the reader what a database is before showing them how to set one up, they need a tutorial first, not a combined document.

3. **Reference pages with embedded tutorials.** "Here's the API reference. Let's start by building a simple app..." No. The tutorial and the reference serve different readers in different states of mind.

### The Pragmatic Test

If splitting would create two documents where neither stands alone (each needs the other to make sense), keep them together but clearly demarcate the sections with headings that signal the type shift: "Background" (explanation), "Steps" (how-to), "Reference Table" (reference).

If splitting would create two documents that each serve a clear, independent purpose, split them. This is almost always the case.
