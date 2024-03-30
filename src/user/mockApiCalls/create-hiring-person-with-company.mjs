import { faker } from "@faker-js/faker/locale/pt_BR";
import axios from "axios";
import { generateFakeValidCnpjV2 } from "../../utils/generators/cnpjGenerator.mjs";
import { generateFakeValidCpfV2 } from "../../utils/generators/cpfGenerator.mjs";
import { generateFakeValidInscricaoEstadual } from "../../utils/generators/stateInscrGenerator.mjs";

const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/auth/register',
    headers: { 'user-agent': 'vscode-restclient', 'content-type': 'application/json' },
    data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: 'M@riana2023',
        password_confirm: 'M@riana2023',
        address: faker.location.streetAddress(),
        cpf: generateFakeValidCpfV2(),
        phone_number: faker.phone.number().replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
        category: 'Anunciante',
        personType: 'Física',
        tradingName: faker.company.name(),
        companyName: faker.company.name(),
        stateInscr: generateFakeValidInscricaoEstadual(),
        cnpj: generateFakeValidCnpjV2(),
        logo: faker.image.avatarGitHub(),
        employeesNumber: faker.number.int({ min: 10, max: 10000 })
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});