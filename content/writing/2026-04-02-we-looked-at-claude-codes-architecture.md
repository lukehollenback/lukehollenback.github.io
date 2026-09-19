---
title: "We Looked at Claude Code's Architecture. It Looked Familiar."
date: 2026-04-02
summary: "What Anthropic's leaked source confirms about building agentic systems for the enterprise."
tags: [ai, engineering]
sourceUrl: "https://www.nextw.com/tech-blog/claude-code-architecture-3-enterprise-ai-patterns"
sourceName: "Nextworld Tech Blog"
---

Anthropic's Claude Code source recently became public, and the architecture is worth studying, not for the code itself, but for what it confirms about what production agentic systems actually require.

The leaked code itself is not a major threat to Anthropic. There are plenty of open source competitors to Claude Code out in the wild. Rather, Anthropic's moat is the industry-leading models they've engineered, which they gatekeep access to, and which all of these other products rely on.

The rest of us have to find novel ways to leverage the models these AI labs produce—ways to understand and solve nuanced business problems by building a significant amount of trustworthy infrastructure and code on top.

> Shadow ERP™ is the layer of ungoverned tools, workarounds, and manual processes organizations build when their enterprise systems can't support how the business actually operates. These systems carry real operational weight but lack the security, auditability, and scalability of the platforms they supplement. It's the problem at the center of Nextworld's platform strategy.

At Nextworld, we've spent months building an enterprise-grade Agentic Development product—which uniquely offers a governed, scalable, and integrated facility for eliminating your organization's Shadow ERP™ using a prompt-to-app workflow. You're not going to have an existential source code or business data leak when using Nextworld—because we've already built controls on top of the world's best models and protocols.

Seeing a major AI lab like Anthropic arrive at many of the same architectural conclusions independently is both validating and instructive. Here are three patterns that stood out to us.

## 1. The Permission System is the Product

Enterprises require controls on governance, compliance, and security. Not only do these controls come as industry expectations; they are often legally required. They are necessary not only on the operational side of a business, but also when building the actual software that enables it. Plans, reviews, approvals, and iteration are a part of nearly every enterprise-level process—so that existential mistakes can be identified and mitigated with as little of a blast radius as possible.

The biggest risk of AI's democratization of software development is that builders unfamiliar with these controls are creating solutions that quietly increase the vulnerable surface area of the business.

Claude Code implements a graduated autonomy model: five permission modes, ranging from read-only planning to full bypass, with autonomous code execution reviews, human approval, and machine learning-based risk assessment and auto-approval. That's serious investment in controls that protect when necessary and streamline when possible. The insight is clear: in agentic systems, trust is the UX. The permission model isn't security theater—it's the interface through which users build confidence to delegate more over time.

To bring it home, my engineering team at Nextworld would not be building software using Claude Code if it did not offer these controls. And even then, we have built additional tooling on top of Anthropic's product to ensure our processes and expectations are adhered to.

As consumers of AI ourselves, we know control-based trust is just as critical in the products we build. It matters to our customers that our Platform has deep agent traces to explain AI's thoughts and actions, database-level auditing to create paper trails, and full RBAC security on every app, row, field, and process. It matters that our Platform's agents can identify consequential actions and invoke human-in-the-loop for review and approval before executing. It matters that our Agentic Development product offers full transparency into its understanding of user intent and build plan.

Without these controls, we wouldn't have an Agentic Development product or an enterprise-grade AI Platform that humans could trust.

## 2. Context Management is Fundamental

The most productive humans have mastered how to identify and keep what is critically important front-of-mind, while avoiding spending energy on the rest. This is a hard skill to cultivate, and an even more difficult one to teach to a machine. A lot of it is based off of intuition and experience, rather than textbook rules.

While performing work, Claude Code runs a three-tier compression strategy: micro-compaction (drop stale tool output), auto-compaction (summarize conversation), and session memory extraction (persist knowledge across sessions). Plus circuit breakers when compaction fails repeatedly—as a failsafe to prevent wasting tokens (a.k.a. infrastructure spend). Context management is garbage collection for agents, and in the AI world, lingering garbage literally costs money.

In an enterprise setting, context is often shared verbally, making the Shadow ERP™ problem even more costly. It is common for individuals to spend significant amounts of their work day tracking down who might know how a particular process or spreadsheet works. And, that information might be extremely nuanced to the situation at hand.

Further, extensive written context has its own cost. In AI terms, it literally costs more tokens to process. In human terms, it costs time and energy to maintain, read, and share.

We've had to explore this at Nextworld. Context for agentic solutions doesn't reside with a single human. It resides with an organization, and it might only be relevant to a specific application, dashboard, report, project, or data record. As such, we've had to design memory systems as flexible as humans are, and find ways to distill and store intent, even as it evolves over long-form, multi-user and multi-agent conversations.

## 3. They Must Run Unattended

In order for agents to augment a workforce, they need to work independently, treating humans like their managers and coworkers, not their puppeteers. Agents that require human involvement have a labor cost that can destroy, rather than enhance, productivity. As such, agents that cannot work independently are simply a modern realization of the Shadow ERP™ problem.

From a product standpoint, the intentionality behind Claude Code's remote execution architecture validates this. It is already on its second generation: V1 used poll-based dispatch, V2 eliminates the polling layer entirely with direct JWT-based worker authentication. SSE over HTTP instead of WebSockets for firewall compatibility. Crash recovery via persistent bridge pointers. They're clearly betting that headless, unattended execution is the endgame.

Further, there are hints in the code at a future "autonomous assistant mode". This feature appears to be a way to let Claude Code think, research, code, and even "dream" for extended periods of time with no human involvement at all—truly embracing the concept of augmenting teams with agentic autonomy.

Professional developers—like those on my engineering team—have built environments for Claude Code to behave this way already. They have used sandboxed containers and source control systems to allow the tool to safely work, autonomously without human-in-the-loop, on issues as they come in. They have enforced organizational standards and guardrails on the tool. But, this infrastructure is fragile, is bespoke to each team and developer's custom workflow, and does not automatically support the governance requirements of enterprise IT organizations.

Nextworld shares this conviction: agentic tools should augment teams so humans spend their time on novel work that's difficult to automate. As such, our agentic tools, including Agentic Development, are built from the ground-up to run headless. This means that they can be invoked conversationally, on schedules, from eventing systems, and more. This also sets us up for the possible future where conversation-centric applications and dynamic interfaces become a standard expectation for enterprise solutions, much like the mobile-first movement reshaped consumer software.

## The Deeper Pattern

What Claude Code's architecture reveals isn't just a set of technical decisions. It's a maturity model for agentic systems. The teams that are serious about production—not demos, not prototypes—are converging on the same requirements: graduated trust, durable context, headless execution, and deep observability.

The difference is where you start. Claude Code started as a CLI for developers and is building toward enterprise. Nextworld started as a governed enterprise application platform and built Agentic Development natively on top of it. We think that second path—where security, auditability, multi-tenancy, and managed infrastructure are architectural pillars—is how agentic systems earn the trust of the organizations that actually need them.
