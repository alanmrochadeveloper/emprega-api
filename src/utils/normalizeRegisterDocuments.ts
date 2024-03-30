import { normalizeCnpj } from "./normalizeCnpj";
import { normalizeCpf } from "./normalizeCpf";
import { normalizeStateInscr } from "./normalizeStateInscr";

export const normalizeRegisterDocuments = ({ personCNPJ, stateInscrPerson, stateInscr, cpf, cnpj }) => {
    return {
        personCNPJ: normalizeCnpj(personCNPJ),
        stateInscrPerson: normalizeStateInscr(stateInscrPerson),
        stateInscr: normalizeStateInscr(stateInscr),
        cpf: normalizeCpf(cpf),
        cnpj: normalizeCnpj(cnpj)
    };
};