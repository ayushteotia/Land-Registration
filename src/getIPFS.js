import axios from "axios";

const API_URL = "https://api.pinata.cloud";

export const getHash = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(API_URL + "/pinning/pinFileToIPFS", data, {
                headers: {
                    authorization: "Bearer " + process.env.REACT_APP_PINATA_JWT,
                },
            });
            resolve(response.data.IpfsHash);
        } catch (error) {
            reject(error);
        }
    });
