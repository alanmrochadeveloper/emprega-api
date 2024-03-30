import { faker } from "@faker-js/faker/locale/pt_BR";
import axios from "axios";
import { generateFakeValidCpfV2 } from "../../utils/generators/cpfGenerator.mjs";

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
        cpf: generateFakeValidCpfV2(),
        phone_number: faker.phone.number().replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"),
        category: 'Candidato',
        personType: 'Física',
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});