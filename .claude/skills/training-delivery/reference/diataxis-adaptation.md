# Diataxis-Adapted Delivery

This reference defines how the training delivery engine adapts its style based on the module's diataxis type. Read this before delivering any module.

## Adaptation Matrix

| Aspect | Tutorial | How-to | Explanation | Reference |
|--------|----------|--------|-------------|-----------|
| **Orient style** | "We're going to build..." | "To accomplish X..." | "Let's understand why..." | "X is defined as..." |
| **Voice** | First person plural ("we") | Imperative ("do this") | Discursive, questioning | Neutral, precise |
| **Assumptions** | None — start from zero | User has the problem already | User has context, wants depth | User needs specific facts |
| **Checkpoint style** | "What did we just do?" | "What would you do if..." | "Why does this matter?" | "What is the value of..." |
| **Exercise character** | Guided follow-along | Independent problem-solving | Thought experiments | Lookup exercises |
| **Doing/understanding** | 70% doing, 30% understanding | 90% doing, 10% understanding | 20% doing, 80% understanding | 50% doing, 50% understanding |
| **Pacing** | Slow, methodical | Moderate, task-focused | Variable, depth-first | Fast, breadth-first |
| **Error response** | Full re-explanation with alternative approach | Point to the specific step they missed | Explore the misconception as a learning moment | Redirect to the correct reference entry |

## Tutorial Delivery

### Orientation

Start with a concrete outcome: "By the end of this module, we'll have built a [tangible thing]." The learner must be able to picture what "done" looks like.

### Delivery Rhythm

1. Tell the learner what they are about to do (one sentence)
2. Show them how to do it (code or instructions)
3. Have them do it
4. Confirm it worked
5. Explain what just happened (brief — this is not an explanation module)
6. Checkpoint: "What did we just do, and why?"

Repeat. Every cycle should produce a visible result — output in a terminal, a change on screen, a file created.

### Tone

Warm, inclusive, guiding. "Let's", "We'll", "Our next step is...". The learner is never alone. You are doing this together.

### Checkpoints

Focus on "what happened" and "what did we just achieve", not deep "why" questions. Tutorials teach by doing — understanding comes later.

**Good tutorial checkpoint:**
> We just added a route handler that responds to GET requests. If we changed the method from GET to POST, what would happen when we visit the URL in a browser?
>
> A. The page would load normally
> B. The browser would show a 405 Method Not Allowed error
> C. The server would crash
> D. The browser would automatically switch to a POST request

**Bad tutorial checkpoint (too theoretical):**
> Why is the separation of routing and handler logic important for maintainability?

### Error Response

When the learner goes wrong in a tutorial, provide the full corrected version. Do not just point out the error — tutorials are about following a known-good path. Show the path again. Use a different analogy if the first explanation did not land.

### Example: "HTTP Status Codes" as a Tutorial

> "We're going to build a small API that returns different status codes based on what we ask for. By the end, you'll have a running server that demonstrates 200, 404, and 500 responses.
>
> Let's start. Create a new file called `server.js` in your `Code/` directory:
>
> ```javascript title="Code/server.js"
> const http = require('http');
>
> const server = http.createServer((req, res) => {
>   if (req.url === '/ok') {
>     res.writeHead(200);
>     res.end('Everything is fine');
>   } else if (req.url === '/missing') {
>     res.writeHead(404);
>     res.end('Not found');
>   } else {
>     res.writeHead(500);
>     res.end('Server error');
>   }
> });
>
> server.listen(3000);
> ```
>
> Run it with `node server.js`, then open `http://localhost:3000/ok` in your browser. You should see 'Everything is fine'. Try `/missing` next — you'll see 'Not found'.
>
> What we just did: we created a server that returns different status codes depending on the URL path. The browser doesn't show the status code directly, but try `curl -I http://localhost:3000/ok` — you'll see `HTTP/1.1 200 OK` in the output.
>
> Quick check: If we visited `http://localhost:3000/anything-else`, what status code would we get?
>
> A. 200
> B. 404
> C. 500
> D. No response — the server doesn't handle that URL"

## How-to Delivery

### Orientation

State the problem upfront: "To accomplish X, you need to do Y." Assume the learner already has the problem and wants the solution. Do not over-explain context.

### Delivery Rhythm

1. State the goal
2. List prerequisites (briefly)
3. Step-by-step instructions
4. Each step: command or action, then expected result
5. Variations: "If your situation is different in [way], adjust step N by..."
6. Checkpoint: "What would you do if [variation of the problem]?"

### Tone

Direct, practical, efficient. Imperative voice: "Run this command", "Add this line", "Check the output". Respect the learner's time — they have a job to do.

### Checkpoints

Focus on "what would you do if..." questions that present variations of the problem. The learner should be able to adapt the procedure, not just follow it robotically.

**Good how-to checkpoint:**
> You've just deployed to staging, but the app shows a 502 Bad Gateway error. Given what we've covered about the deployment process, which step would you check first?
>
> A. The DNS configuration — the domain might not point to the right server
> B. The reverse proxy configuration — it might not be forwarding to the correct port
> C. The database — the app might not be able to connect
> D. The build step — the app might not have compiled correctly

**Bad how-to checkpoint (tests recall, not application):**
> What command do we use to deploy to staging?

### Error Response

When the learner goes wrong in a how-to, point to the specific step they missed or misapplied. Do not re-explain everything. "It looks like step 3 might have gone differently — check that [specific thing]."

### Example: "HTTP Status Codes" as a How-to

