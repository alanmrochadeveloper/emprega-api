import { faker } from "@faker-js/faker/locale/pt_BR";
import axios from "axios";

const options = {
    method: 'POST',
    url: 'http://localhost:8000/api/job-opportunity',
    // url: 'http://localhost:13001/api/job-opportunity',
    headers: { 'user-agent': 'vscode-restclient', 'content-type': 'application/json' },
    data: {
        // companyId: '00b1b1d6-45bf-4f33-8e64-49e4e8cd5593',
        companyId: '6442747a-9b94-4031-9a3f-3ec397168347',
        title: faker.word.words({ count: 3 }),
        description: faker.commerce.productDescription(),
        requirements: faker.commerce.productDescription(),
        salary: faker.commerce.price({ min: faker.helpers.arrayElement([40000, 50000]), max: faker.helpers.arrayElement([50000, 150000]) }),
        location: faker.location.streetAddress(),
        benefits: faker.commerce.productDescription(),
        salaryRange: { min: faker.helpers.rangeToNumber([40000, 50000]), max: faker.helpers.rangeToNumber([50000, 150000]) },
        salaryToBeAgreed: faker.datatype.boolean(),
        model: faker.helpers.arrayElement(["on_site", "remote", "hybrid"]),
        isActive: faker.datatype.boolean(),
        jobCategoryId: 'idaqui'
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});