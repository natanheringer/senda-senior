/**
 * Recomprime imagens em public/ (PNG/JPEG) com sharp.
 * - Aplica rota EXIF; reduz o lado maior se exceder 2560px
 * - PNG: zlib com effort alto. JPEG: mozjpeg. Só grava se o ficheiro encolher.
 * - Ficheiros .png cujo conteúdo seja na verdade JPEG: converter manualmente
 *   (renomear para .jpg e reexportar) — de outro modo o alvo PNG cresce.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.join(__dirname, '..', 'public')
const MAX_PX = 2560
const DRY = process.argv.includes('--dry')

const exts = new Set(['.png', '.jpg', '.jpeg'])

async function walk(d, out) {
  const entries = await fs.readdir(d, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) await walk(p, out)
    else if (exts.has(path.extname(e.name).toLowerCase())) out.push(p)
  }
}

async function collect(dir) {
  const out = []
  await walk(dir, out)
  return out
}

async function processFile(filePath) {
  const before = (await fs.stat(filePath)).size
  const buf = await fs.readFile(filePath)
  let s = sharp(buf).rotate()
  const meta = await s.metadata()
  if (!meta.width || !meta.height) {
    return { filePath, before, after: before, saved: 0, note: 'skip' }
  }
  const maxd = Math.max(meta.width, meta.height)
  if (maxd > MAX_PX) {
    s = s.resize({
      width: meta.width >= meta.height ? MAX_PX : undefined,
      height: meta.width < meta.height ? MAX_PX : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }
  const ext = path.extname(filePath).toLowerCase()
  const outBuf =
    ext === '.png'
      ? await s.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }).toBuffer()
      : await s.jpeg({ quality: 86, mozjpeg: true, chromaSubsampling: '4:2:0' }).toBuffer()
  const after = outBuf.length
  if (after < before) {
    if (!DRY) await fs.writeFile(filePath, outBuf)
    return { filePath, before, after, saved: before - after, note: 'ok' }
  }
  return { filePath, before, after, saved: 0, note: 'larger' }
}

const files = await collect(publicDir)
let total = 0
for (const f of files) {
  try {
    const r = await processFile(f)
    if (r.saved) {
      total += r.saved
      const rel = path.relative(publicDir, r.filePath)
      const kb = (r.before / 1024).toFixed(1)
      const kb2 = (r.after / 1024).toFixed(1)
      console.log(rel, `${kb} KB -> ${kb2} KB (−${(r.saved / 1024).toFixed(1)} KB)`)
    } else if (r.note === 'larger' || r.note === 'skip') {
      // ficheiro já pequeno ou sem ganho; silêncio
    }
  } catch (e) {
    console.error('Falhou:', path.relative(publicDir, f), e.message)
  }
}
if (DRY) console.log('(modo --dry, nada foi escrito no disco)')
console.log(`Poupado: ${(total / 1024 / 1024).toFixed(2)} MB`)
