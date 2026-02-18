/**
 * Shared utility functions for BaseX UI components.
 */

/**
 * Capitalize the first letter of a string.
 * Used for dynamic style key lookup: variant='solid' → styles[`variantSolid`]
 */
export function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}
