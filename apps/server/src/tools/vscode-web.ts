import { resolve } from 'node:path'
import { z } from 'zod'
import {
  getVsCodeWebUiUrlForFolder,
  openVsCodeWebUiForFolder,
} from '../lib/prerequisites/vscode-web'
import { defineTool } from './framework'

const ACTIONS = ['start', 'open'] as const

export const vscode_web = defineTool({
  name: 'vscode_web',
  description:
    'Start/reuse VS Code Web server for local coding folders and optionally open it in a browser tab. Use this in coding tasks when you want an in-browser VS Code view for the current repo or edited folder.',
  input: z.object({
    action: z
      .enum(ACTIONS)
      .optional()
      .default('open')
      .describe(
        '"start" returns URL without opening a tab; "open" opens the URL in browser and returns it.',
      ),
    folder: z
      .string()
      .optional()
      .describe(
        'Folder path for VS Code Web. Relative paths are resolved against cwd.',
      ),
    cwd: z
      .string()
      .optional()
      .describe(
        'Base directory for resolving relative folder paths (defaults to process cwd).',
      ),
    forceNewTab: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        'When action is "open", open a new tab even if this folder was already opened before.',
      ),
  }),
  handler: async (args, ctx, response) => {
    const baseDir = args.cwd ? resolve(args.cwd) : process.cwd()
    const folderPath = args.folder ? resolve(baseDir, args.folder) : baseDir

    const url =
      args.action === 'start'
        ? await getVsCodeWebUiUrlForFolder(folderPath)
        : await openVsCodeWebUiForFolder(ctx.browser, folderPath, {
            forceNewTab: args.forceNewTab,
          })

    const actionText =
      args.action === 'start'
        ? 'Started/reused VS Code Web server'
        : 'Opened VS Code Web UI in browser'

    response.text(`${actionText}\nFolder: ${folderPath}\nWeb UI: ${url}`)
  },
})
