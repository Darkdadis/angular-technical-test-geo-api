/**
 * Represents a commune model containing information about a specific commune.
 *
 * @interface CommuneModel
 * @property {string} code - The unique code that identifies the commune.
 * @property {string} nom - The name of the commune.
 * @property {string[]} codePostaux - An array of postal codes associated with the commune.
 */
export interface CommuneModel {
  code: string;
  nom: string;
  codePostaux: string[];
}
