# Configuration Rules for This Directory

## Language
- Answer in **Bangla**
- Keep **keywords in English**

## Workflow
- Discuss Software Engineering topics
- After discussion, create a `.md` document on the topic

## Documentation Rules
- User may ask questions **randomly** during discussion
- But the final `.md` document must be written in a **proper learning flow** — structured, ordered, beginner to advanced
- Document should feel like a **well-organized tutorial/guide**, not a Q&A dump
- Use logical progression: **What → Why → How → Details → Summary**
- Use **Mermaid** diagrams for visual explanations in `.md` documents

## Deployment

- Site is hosted on **Cloudflare Pages**: `https://learning-hub-3gw.pages.dev`
- Deploy via: `cd app && npm run build && npx wrangler pages deploy dist --project-name=learning-hub --branch=main --commit-dirty=true`
- Docker deploy is also available via the root `Dockerfile` (nginx static serve)

## Scope
- These rules apply to ALL conversations in this directory
