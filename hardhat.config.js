require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const archivedDeploymentPath = "./deployments/archive";

let privateKey = process.env.PRIVATE_KEY;

let real_accounts = [privateKey];
let local_accounts = [
    "0x5d4bdde795b4e5be1fe40b4362a6f297a613ea7ec0a20bb84ac8245b672a25ff",
];
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        ganache: {
            url: `http://127.0.0.1:8545`,
            chainId: 1337,
            accounts: local_accounts,
            // gas: 2000000000,
            gasPrice: 8000000000000,
            gasLimit: 210000000000000000n,
        },
    },

    mocha: {},
    solidity: {
        compilers: [
            {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1300,
                    },
                },
            },
        ],
    },
    abiExporter: {
        path: "./build/contracts",
        runOnCompile: true,
        clear: true,
        flat: true,
        except: [],
        spacing: 2,
        pretty: true,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        owner: {
            default: 0,
        },
    },
    external: {
        contracts: [
            {
                artifacts: [archivedDeploymentPath],
            },
        ],
    },
};
