import type { FC } from 'react'
import { Badge } from '@/components/ui/badge'
import { ProviderIcon } from '@/lib/llm-providers/providerIcons'
import type { ProviderTemplate } from '@/lib/llm-providers/providerTemplates'
import { cn } from '@/lib/utils'

interface ProviderTemplateCardProps {
  template: ProviderTemplate
  highlighted?: boolean
  onUseTemplate: (template: ProviderTemplate) => void
}

export const ProviderTemplateCard: FC<ProviderTemplateCardProps> = ({
  template,
  highlighted = false,
  onUseTemplate,
}) => {
  return (
    <button
      type="button"
      onClick={() => onUseTemplate(template)}
      className="group flex w-full min-w-0 items-center gap-3 rounded-lg border border-border bg-background p-4 text-left transition-all hover:border-[var(--accent-orange)] hover:shadow-md"
    >
      <div className="flex min-w-0 flex-1 items-center gap-3 text-accent-orange/70 transition-colors group-hover:text-accent-orange">
        <ProviderIcon type={template.id} size={28} />
        <span className="truncate font-medium text-foreground">
          {template.name}
        </span>
      </div>
      <Badge
        variant="outline"
        className="shrink-0 rounded-md px-3 py-1 transition-colors group-hover:border-[var(--accent-orange)] group-hover:text-[var(--accent-orange)]"
      >
        USE
      </Badge>
    </button>
  )
}
