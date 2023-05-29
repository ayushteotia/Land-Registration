module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "5777",
        },
        private: {
            host: "43.204.114.104",
            port: 8545,
            network_id: "1685365916670",
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
