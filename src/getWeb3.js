import Web3 from "web3";
import { ethereum } from "./connectWallet";

const getWeb3 = () => {
    try {
        if (ethereum) {
            return new Web3(ethereum);
        } else if (window.ethereum) {
            return new Web3(window.ethereum);
        } else {
            return new Web3(window.web3.currentProvider);
        }
    } catch (error) {
        console.error(error);
    }
};

export default getWeb3;
