import axios from "axios";

import { faker } from "@faker-js/faker/locale/pt_BR";

import { generateFakeValidCnpjV2 } from "../../utils/generators/cnpjGenerator.mjs";
import { generateFakeValidInscricaoEstadual } from "../../utils/generators/stateInscrGenerator.mjs";

// testing a mock creation of a user which is a Hiring and Legal person

const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/auth/register',
    headers: { 'user-agent': 'vscode-restclient', 'content-type': 'application/json' },
    data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: '@Teste123',
        password_confirm: '@Teste123',
        address: faker.location.streetAddress(),
        personCNPJ: generateFakeValidCnpjV2(),
        phone_number: faker.phone.number().replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
        category: 'Anunciante',
        personType: 'Jurídica',
        // category: faker.helpers.arrayElement(['Anunciante', 'Candidato', 'Admin']),
        // personType: faker.helpers.arrayElement(['Jurídica', 'Física']),
        tradingNamePerson: faker.company.name(),
        companyNamePerson: faker.company.name(),
        stateInscrPerson: generateFakeValidInscricaoEstadual(),
        employeesNumber: faker.number.int({ min: 10, max: 10000 })
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});