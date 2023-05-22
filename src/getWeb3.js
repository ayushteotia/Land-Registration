import Web3 from "web3";

const getWeb3 = () => {
    try {
        if (window.ethereum) {
            return new Web3(window.ethereum);
        } else if (window.web3) {
            return new Web3(window.web3.currentProvider);
        } else {
            const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
            return new Web3(provider);
        }
    } catch (error) {
        console.error(error);
    }
};

export default getWeb3;
