# Delivery Mechanics Reference

Detailed reference for checkpoint design, pacing signals, session mechanics, and error handling. Read in conjunction with the main `SKILL.md`.

## Checkpoint Design Patterns

### Question Stem Taxonomy

**Application/Analysis (target: 60% of checkpoints)**

These test whether the learner can USE the concept, not just recognise it.

| Pattern | Example |
|---------|---------|
| "What would happen if..." | "What would happen if you sent a POST request without a Content-Type header?" |
| "Which approach would you choose when..." | "Which approach would you choose when you need to update a single field on a resource?" |
| "Why does X use Y instead of Z?" | "Why does HTTP use status codes instead of free-text error messages?" |
| "What is the most likely cause of..." | "What is the most likely cause of a 403 response when the URL is correct?" |
| "How would you modify X to achieve Y?" | "How would you modify this function to handle the edge case of an empty list?" |
| "What is the key difference between X and Y in the context of Z?" | "What is the key difference between authentication and authorisation in the context of API security?" |

**Comprehension (target: 30% of checkpoints)**

These test whether the learner understands the concept's meaning and implications.

| Pattern | Example |
|---------|---------|
| "In your own words, why is X important?" | "In your own words, why is idempotency important for HTTP methods?" |
| "What does X imply about Y?" | "What does the stateless nature of HTTP imply about session management?" |
| "Which of these best describes..." | "Which of these best describes the role of the DNS resolver?" |
| "What is the relationship between X and Y?" | "What is the relationship between TCP connections and HTTP requests?" |

**Recall (target: 10% of checkpoints, never two consecutively)**

These test basic recognition. Use sparingly — they have the lowest learning value.

| Pattern | Example |
|---------|---------|
| "Which HTTP method is used for..." | "Which HTTP method is used to remove a resource?" |
| "What status code range indicates..." | "What status code range indicates a client error?" |
| "What does the acronym X stand for?" | Only when the acronym is genuinely important, not trivia. |

### Sequencing Rule

Across a module's checkpoints, follow this pattern:
1. Start with comprehension (ease in)
2. Move to application/analysis (the bulk)
3. Sprinkle recall only when a specific fact is critical
4. End with a synthesis question (free-text)

Never place two recall questions back-to-back. Never end a module on a recall question.

## Answer Option Design

### Construction Rules

1. **Length variation**: Write options of varied length. The correct answer should sometimes be the shortest option. A common AI tell is making the correct answer the most detailed — avoid this.

2. **Position rotation**: Track where you place the correct answer across the module. Aim for roughly equal distribution across A, B, C, D. Never put the correct answer in the same position three times in a row.

3. **Distractor design**:
   - **Plausible distractor**: Represents a common misconception. This is the most important distractor. It should be the answer a learner who almost-but-doesn't-quite understand would choose. Design this one first.
   - **Partially correct**: True in some contexts but not this one. Tests whether the learner can distinguish scope or conditions.
   - **Clearly wrong**: Wrong for a specific, articulable reason. Not absurd. The learner should be able to explain WHY it is wrong if they understand the concept.

4. **"All of the above" / "None of the above"**: Use at most once per module. When you do use it, make sure it is sometimes correct and sometimes incorrect across modules — learners should not develop a heuristic about these options.

5. **Avoid negatives in stems**: "Which of the following is NOT..." questions are confusing. If you must test for exclusion, rephrase: "Which of these would be inappropriate for..."

### Example: Well-Designed Question

> You have an API endpoint that allows users to update their email address. Which HTTP method is most appropriate?
>
> A. GET — because you're retrieving the current email to compare it
> B. POST — because you're sending new data to the server
> C. PATCH — because you're modifying a single field on an existing resource
> D. DELETE — because the old email is being replaced

- **C is correct**: PATCH is for partial updates to existing resources.
- **B is the plausible distractor**: POST does send data, and many APIs incorrectly use POST for updates. A learner who knows HTTP basics but not method semantics deeply would choose this.
- **A is partially correct**: You might GET first, but GET is not for updates.
- **D is clearly wrong**: DELETE is for removal, not replacement. But it has a veneer of logic ("replacing" involves removing the old).

### Example: Poorly-Designed Question (Avoid This)

> What is the HTTP method for updating a resource?
>
> A. GET
> B. POST
> C. PATCH — this method is specifically designed for making partial modifications to an existing resource on the server
> D. DELETE

Problems: The correct answer (C) is obviously the longest. The stem is pure recall. The distractors are not designed around misconceptions.

## Pacing Signals

### Signs to Accelerate

| Signal | What It Tells You | Response |
|--------|-------------------|----------|
| Instant correct answers (reply within seconds of the question) | The learner already knows this material | Compress next 1-2 concepts into a single delivery |
| Learner asks to skip ahead or says "I know this" | Self-assessed mastery | Verify with one harder question, then skip if correct |
| Learner demonstrates knowledge beyond the current concept (uses terms not yet introduced) | Prior knowledge exceeds expectations | Jump to the dependency frontier — the first concept they likely DON'T know |
| Learner asks "why not X?" or proposes alternatives | Deep engagement, wants challenge | Engage with the alternative, then continue at higher pace |
| Correct answer with correct reasoning (learner explains why) | True understanding, not guessing | Skip the next basic checkpoint |

### Signs to Decelerate

