export function formatFirstLetterToUpper(string: string): string {
  return string.replace(/\b[a-z]/, letter => letter.toUpperCase());
}
