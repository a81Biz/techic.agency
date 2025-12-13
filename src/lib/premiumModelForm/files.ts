export const MIN_FILES = 3
export const MAX_FILES = 5

/**
 * Mezcla fotos nuevas con las existentes respetando el máximo.
 * Se usa en el onChange del input file.
 */
export function mergeFiles(prev: File[], selected: File[]): File[] {
  if (!selected.length) return prev
  const combined = [...prev, ...selected]
  return combined.slice(0, MAX_FILES)
}

/**
 * Valida que la cantidad de fotos esté dentro del rango permitido.
 * Devuelve:
 *  - null si la cantidad es válida
 *  - un mensaje de error si no lo es
 */
export function validateFilesCount(files: File[]): string | null {
  if (files.length < MIN_FILES) {
    return `Sube al menos ${MIN_FILES} fotos de referencia (mínimo ${MIN_FILES}, máximo ${MAX_FILES}).`
  }

  if (files.length > MAX_FILES) {
    return `Máximo ${MAX_FILES} fotos. Elimina alguna para continuar.`
  }

  return null
}

/**
 * Limpia cualquier entrada previa de 'files' en el FormData y vuelve a agregar
 * solo los archivos indicados.
 */
export function appendFilesToFormData(formData: FormData, files: File[]): void {
  formData.delete('files')
  files.forEach((file) => {
    formData.append('files', file, file.name)
  })
}
