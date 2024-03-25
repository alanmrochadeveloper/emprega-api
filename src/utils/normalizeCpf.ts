export function normalizeCpf(cpf: string): string {
    return cpf.replace(/[^\d]+/g, '');
}