> "To implement proper status codes in your API error responses:
>
> **Prerequisites:** A running Express.js application with at least one route.
>
> **Step 1:** Install an error-handling middleware pattern. In your main app file, add a catch-all error handler after all routes:
>
> ```javascript
> app.use((err, req, res, next) => {
>   const statusCode = err.statusCode || 500;
>   res.status(statusCode).json({
>     error: err.message,
>     code: statusCode
>   });
> });
> ```
>
> **Step 2:** In your route handlers, create errors with status codes..."

## Explanation Delivery

### Orientation

Frame the question: "Let's understand why X works the way it does." The learner is curious, not stuck. They want depth, context, and connections.

### Delivery Rhythm

1. State the question or topic
2. Provide historical context or motivation (briefly — why does this exist?)
3. Explain the core mechanism or principle
4. Explore alternatives: "Another way to think about this is..."
5. Discuss trade-offs: "The advantage of X is... but the cost is..."
6. Connect to the broader system: "This matters because..."
7. Checkpoint: "Why does this matter?" or "What would change if...?"

### Tone

Discursive, thoughtful, exploratory. Uses "because" and "therefore" heavily. Considers multiple angles. May play devil's advocate. "You might think X, but actually..."

### Checkpoints

Focus on "why" questions and counterfactuals. The learner should demonstrate understanding of principles, not procedures.

**Good explanation checkpoint:**
> HTTP status codes follow a numbering scheme where the first digit indicates the category (2xx success, 4xx client error, etc.). Why do you think the protocol designers chose a numeric code rather than a descriptive string like "success" or "not found"?
>
> A. Numbers are faster for computers to parse, and HTTP was designed for machine-to-machine communication first
> B. The designers wanted to keep the protocol language-independent, and numbers are universal
> C. String responses would make the protocol headers too large
> D. Both A and B — efficiency and universality were both factors in the design

### Error Response

When the learner goes wrong in an explanation module, treat the misconception itself as a learning opportunity. "That's an interesting way to think about it — let's examine why it doesn't quite hold up..." Explore the misconception before correcting it. This is the one diataxis type where wrong answers are genuinely productive.

### Example: "HTTP Status Codes" as an Explanation

> "Let's understand why HTTP uses status codes and how they were designed.
>
> When Tim Berners-Lee and the early HTTP working group designed the protocol in the early 1990s, they faced a fundamental communication problem: how should a server tell a client what happened with its request? They needed a scheme that was compact (bandwidth was precious), machine-parseable (clients needed to act on it programmatically), and extensible (new situations would arise).
>
> They borrowed from existing protocols — FTP already used three-digit codes with the first digit indicating the category. This was a proven pattern. The result was the scheme we use today:
>
> - **1xx**: Informational — 'I received your request and I'm still working on it'
> - **2xx**: Success — 'Your request worked'
> - **3xx**: Redirection — 'What you want is somewhere else'
> - **4xx**: Client error — 'You made a mistake'
> - **5xx**: Server error — 'I made a mistake'
>
> Notice the elegance: without knowing ANY specific codes, a client can read just the first digit and know broadly what happened. This is why 499 (not a standard code) would still be understood as 'some kind of client error' by any HTTP-aware system.
>
> Now here's the interesting trade-off..."

## Reference Delivery

### Orientation

State what the reference covers: "This module is a reference for X. We'll go through each item systematically." Set expectations that this is breadth, not depth.

### Delivery Rhythm

1. State the scope of the reference
2. Deliver items in a consistent, structured format
3. Each item: name, definition, key properties, one brief example
4. Group related items logically
5. Checkpoint: "What is the value of X?" or "When would you use X vs Y?"
6. At the end, give a "cheat sheet" summary

### Tone

Neutral, precise, austere. Like a well-written dictionary or specification. No stories, no analogies (unless something is genuinely confusing without one). Every word earns its place.

### Checkpoints

Focus on lookup and comparison questions. The learner should know where to find things and how to distinguish similar items.

**Good reference checkpoint:**
> A client receives a 301 response. What should it do?
>
> A. Retry the same request
> B. Follow the Location header to the new URL and update its bookmarks — the move is permanent
> C. Follow the Location header but keep the old URL — the move is temporary
> D. Display an error to the user

### Error Response

When the learner goes wrong in a reference module, do not explore or discuss — redirect to the correct entry. "That's 301 (Moved Permanently). You might be thinking of 302 (Found), which is the temporary redirect. The key distinction is..."

### Example: "HTTP Status Codes" as a Reference

> "This module covers the HTTP status codes you'll encounter in practice. We'll go through each category, then the individual codes within it.
>
> **2xx — Success**
>
> | Code | Name | Meaning | Common Use |
> |------|------|---------|------------|
> | 200 | OK | Request succeeded | Standard successful response |
> | 201 | Created | Resource created | Response to a successful POST |
> | 204 | No Content | Success, but nothing to return | Response to a successful DELETE |
>
> **200 OK** is the default success code. If no other 2xx code is more specific, use 200.
>
> **201 Created** indicates that a new resource was created as a result of the request. Typically returned after a successful POST. The response should include a `Location` header pointing to the new resource.
>
> **204 No Content** means the request succeeded but there is no body to return. Commonly used for DELETE operations — the resource is gone, so there is nothing to send back."

## Cross-Cutting Rules

These apply regardless of diataxis type:

1. **Always read the diataxis type from the module's frontmatter** before starting delivery. If no type is specified, infer from the content structure and state your inference.
2. **Do not mix types mid-delivery.** If a module has mixed content (e.g., tutorial with reference tables), deliver each section in its appropriate style but do not switch modes without signalling: "Now let's shift from building to understanding why..."
3. **Skill level modifies intensity, not type.** A beginner tutorial is still a tutorial — it just has more scaffolding. An advanced reference is still a reference — it just skips basic entries and focuses on edge cases.
4. **When in doubt, default to tutorial style** for modules without a clear type. Tutorial is the safest — it over-explains rather than under-explains.
