/**
 * Represents a model for a department with associated codes and name.
 *
 * This interface is used to define the structure of a department object.
 * It includes properties for the department code, name, and associated region code.
 *
 * Properties:
 * - `code` (string): The unique code associated with the department.
 * - `nom` (string): The name of the department.
 * - `codeRegion` (string): The unique code representing the region to which the department belongs.
 */
export interface DepartementModel {
  code: string;
  nom: string;
  codeRegion: string;
}
