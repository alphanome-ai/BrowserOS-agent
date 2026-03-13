import { motion } from 'motion/react'
import type { FC } from 'react'

export const NewTabBranding: FC = () => {
  return (
    <div className="space-y-4 text-center">
      <div className="mb-2 flex items-center justify-center gap-3">
        <motion.div
          layoutId="new-tab-branding"
          transition={{
            type: 'keyframes',
            damping: 20,
            stiffness: 300,
          }}
          className="flex items-center justify-center"
        >
          <span className="font-semibold text-5xl tracking-tight">
            Ask Fouwser
          </span>
        </motion.div>
      </div>
    </div>
  )
}
