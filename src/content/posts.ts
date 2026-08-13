import type { Post } from "@/types/post"

export const posts: Post[] = [
  {
    slug: "automation-without-theatre",
    title: "Automation without the theatre",
    category: "Perspective",
    date: "July 24, 2026",
    excerpt: "The best automation disappears into the work. A practical framework for choosing systems that create real leverage.",
    image: "/images/hero-portal.png",
    readingTime: "6 min read",
    content: [
      { heading: "Start with the constraint", body: "Useful automation begins with an operational constraint, not a technology demonstration. The work is to identify where decisions slow down, context disappears, or repetitive coordination consumes skilled attention." },
      { heading: "Design for trust", body: "A system earns trust when its inputs are legible, its recommendations are explainable, and people know exactly when judgment is still required. Reliability is a product decision, not a technical afterthought." },
      { heading: "Measure the changed behaviour", body: "Hours saved matter, but the deeper signal is whether the team works differently. Look for shorter feedback loops, fewer handoffs, and decisions that improve as the system learns." },
    ],
  },
  {
    slug: "the-operating-layer",
    title: "Build the operating layer, not another tool",
    category: "Systems",
    date: "July 11, 2026",
    excerpt: "Why connected operational context matters more than adding another interface to the stack.",
    image: "/images/terrain-system.png",
    readingTime: "8 min read",
    content: [
      { heading: "Fragmentation is the tax", body: "Most teams do not lack software. They lack a coherent layer between software, decisions, and daily work. That gap is paid for through manual reconciliation and lost context." },
      { heading: "Connect around decisions", body: "Integration should be organised around the decisions a team needs to make. A shared operational model creates the context agents and automations need to act safely." },
    ],
  },
  {
    slug: "human-in-the-loop",
    title: "Where humans belong in an AI workflow",
    category: "Field notes",
    date: "June 28, 2026",
    excerpt: "A clear model for deciding what machines should execute, recommend, or leave entirely to people.",
    image: "/images/robotic-system.png",
    readingTime: "5 min read",
    content: [
      { heading: "Separate judgment from repetition", body: "The goal is not to remove people from work. It is to protect their attention for ambiguity, relationships, and consequential judgment while systems handle repeatable coordination." },
      { heading: "Use graduated autonomy", body: "Begin with recommendations, prove reliability, and expand execution rights only where outcomes are observable and reversible. Autonomy should be earned by the workflow." },
    ],
  },
]
