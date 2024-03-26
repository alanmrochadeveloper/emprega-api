export function normalizeStateInscr(stateInscr: string): string {
    return stateInscr?.replace(/[^\d]+/g, '');
}

