---
title: "Engineers Are Optimizing for the Wrong Kind of Correct"
date: 2026-09-18
summary: "AI isn’t producing slop. Your missing quality gates are."
tags: [ai, engineering, leadership]
sourceUrl: "https://www.nextw.com/tech-blog/engineers-are-optimizing-for-the-wrong-kind-of-correct"
sourceName: "Nextworld Tech Blog"
---

One of the things that makes an engineer stand out is their attention to detail. The pride that they take in writing code that elegantly solves a problem, within given budgets, with as little room for error and as much room for scalability as possible. We all know these individuals, and they apply this attention to detail to more than just their professional life.

However, this attention to detail often optimizes for the wrong thing. It prioritizes a specific definition of “correctness” at the cost of “efficiency,” even when they do not need to be mutually exclusive. In this way, engineers often behave like artists, looking at their code and their architecture as a creative expression that they have a vision for and that they want other human engineers to be able to make sense of.

The rest of the world, however, is not defining “correctness” by how elegant the code is. They do not necessarily care how human-readable it is, nor whether proper polymorphism was used. Rather, they are defining “correctness” simply by whether or not the end solution is secure, performant, maintainable (increasingly by AI), and ultimately works for the end user.

## Engineers must evolve their definition of “correctness.”

Artificial intelligence is forcing engineers to embrace the general population’s definition of correctness. There is no way to be efficient without AI, as the expectations for output speed and quality have increased substantially.

Additionally, many things that engineers used to spend energy perfecting no longer carry the same importance. For example, readability and writability of code — the north star that has driven most programming language evolutions over the decades — is evolving from being human-focused to being AI-focused.

This is similar to every other efficiency step-up in every other industry. Think about assembly lines and factories. Sure, there is “artistic worth” in a dining table that is crafted using hand tools by a master woodworker, but it is no more “correct” at solving the “where will I sit to eat” problem than a dining table made in a factory that you can purchase at a big-box furniture store.

And, unless I’m grossly out of touch, most of our dining tables came from big-box furniture stores.

## But how do you make sure the legs don’t fall off?

You put proper quality assurance gates in place, and you do so in a manner that allows the automated system to execute them, reflect on them, and react to any failures that they highlight before the product leaves the factory and without needing a human to get involved.

Competent software engineering teams already have these quality gates, and those gates often cost more to build than the product itself. They test individual pieces of the code (a.k.a. unit tests), how the individual pieces interact with each other and with other systems (a.k.a. integration tests), the user experience, and more. They also grade the security, complexity, and quality of the code. And they must pass before any version of the product is released to the public.

Many “vibe coding” tools available on the market today are not equipped to write, execute, and iterate on these automated tests for their non-engineer users. In fact, many of them do not even capture the most important prerequisite for writing these tests: the end users’ outcome-based requirements for what is being built, which are what actually define the tests you need.

## The most AI-forward teams are not struggling with AI breaking things.

Because the work of their AI, just like the work of their humans, is subject to their product’s automated quality gates. The “AI slop” argument is largely one brought forward by teams that do not have automated quality gates in place to begin with, and do not know how to integrate them into an AI-native workflow.

As we have implemented AI-native workflows for our engineering teams at Nextworld, our bug backlog has decreased and our velocity has increased. Within three months, that increase was nearly 60%. And the productivity gains have only grown as we have evolved our workflows to be AI-native.

Additionally, because AI is so good at exploring edge cases, our test coverage has increased.

This is the reality I would expect from any competent, AI-forward software engineering organization.

The point is, yes, AI causes defects just like humans cause defects. But with the proper harness and quality gates in place, those defects, whether they originate from humans or AI, are mitigated.

## The thing engineers dislike the most is the perceived death of the artistic side of software engineering.

They are in the middle of the movement from craftsmanship to factory production for software. And that can present an identity crisis.

But there is hope in **taking core engineering principles and artistic pursuits, and elevating them to the creation of these AI systems themselves**.

## The new engineering problem to solve is how to automate the end-to-end creation of software.

To be clear, I am talking about agents that understand and execute the full software development lifecycle — quality gates included — while holding themselves accountable for “correctness” as defined by end users. This is the “machine” that needs to be built and tuned, and it is the most valuable use of software engineering skills in today’s era.
