import axios from "axios";

const mockId = "75ddc64e-3001-4f96-8d7a-886c39062143"
const mockId2 = "9f9509c8-f835-4a78-b0f4-e64076e24e69"
const mockId3 = "2cace899-531f-4559-b7e2-a304731d304a"

const mockUserId = "bfdaec88-ce28-49e3-adf9-955b23646062";
const mockUserId2 = "c6c7ec7e-69de-49ef-af14-8aa2ee635d00";
const mockUserId3 = "e7c87dfc-ed2e-4220-9977-34db5601f107";
const mockUserId4 = "d441f474-c2e7-4b74-b032-6e88de3ee7ea";
const mockUserId5 = "68b7ff90-afac-4668-9964-872dff3d4a67";

const options = {
    method: 'POST',
    url: `http://localhost:8000/api/job-opportunity/${mockId2}/apply`,
    headers: { 'user-agent': 'vscode-restclient', 'content-type': 'application/json' },
    data: {
        userId: mockUserId5,
    }
};

axios.request(options).then(function (response) {
    console.log(response.data);
}).catch(function (error) {
    console.error(error);
});
