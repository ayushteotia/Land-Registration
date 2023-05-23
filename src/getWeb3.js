import Web3 from "web3";

const getWeb3 = () => {
    try {
        if (window.ethereum) {
            return new Web3(window.ethereum);
        } else {
            return new Web3(window.web3.currentProvider);
        }
    } catch (error) {
        console.error(error);
    }
};

export default getWeb3;
