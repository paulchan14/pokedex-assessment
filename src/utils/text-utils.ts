export const removeLeadingZeroes = (number: number): string => String(number).replace(/^0+(?!\.|$)/, '');