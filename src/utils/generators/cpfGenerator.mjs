/**
 * Generates a fake but valid CPF number.
 * CPF format: XXX.XXX.XXX-XX
 * @returns {string} A valid CPF number
 */
export function generateFakeValidCpf() {
    function randomDigit() {
        return Math.floor(Math.random() * 9);
    }

    function calculateDigit(digits) {
        let sum = 0;
        for (let i = 0, j = digits.length + 1; i < digits.length; i++, j--) {
            sum += digits[i] * j;
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    const cpf = Array.from({ length: 9 }, randomDigit);
    cpf.push(calculateDigit(cpf));
    cpf.push(calculateDigit(cpf.concat(cpf[9])));

    return cpf.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

let create_array = (total, numero) => Array.from(Array(total), () => number_random(numero));
let number_random = (number) => (Math.round(Math.random() * number));
let mod = (dividendo, divisor) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

export function generateFakeValidCpfV2(masked = true) {
    let total_array = 9;
    let n = 9;
    let [n1, n2, n3, n4, n5, n6, n7, n8, n9] = create_array(total_array, n);

    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;

    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    if (masked)
        return `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
    else
        return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

export function generateFakeValidCpfV3() {
    function randomDigit() {
        return Math.floor(Math.random() * 10);
    }

    let cpf = Array.from({ length: 9 }, randomDigit);

    for (let _ = 0; _ < 2; _++) {
        let val = cpf.reduce((acc, curr, i) => acc + (cpf.length + 1 - i) * curr, 0) % 11;
        cpf.push(11 - val > 1 ? 11 - val : 0);
    }

    return `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`;
}
