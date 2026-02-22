# Diataxis Classification Examples

Concrete examples of classification, splitting mixed content, and writing the same feature in all four types.

## Classification Examples

### 1. "Getting Started with Docker"
**Type: Tutorial**
**Reasoning:** The title signals acquisition ("Getting Started" = learning). The content will walk a newcomer through installing Docker, running their first container, and seeing a result. Action + acquisition = tutorial.

### 2. "Deploying a Django App to AWS Elastic Beanstalk"
**Type: How-to**
**Reasoning:** The reader has a specific task (deploy a Django app). They are not learning what deployment is — they are doing it. The content will be steps to achieve a goal. Action + application = how-to.

### 3. "How Containers Work Under the Hood"
**Type: Explanation**
**Reasoning:** The reader wants to understand the mechanism. They are not going to build a container runtime — they want to know what namespaces, cgroups, and union filesystems are and why containers use them. Cognition + acquisition = explanation.

### 4. "Dockerfile Reference"
**Type: Reference**
**Reasoning:** This documents every Dockerfile instruction (FROM, RUN, COPY, etc.) with its syntax, options, and behaviour. Organised for lookup. Cognition + application = reference.

### 5. "Setting Up CI/CD with GitHub Actions"
**Type: Tutorial (if guided) or How-to (if task-focused)**
**Reasoning:** Ambiguous title. If the content walks a newcomer through creating their first workflow file with explanations at each step, it is a tutorial. If it assumes CI/CD knowledge and provides steps to configure GitHub Actions specifically, it is a how-to. Check the content to decide.

### 6. "Understanding CSS Specificity"
**Type: Explanation**
**Reasoning:** "Understanding" in the title is a strong signal. The content discusses how specificity is calculated, why it exists, and what happens when rules conflict. Cognition + acquisition = explanation.

### 7. "React Hooks API Reference"
**Type: Reference**
**Reasoning:** Lists every hook (useState, useEffect, etc.) with its signature, parameters, return values, and rules. Organised for lookup. Cognition + application = reference.

### 8. "Migrating from Redux to Zustand"
**Type: How-to**
**Reasoning:** The reader has a specific task (migrate state management). They need steps to accomplish it. Action + application = how-to.

### 9. "Why TypeScript?"
**Type: Explanation**
**Reasoning:** The reader wants to understand the rationale for TypeScript's existence. The content discusses type safety, developer experience, trade-offs vs JavaScript. Cognition + acquisition = explanation.

### 10. "Building a REST API with Express"
**Type: Tutorial**
**Reasoning:** "Building" signals doing. The reader is learning by constructing something. The outcome is both a working API and the skill to build one. Action + acquisition = tutorial.

### 11. "Troubleshooting Common npm Errors"
**Type: How-to**
**Reasoning:** The reader has a problem (an npm error). Each section addresses a specific error with steps to fix it. Action + application = how-to.

### 12. "The Event Loop Explained"
**Type: Explanation**
**Reasoning:** "Explained" signals cognition. The content covers how the event loop works, why JavaScript is single-threaded, and how asynchronous operations are handled. Cognition + acquisition = explanation.

### 13. "Git Cheat Sheet"
**Type: Reference**
**Reasoning:** A quick-lookup table of Git commands, their flags, and their effects. Organised for scanning, not reading. Cognition + application = reference.

### 14. "Authentication Best Practices"
**Type: How-to (primarily)**
**Reasoning:** Despite "best practices" sounding explanatory, this content typically provides actionable steps: "Use bcrypt for hashing", "Set token expiry to X", "Implement rate limiting by doing Y". It's task-oriented. If it dwells on WHY these practices exist, it has explanation elements and may need splitting.

### 15. "What is Kubernetes?"
**Type: Explanation**
**Reasoning:** The reader is building a mental model of what Kubernetes is, what problems it solves, and how it fits into the container orchestration landscape. Cognition + acquisition = explanation.

## Splitting Mixed Documents

### Example: "Authentication Guide"

**Original mixed document outline:**

```
# Authentication Guide
## What is Authentication?       ← explanation
## Auth vs Authorisation         ← explanation
## Setting Up Passport.js        ← tutorial
## Configuring JWT Tokens        ← how-to
## Strategy Reference Table      ← reference
## Common Auth Patterns          ← explanation
## Troubleshooting Login Issues  ← how-to
```

**Split into proper diataxis types:**

**Explanation: "Understanding Authentication"**
- What is authentication?
- Authentication vs authorisation
- Common authentication patterns
- Why different strategies exist and when to use each

**Tutorial: "Build Authentication with Passport.js"**
- Start from a fresh Express app
- Install and configure Passport.js step by step
- Implement local strategy (username/password)
- Verify it works by logging in
- Add session persistence

**How-to: "Configure JWT Authentication"**
- Prerequisites: existing Express app with user model
- Install jsonwebtoken
- Create sign and verify functions
- Add auth middleware to protected routes
- Handle token refresh

**How-to: "Fix Common Authentication Problems"**
- "Login returns 401 but credentials are correct" → check password hashing
- "Token expired errors" → adjust expiry, implement refresh flow
- "Session lost on server restart" → configure persistent session store

**Reference: "Authentication Strategy Reference"**
- Table of strategies: Local, OAuth2, SAML, API Key, JWT
- Each entry: mechanism, use case, security properties, configuration fields

### Why This Split Works

