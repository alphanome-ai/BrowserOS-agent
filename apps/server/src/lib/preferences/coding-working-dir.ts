import { mkdir } from 'node:fs/promises'
import { isAbsolute, relative, resolve } from 'node:path'
import { getCoreMemoryPath } from '../browseros-dir'

function extractLastPreferredRepoBasePath(coreMemory: string): string | null {
  const pattern =
    /^\s*(?:-\s*)?preferred_repo_base_path\s*:\s*(?<path>.+?)\s*$/gm
  const matches = [...coreMemory.matchAll(pattern)]
  const last = matches.at(-1)?.groups?.path?.trim()
  if (!last) return null

  // Allow quoted values in memory
  return last.replace(/^['"]|['"]$/g, '')
}

function isWithinBasePath(targetPath: string, basePath: string): boolean {
  const rel = relative(basePath, targetPath)
  return rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))
}

async function readPreferredRepoBasePath(): Promise<string | null> {
  const corePath = getCoreMemoryPath()
  const file = Bun.file(corePath)
  if (!(await file.exists())) return null
  const content = await file.text()
  if (!content.trim()) return null
  return extractLastPreferredRepoBasePath(content)
}

export async function resolveCodingWorkingDir(
  userWorkingDir?: string,
): Promise<string> {
  const preferredPathRaw = await readPreferredRepoBasePath()
  if (!preferredPathRaw) {
    throw new Error(
      'Coding mode requires preferred_repo_base_path in core memory. Ask the user for their preferred repo path, then save it to core memory before running coding tasks.',
    )
  }

  if (!isAbsolute(preferredPathRaw)) {
    throw new Error(
      `Invalid preferred_repo_base_path in core memory: "${preferredPathRaw}" must be an absolute path.`,
    )
  }

  const preferredPath = resolve(preferredPathRaw)
  await mkdir(preferredPath, { recursive: true })

  if (!userWorkingDir) {
    return preferredPath
  }

  const requestedPath = resolve(userWorkingDir)
  if (!isWithinBasePath(requestedPath, preferredPath)) {
    throw new Error(
      `Coding mode requires working directory under preferred_repo_base_path (${preferredPath}). Received: ${requestedPath}`,
    )
  }

  await mkdir(requestedPath, { recursive: true })
  return requestedPath
}
