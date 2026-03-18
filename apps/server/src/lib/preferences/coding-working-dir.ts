import { mkdir, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, isAbsolute, join, relative, resolve } from 'node:path'
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
  const corePath = await ensureCoreMemoryFile()
  const file = Bun.file(corePath)
  const content = await file.text()
  if (!content.trim()) return null
  return extractLastPreferredRepoBasePath(content)
}

async function ensureCoreMemoryFile(): Promise<string> {
  const corePath = getCoreMemoryPath()
  await mkdir(dirname(corePath), { recursive: true })
  const file = Bun.file(corePath)
  if (await file.exists()) return corePath

  await writeFile(
    corePath,
    '# Core Memory\n\n# Add preferences below.\n',
    'utf-8',
  )
  return corePath
}

function resolveCodingFallbackDir(
  userWorkingDir: string | undefined,
  fallbackWorkingDir: string | undefined,
): string {
  return resolve(
    userWorkingDir ?? fallbackWorkingDir ?? join(homedir(), 'Downloads'),
  )
}

export async function resolveCodingWorkingDir(
  userWorkingDir?: string,
  fallbackWorkingDir?: string,
): Promise<string> {
  const preferredPathRaw = await readPreferredRepoBasePath()
  if (!preferredPathRaw) {
    const fallbackDir = resolveCodingFallbackDir(
      userWorkingDir,
      fallbackWorkingDir,
    )
    await mkdir(fallbackDir, { recursive: true })
    return fallbackDir
  }

  if (!isAbsolute(preferredPathRaw)) {
    const fallbackDir = resolveCodingFallbackDir(
      userWorkingDir,
      fallbackWorkingDir,
    )
    await mkdir(fallbackDir, { recursive: true })
    return fallbackDir
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
