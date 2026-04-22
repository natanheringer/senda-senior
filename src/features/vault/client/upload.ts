import { sha256OfFile } from './hash'
import type { ActionResult } from '../errors'

/**
 * Pipeline cliente de upload. Pensado para ser plugado em qualquer ui
 * (botão único, drag-drop, área grande). Não conhece a ui — só toca
 * server actions e supabase storage.
 */

interface UploadCallbacks {
  prepareUpload: (input: {
    name: string
    size: number
    mime: string
    sha256: string
  }) => Promise<
    ActionResult<{
      fileId: string
      uploadUrl: string
      uploadToken: string
      storagePath: string
      expiresAt: string
    }>
  >
  confirmUpload: (fileId: string) => Promise<ActionResult<unknown>>
  onProgress?: (phase: 'hashing' | 'uploading' | 'confirming', percent: number) => void
}

export interface UploadResult {
  ok: boolean
  fileId?: string
  error?: string
}

export async function uploadFile(
  file: File,
  cb: UploadCallbacks,
): Promise<UploadResult> {
  cb.onProgress?.('hashing', 0)
  const sha256 = await sha256OfFile(file)
  cb.onProgress?.('hashing', 100)

  const prepared = await cb.prepareUpload({
    name: file.name,
    size: file.size,
    mime: file.type || 'application/octet-stream',
    sha256,
  })

  if (!prepared.ok) {
    return { ok: false, error: prepared.error }
  }

  cb.onProgress?.('uploading', 0)

  // Mesmo formato que `StorageFileApi.uploadToSignedUrl` (storage-js): multipart
  // com cacheControl + ficheiro no campo `""`. PUT com `body: file` costuma falhar na API.
  const form = new FormData()
  form.append('cacheControl', '3600')
  form.append('', file)

  const putResp = await fetch(prepared.data.uploadUrl, {
    method: 'PUT',
    headers: {
      'x-upsert': 'false',
    },
    body: form,
  })

  if (!putResp.ok) {
    try {
      const detail = await putResp.text()
      console.error('[vault upload] PUT signed URL failed:', putResp.status, detail)
    } catch {
      console.error('[vault upload] PUT signed URL failed:', putResp.status)
    }
    return { ok: false, error: 'storage_error' }
  }

  cb.onProgress?.('uploading', 100)
  cb.onProgress?.('confirming', 0)

  const confirmed = await cb.confirmUpload(prepared.data.fileId)
  cb.onProgress?.('confirming', 100)

  if (!confirmed.ok) {
    return { ok: false, error: confirmed.error }
  }

  return { ok: true, fileId: prepared.data.fileId }
}
