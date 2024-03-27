/**
 * Generates a fake but valid CNPJ number.
 * CNPJ format: XX.XXX.XXX/0001-XX
 * @returns {string} A valid CNPJ number
 */
export function generateFakeValidCnpj() {
    function randomDigit() {
        return Math.floor(Math.random() * 9);
    }

    function calculateDigit(digits) {
        const multipliers = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        for (let i = 0; i < digits.length; i++) {
            sum += digits[i] * multipliers[i];
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    const cnpj = Array.from({ length: 12 }, (_, index) => {
        // The first 8 digits can be random, the next 3 are branch digits (usually 001 for the main office), and the last one is the company type (usually 1 for regular companies)
        return index < 8 ? randomDigit() : index === 8 || index === 9 ? 0 : index === 10 ? 0 : 1;
    });

    cnpj.push(calculateDigit(cnpj));
    cnpj.push(calculateDigit(Number(cnpj.concat(cnpj[12]).join(''))));

    return cnpj.join('').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

let create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
let number_random = (number) => (Math.round(Math.random() * number));
let mod = (dividendo, divisor) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

export function generateFakeValidCnpjV2(masked = true) {
    let total_array = 8;
    let n = 9;
    let [n1, n2, n3, n4, n5, n6, n7, n8] = create_array(total_array, n);
    let n9 = 0;
    let n10 = 0;
    let n11 = 0;
    let n12 = 1;

    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;

    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    if (masked)
        return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
    else
        return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${n10}${n11}${n12}${d1}${d2}`;
}
