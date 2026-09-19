---
description: Guidance for how AI agents working on this project should behave.
inject:
  - event: SessionStart
  - event: PreCompact
---

# AI Coding Agents

- Use your chosen model to thoroughly plan the execution of tasks, then pass said tasks to
  subagents.
- Using cheaper models when appropriate for subagents executing tasks.
  - This helps conserve expensive tokens when possible. But, never conserve at the cost of quality.
  - For example -> If your chosen model is Fable 5, prefer running your subagents under Opus 4.8 or
    Sonnet 5 when. (Don't index on these example model versions -- use what is available.)
  - Craft the prompts and context for your subagents according to the nuances of the model they
    will be running as.
