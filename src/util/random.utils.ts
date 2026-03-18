/**
 * Generates a random alphanumeric string of a given length.
 *
 * The function creates a string consisting of:
 * - digits (0–9)
 * - uppercase letters (A–Z)
 * - lowercase letters (a–z)
 *
 * It uses ASCII character codes to randomly generate valid characters.
 *
 * @param range - The desired length of the generated string.
 * @returns A random alphanumeric string with the specified length.
 */
export function createRandomNumbers(range: number): string {
  let result = "";
  while (result.length < range) {
    const item = Math.floor(Math.random() * 75) + 48; // numbers from 48 to 122
    if (
      item <= 57 || // numbers
      (item >= 65 && item <= 90) || // A-Z
      (item >= 97 && item <= 122) // a-z
    ) {
      result += String.fromCharCode(item); // transform ASCII to string
    }
  }
  return result;
}
