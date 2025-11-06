// src/config/sections.ts
import type { RawSectionConfig, SectionConfig } from '../models/section.model'

/**
 * Módulo que devuelve import.meta.glob para cada section.json
 * Puede ser el JSON directo o un objeto con { default: JSON }.
 */
type SectionModule = RawSectionConfig | { default: RawSectionConfig };

/**
 * Cargamos TODOS los content/*'/section.json de forma ansiosa (eager).
 * Ajusta la ruta si tu carpeta de contenido está en otra ubicación.
 */
const sectionModules = import.meta.glob<SectionModule>(
  '../../content/*/section.json',
  { eager: true }
);

const sections: Record<string, SectionConfig> = {};

/**
 * Recorremos cada section.json y lo normalizamos.
 */
for (const [path, mod] of Object.entries(sectionModules)) {
  const raw: RawSectionConfig =
    'default' in mod ? mod.default : mod;

  // nombre de carpeta: .../content/<folder>/section.json
  const parts = path.split('/');
  const folderName = parts[parts.length - 2];
  const id = raw.id ?? folderName;

  sections[id] = {
    ...raw,
    id,
    enabled: raw.enabled ?? true,
    showOnHome: raw.showOnHome ?? false,
    homeLimit: raw.homeLimit ?? 3,
    place: raw.place ?? 999
  };
}

/**
 * Config final de secciones, derivada de los JSON.
 * A partir de aquí ya no usamos import.meta.glob en ningún otro lado.
 */
export const SECTION_CONFIG: Record<string, SectionConfig> = sections;



/** ID de sección (projects, blog, calls, etc.) */
export type SectionId = keyof typeof SECTION_CONFIG;

/**
 * Secciones que son "collection" (tienen índice + detalle) y están activas.
 */
export const COLLECTION_SECTIONS = (Object.keys(
  SECTION_CONFIG
) as SectionId[]).filter(
  (id) =>
    SECTION_CONFIG[id].type === 'collection' &&
    SECTION_CONFIG[id].enabled
);

/**
 * Secciones que se mostrarán en el Home, ordenadas por "place".
 */
export const HOME_SECTIONS = (Object.keys(
  SECTION_CONFIG
) as SectionId[])
  .filter(
    (id) =>
      SECTION_CONFIG[id].type === 'collection' &&
      SECTION_CONFIG[id].enabled &&
      SECTION_CONFIG[id].showOnHome
  )
  .sort(
    (a, b) =>
      SECTION_CONFIG[a].place - SECTION_CONFIG[b].place
  );

/**
 * Tipo para componentes que aceptan sólo secciones “collection”.
 */
export type CollectionSectionId = (typeof COLLECTION_SECTIONS)[number];

// Secciones que son "single" (página única) y están activas
export const SINGLE_SECTIONS = (Object.keys(
  SECTION_CONFIG
) as SectionId[]).filter(
  (id) =>
    SECTION_CONFIG[id].type === 'single' &&
    SECTION_CONFIG[id].enabled
)

// Tipo para componentes que aceptan sólo secciones “single”
export type SingleSectionId = (typeof SINGLE_SECTIONS)[number]
