const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = require("./secrets.json");

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "5777",
        },
        sepolia: {
            provider: () => new HDWalletProvider(MNEMONIC, "wss://sepolia.infura.io/ws/v3/" + INFURA_API_KEY),
            network_id: "11155111",
            gas: 30000000,
        },
    },
    compilers: {
        solc: {
            version: "0.5.17",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
                evmVersion: "homestead",
            },
        },
    },
    contracts_build_directory: "./src/contracts/",
};
