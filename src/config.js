import getWeb3 from "./getWeb3";
import LandContract from "./contracts/Land.json";

const web3 = getWeb3();
const CONTRACT_ADDRESS = Object.values(LandContract.networks)[0].address;
const CONTRACT_ABI = LandContract.abi;

export const app = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

console.log(CONTRACT_ADDRESS, CONTRACT_ABI, app);
