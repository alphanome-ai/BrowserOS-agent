import { storage } from '@wxt-dev/storage'
import type { UIMessage } from 'ai'

export interface ActiveConversationSnapshot {
  conversationId: string
  messages: UIMessage[]
  updatedAt: number
}

export const activeConversationStorage =
  storage.defineItem<ActiveConversationSnapshot | null>(
    'local:activeConversationSnapshot',
    {
      fallback: null,
    },
  )
