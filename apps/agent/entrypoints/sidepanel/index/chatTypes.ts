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
    prompt: 'Open amazon.com in current tab and add a GPU for me to cart',
    icon: '🛒',
  },
]

export const CODING_SUGGESTIONS: Suggestion[] = [
  {
    display: 'Build a personal productivity dashboard',
    prompt:
      'Build a single-page personal productivity dashboard using React, TypeScript, Vite, and Tailwind CSS, structured in a responsive three-column grid layout. Implement state management strictly using native React hooks and ensure all user data perfectly persists across page reloads via localStorage. Create a Task component with add, toggle, delete, and filter functionality, alongside a Notes component that uses a modal interface for managing editable text cards. Integrate a lightweight charting library like Recharts to display a smooth line chart tracking the users daily task completion percentage over the last seven days. Polish the interface with a modern, clean color palette, utilizing consistent Tailwind spacing and interactive hover transitions for a premium feel.',
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
