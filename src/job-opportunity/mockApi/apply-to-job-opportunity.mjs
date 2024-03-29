import axios from "axios";

const mockId = "75ddc64e-3001-4f96-8d7a-886c39062143"
const mockId2 = "9f9509c8-f835-4a78-b0f4-e64076e24e69"
const mockId3 = "2cace899-531f-4559-b7e2-a304731d304a"

const mockUserId = "1ddcb868-dbe2-414a-9787-142c95cc35e3";
const mockUserId2 = "652380b6-1b2f-499c-937f-ee7afde7acfc";
const mockUserId3 = "61c757ae-5eb4-479e-9c13-ffd9d4737b81";
const mockUserId4 = "e47539f9-78f7-46ed-bc6f-9fd1421beaa8";
const mockUserId5 = "6458d839-54a9-4288-9ee4-724bdd60710a";

const options = {
    method: 'POST',
    url: `http://localhost:8000/api/job-opportunity/${mockId3}/apply`,
    headers: { 'user-agent': 'vscode-restclient', 'content-type': 'application/json' },
    data: {
        userId: mockUserId2,
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});
