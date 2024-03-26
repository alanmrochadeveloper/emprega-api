export function validateStateInscr(stateInscr: string): boolean {
    if (!stateInscr) return false;
    const normalizedStateInscr = stateInscr.replace(/[^\d]+/g, '');
    return normalizedStateInscr.length >= 9 && normalizedStateInscr.length <= 14;
}
