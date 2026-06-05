import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const file = join(process.cwd(), 'node_modules/@nuxt/vite-builder/dist/index.mjs')

try {
  let content = readFileSync(file, 'utf8')

  const replace = 'fs.mkdtempSync(join(process.platform === "win32" ? os.tmpdir() : "/tmp", "nuxt-vite-node-"))'

  if (content.includes(replace)) {
    console.log('✅ Already patched')
    process.exit(0)
  }

  // Handle original or previously patched versions
  const patterns = [
    'fs.mkdtempSync(join(os.tmpdir(), "nuxt-vite-node-"))',
    'fs.mkdtempSync(join(os.tmpdir().length > 80 ? "/tmp" : os.tmpdir(), "nuxt-vite-node-"))',
  ]

  let patched = false
  for (const search of patterns) {
    if (content.includes(search)) {
      content = content.replace(search, replace)
      patched = true
      break
    }
  }

  if (patched) {
    writeFileSync(file, content, 'utf8')
    console.log('✅ Patched @nuxt/vite-builder — always use /tmp on macOS/Linux')
  } else {
    console.warn('⚠️  Could not find target string to patch')
  }
} catch (e) {
  console.warn('⚠️  Could not patch @nuxt/vite-builder:', e.message)
}
