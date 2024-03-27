/**
 * Generates a fake but valid Inscrição Estadual (IE) number, a Brazilian state registration document.
 * The format and validation rules vary by state, but this function generates a simple, generic format.
 * @returns {string} A valid Inscrição Estadual number
 */
export function generateFakeValidInscricaoEstadual() {
    function randomDigit() {
        return Math.floor(Math.random() * 10);
    }

    function calculateCheckDigit(digits) {
        let sum = 0;
        for (let i = 0, j = digits.length + 1; i < digits.length; i++, j--) {
            sum += digits[i] * j;
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    // Generating a simple 9-digit base for the IE number
    const baseDigits = Array.from({ length: 8 }, randomDigit);
    baseDigits.push(calculateCheckDigit(baseDigits));

    // This is a very simplified version and does not adhere to the specific rules of each Brazilian state
    return baseDigits.join('').replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
}