| Signal | What It Tells You | Response |
|--------|-------------------|----------|
| Wrong answer | Misunderstanding | Explain why the correct answer is correct AND address the specific misconception |
| "I don't understand" or "Can you explain again?" | Explanation did not land | Try a completely different analogy or approach. Never repeat the same words. |
| Long pause before answering (learner takes several messages to respond) | Processing difficulty | Break the next concept into smaller pieces |
| Learner asks about fundamentals ("Wait, what is X?") | Missing prerequisite knowledge | Pause and fill the prerequisite gap before continuing |
| Partially correct answer with incorrect reasoning | Surface-level understanding | Affirm the correct answer, then probe the reasoning. Add a follow-up checkpoint. |
| Learner picks the plausible distractor consistently | Systematic misconception | Stop and address the misconception pattern directly. Give a mini-lesson on the underlying principle. |

### Pacing State Machine

```
START → Normal Pace
  │
  ├─ 3+ correct → Accelerated
  │   ├─ 1 incorrect → Normal Pace
  │   └─ continued correct → stay Accelerated
  │
  └─ 2+ incorrect → Decelerated
      ├─ 2 correct → Normal Pace
      └─ continued incorrect → stay Decelerated (consider prerequisite gap)
```

If the learner is in Decelerated mode for more than 3 consecutive concepts, something structural is wrong. Ask directly: "It seems like there might be a gap in something foundational. Would it help to revisit [prerequisite module]?"

## Session Close Protocol

### Summary Format

Use bullet points. Each bullet is one sentence. No sub-bullets. 3-5 bullets total.

**Good summary:**
> - REST APIs use standard HTTP methods to map CRUD operations to resources
> - GET is safe and idempotent; POST is neither; PUT and DELETE are idempotent but not safe
> - Status codes communicate outcomes: 2xx success, 4xx client errors, 5xx server errors
> - URL path identifies the resource; query parameters filter or modify the response

**Bad summary (too verbose, too many bullets):**
> - REST stands for Representational State Transfer and is an architectural style...
> - When you use GET, you are requesting data from the server. GET requests should be...
> - POST is used when you want to create a new resource. The server will respond with...
> (continues for 10 bullets)

### Retrieval Prompt Variations

Rotate phrasing across modules to avoid staleness:

- "Without looking back, what are the 2-3 most important things you learned in this module?"
- "If you had to summarise this module in 2-3 key takeaways, what would they be?"
- "What from this module do you think will be most useful to remember?"
- "Quick recall check — what were the main ideas we covered?"
- "Close your eyes for a moment (metaphorically). What sticks out from this module?"

### Responding to Retrieval Attempts

**Learner recalls correctly:**
> "Spot on. [Concept X] is exactly the kind of thing that will come up repeatedly, so it's good you have it locked in."

No empty praise. Be specific about WHAT they got right.

**Learner recalls partially:**
> "Good — you've got [X] and [Y] right. One thing worth adding: [Z], which connects to [Y] because [brief reason]. That's a detail that will matter when we get to [future module]."

Frame the gap as an addition, not a failure.

**Learner recalls incorrectly:**
> "Close, but there's a nuance worth clarifying. You said [incorrect statement], but actually [correct version]. The distinction matters because [reason]. The rest of your recall is solid though."

Correct the error without dwelling. Move forward.

**Learner says "I don't remember":**
> "That's normal — recall is hard, which is why we practise it. The key points were: [brief version of summary]. The spaced repetition reviews will help cement these."

Normalise the difficulty. Do not re-deliver the full summary.

### Transition to Next Module

When previewing the next module, give a ONE-SENTENCE preview that creates curiosity, not a spoiler:

Good: "Next up: Error Handling — we'll look at why most error handling advice is wrong and what to do instead."
Bad: "Next up: Error Handling — we'll cover try/catch, custom error types, error boundaries, and recovery patterns."

The preview should make the learner want to continue, not feel like they already know what is coming.

## Error Handling — Wrong Answers

When a learner answers a checkpoint incorrectly, follow this protocol:

### Step 1: Identify the Misconception

Map their chosen answer to the specific misunderstanding it reveals. Each distractor was designed to represent a misconception — use that design.

### Step 2: Explain Both Directions

First, explain why the correct answer IS correct:
> "The answer is C. PATCH is used here because [reason grounded in the concept]."

Then, explain why their answer is NOT correct, using their specific misconception:
> "You chose B (POST). POST does involve sending data to the server, so I can see why it seemed right. The distinction is that POST creates a new resource, while PATCH modifies an existing one. Since the user already exists and we're just updating their email, PATCH is the precise choice."

### Step 3: Reinforce

Give a brief second example that further clarifies the distinction:
> "Think of it this way: POST is like filling out a form to register a new account. PATCH is like going into your account settings and changing your email. Same server, different intents."

### Step 4: Do NOT Immediately Re-Quiz

After a wrong answer, do not ask another question on the same concept immediately. It feels punitive. Move to the next concept. If the misconception is serious, you will catch it again in a later checkpoint or the synthesis question.

## Error Handling — "I Don't Understand"

### Attempt 1: Different Analogy

If your first explanation used a technical example, switch to a real-world analogy. If it used an analogy, switch to a more concrete, technical example.

### Attempt 2: Smaller Pieces

Break the concept into sub-concepts. Identify which part specifically is confusing (ask if needed: "Is it the [sub-concept A] part or the [sub-concept B] part that's tripping you up?").

### Attempt 3: Different Domain

Ask the learner: "What's a topic you know well? I'll try to explain this using that as a frame." Then map the concept onto their familiar domain.

### Attempt 4: Accept and Move On

If three attempts have not landed, say: "This is a concept that sometimes clicks later when you see it in practice. Let's continue, and I think it will make more sense when we hit [upcoming practical exercise]. We can revisit then."

Never make the learner feel deficient. Some concepts genuinely require time and context to land.
