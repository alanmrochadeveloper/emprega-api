export function normalizeCnpj(cnpj: string): string {
    return cnpj?.replace(/[^\d]+/g, '');
}