The original document forces the reader to wade through explanation to find the how-to steps, or skip past tutorial content to reach the reference table. Each piece now has a clear audience and purpose:
- The curious reader goes to the explanation
- The newcomer follows the tutorial
- The practitioner uses the how-to
- The working developer consults the reference

## Same Feature, Four Types: Git Branching

### Tutorial: "Your First Git Branch"

> We're going to create a branch, make changes on it, and merge it back. By the end, you'll understand the basic branch workflow.
>
> Let's start by checking which branch we're on:
>
> ```bash
> git branch
> ```
>
> You should see `* main` — the asterisk shows your current branch.
>
> Now let's create a new branch called `feature`:
>
> ```bash
> git checkout -b feature
> ```
>
> Run `git branch` again. You'll see two branches, with the asterisk now on `feature`. We've created a new timeline for our changes.
>
> Create a new file — anything you like. I'll use:
>
> ```bash
> echo "Hello from the feature branch" > feature.txt
> git add feature.txt
> git commit -m "Add feature file"
> ```
>
> Now switch back to `main`:
>
> ```bash
> git checkout main
> ```
>
> Notice that `feature.txt` is gone. It only exists on the `feature` branch. Let's bring it over:
>
> ```bash
> git merge feature
> ```
>
> Now `feature.txt` exists on `main` too. We just completed a full branch-and-merge cycle.

### How-to: "Create a Feature Branch and Merge It"

> **Goal:** Develop a feature in isolation and merge it into `main` when ready.
>
> **Prerequisites:** Git installed, repository initialised, on the `main` branch.
>
> 1. Create and switch to a new branch:
>    ```bash
>    git checkout -b feature/your-feature-name
>    ```
>
> 2. Make your changes and commit them normally.
>
> 3. When the feature is complete, switch back to `main`:
>    ```bash
>    git checkout main
>    ```
>
> 4. Pull latest changes (if working with a remote):
>    ```bash
>    git pull origin main
>    ```
>
> 5. Merge the feature branch:
>    ```bash
>    git merge feature/your-feature-name
>    ```
>
> 6. If there are conflicts, resolve them, then:
>    ```bash
>    git add .
>    git commit
>    ```
>
> 7. Delete the feature branch (optional):
>    ```bash
>    git branch -d feature/your-feature-name
>    ```
>
> **Variation:** If you prefer a linear history, use `git rebase main` while on the feature branch before merging, or use `git merge --ff-only`.

### Explanation: "How Git Branching Works"

> Git branches are not copies of your code. This is the most common misconception, and understanding why it's wrong changes how you think about Git.
>
> A branch in Git is a pointer — a small file containing a 40-character hash that identifies a commit. When you create a branch, Git creates a new pointer. It does not copy files, does not duplicate history, does not allocate additional storage. The operation is nearly instant regardless of repository size, because nothing is being copied.
>
> This is possible because Git's data model is a directed acyclic graph (DAG) of commits. Each commit points to its parent(s) and to a tree object that represents the file state. Branches are just named pointers into this graph.
>
> When you commit on a branch, Git advances that branch's pointer to the new commit. Other branches still point where they were. This is how branches "diverge" — not by splitting files, but by growing different chains of commits from a common ancestor.
>
> Merging, then, is the process of finding the common ancestor of two branch tips and combining the changes made since that ancestor. If the changes do not overlap, Git can do this automatically. If they do overlap, you get a merge conflict — not because Git is confused, but because it cannot decide which change you intended.
>
> This design has consequences. Because branches are cheap (just pointers), you can create dozens without cost. Because history is a graph, you can see exactly where branches diverged and what changed on each. And because merging is based on content differences rather than file copies, it is remarkably accurate — far more so than the file-locking or checkout-based systems that preceded Git.

### Reference: "Git Branch Commands"

> | Command | Description | Notes |
> |---------|-------------|-------|
> | `git branch` | List local branches | Current branch marked with `*` |
> | `git branch <name>` | Create a new branch | Does not switch to it |
> | `git branch -d <name>` | Delete a branch (safe) | Fails if branch has unmerged changes |
> | `git branch -D <name>` | Delete a branch (force) | Deletes even with unmerged changes |
> | `git branch -m <old> <new>` | Rename a branch | Use `-M` to force |
> | `git branch -a` | List all branches (local + remote) | Remote branches prefixed with `remotes/` |
> | `git branch -v` | List branches with last commit | Shows short hash and subject |
> | `git branch --merged` | List branches merged into current | Safe to delete these |
> | `git branch --no-merged` | List branches not yet merged | These have unmerged work |
> | `git checkout <name>` | Switch to a branch | Working tree must be clean or stashable |
> | `git checkout -b <name>` | Create and switch to a branch | Shorthand for `branch` + `checkout` |
> | `git switch <name>` | Switch to a branch (modern) | Preferred over `checkout` for switching |
> | `git switch -c <name>` | Create and switch (modern) | Preferred over `checkout -b` |
> | `git merge <name>` | Merge `<name>` into current branch | Creates a merge commit unless fast-forward |
> | `git merge --ff-only <name>` | Merge only if fast-forward is possible | Fails if branches have diverged |
> | `git merge --no-ff <name>` | Always create a merge commit | Even if fast-forward is possible |
> | `git rebase <name>` | Rebase current branch onto `<name>` | Rewrites history — do not use on shared branches |
