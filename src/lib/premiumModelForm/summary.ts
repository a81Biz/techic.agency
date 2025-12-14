export interface PremiumProfileData {
  contentTypes: string[]
  limits: string[]
  limitsOther: string
  availability: string
  workModel: string
  goalMonthly: string
  goalCurrency: string // lo limitaremos a 'MXN' | 'USD' en el componente
  visualStyle: string[]
  instagramClean?: string
  whatsapp: string
}

/**
 * Convierte un arreglo en string legible, o un placeholder si está vacío.
 */
const listOrDefault = (arr: string[]): string =>
  arr.length > 0 ? arr.join(', ') : 'No especificado'

/**
 * Construye el texto completo del "PLAN INICIAL – MODELO PREMIUM"
 * a partir de los datos capturados en el formulario.
 */
export function buildPremiumSummary(data: PremiumProfileData): string {
  const contentTypesText = listOrDefault(data.contentTypes)

  const limitsList = listOrDefault(data.limits)
  const limitsOtherText =
    data.limitsOther.trim() !== '' ? data.limitsOther.trim() : 'No especificado'

  const limitsMerged =
    limitsList !== 'No especificado'
      ? `${limitsList}${
          limitsOtherText !== 'No especificado' ? ' / ' + limitsOtherText : ''
        }`
      : limitsOtherText

  const availabilityText =
    data.availability.trim() !== '' ? data.availability.trim() : 'No especificado'

  const workModelText =
    data.workModel.trim() !== '' ? data.workModel.trim() : 'No especificado'

  const goalMonthlyText =
    data.goalMonthly.trim() !== '' ? data.goalMonthly.trim() : 'No especificado'

  const goalCurrencyText = data.goalCurrency || 'No especificado'

  const visualStyleText = listOrDefault(data.visualStyle)


  return [
    'PLAN INICIAL – MODELO PREMIUM',
    '',
    `• Tipo de contenido: ${contentTypesText}`,
    `• Límites: ${limitsMerged}`,
    `• Disponibilidad: ${availabilityText}`,
    `• Modelo de trabajo elegido: ${workModelText}`,
    `• Objetivo mensual: ${goalMonthlyText} ${goalCurrencyText}`,
    `• Estilo visual preferido: ${visualStyleText}`,
    '',
    'Con esto propongo:',
    '- Diseñar un plan de contenido alineado a tu objetivo mensual,',
    '- Respetar todos los límites marcados,',
    '- Ajustar sesiones y horarios a tu disponibilidad,',
    '- Afinar estética visual según tus preferencias.',
  ].join('\n')
}
