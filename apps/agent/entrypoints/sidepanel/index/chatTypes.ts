export type ChatMode = 'chat' | 'agent' | 'coding'

export interface Suggestion {
  display: string
  prompt: string
  icon: string
}

export const CHAT_SUGGESTIONS: Suggestion[] = [
  {
    display: 'Summarize this page',
    prompt: 'Read the current tab and summarize it in bullet points',
    icon: '✨',
  },
  // {
  //   display: 'What topics does this page talk about?',
  //   prompt:
  //     'Read the current tab and briefly describe what it is about in 1-2 lines',
  //   icon: '🔍',
  // },
  // {
  //   display: 'Extract comments from this page',
  //   prompt: 'Read the current tab and extract comments as bullet points',
  //   icon: '💬',
  // },
]

export const AGENT_SUGGESTIONS: Suggestion[] = [
  // {
  //   display: 'Read about our vision and upvote',
  //   prompt:
  //     'Go to https://dub.sh/browseros-launch in current tab. Find and click the upvote button',
  //   icon: '❤️',
  // },
  // {
  //   display: 'Support BrowserOS on Github',
  //   prompt:
  //     'Go to http://git.new/browseros in current tab and star the repository',
  //   icon: '⭐',
  // },
  {
    display: 'Open amazon.com and order a GPU for me',
    prompt: 'Navigate to amazon.com and add a GPU for me to my cart.',
    icon: '🛒',
  },
]

export const CODING_SUGGESTIONS: Suggestion[] = [
  {
    display: 'Build a personal productivity web app',
    prompt:
      // 'Build a modern, fast, production-ready personal productivity SaaS web app (Notion/TickTick/Todoist quality) using Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, React hooks + Server Actions, and Prisma with Vercel Postgres (or SQLite fallback), plus NextAuth (email + Google). Include dashboard insights, task management (priority, due dates, drag-drop, completion), habits with streaks and heatmap, goals with milestones/progress, rich notes with tags/search, and a Pomodoro timer with session tracking; make it fully responsive, animated, dark/light mode, accessible, SEO-ready, and Vercel zero-config deployable. Use a clean /app /components /lib /db /actions architecture with server components by default, loading skeletons, error boundaries, code splitting, env support, sample seed data, Prisma schema, and a README with Vercel deploy steps; then run the dev server and open/share the preview URL.',
      'Build a simple landing page for a toy store as a SPA using react js, use vite.',
    icon: '📊',
  },
  // {
  //   display: 'Trace this error',
  //   prompt:
  //     'Find the code path causing this bug and suggest a focused patch with validation steps',
  //   icon: '🛠️',
  // },
  // {
  //   display: 'Refactor safely',
  //   prompt:
  //     'Refactor the relevant code with minimal behavior change and run targeted checks',
  //   icon: '🧩',
  // },
]
