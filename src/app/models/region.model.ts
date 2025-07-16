/**
 * Represents a regional model with specific properties.
 *
 * @interface RegionModel
 * @property {string} code - The unique code identifier for the region.
 * @property {string} nom - The name of the region.
 * @property {number} score - The score associated with the region.
 */
export interface RegionModel {
  code: string;
  nom: string;
  score: number;
}
