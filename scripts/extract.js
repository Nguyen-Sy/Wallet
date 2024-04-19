const Web3Utils = require("../deployments/utils");
const { ethers } = require("hardhat");

const TOPIC =
    "0xe981d41cfcc707f2fa59586347099614ffa99754751f6000ade1fbd3514ebd4d";

const main = async () => {
    // Extract wallet address from event of transaction through txHash
    const { logs } = await ethers.provider.getTransactionReceipt(
        "0xbd12302f255c9fca2fc64d46b5c58a7abb09a281a3e9b38c39fd934aa840ab1d"
    );
    let event;
    logs.forEach(({ data, topics }) => {
        if (topics.includes(TOPIC)) {
            event = ethers.utils.defaultAbiCoder.decode(
                [
                    {
                        indexed: false,
                        internalType: "address",
                        name: "wallet",
                        type: "address",
                    },
                    {
                        indexed: false,
                        internalType: "address[]",
                        name: "owners",
                        type: "address[]",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "confirmRequired",
                        type: "uint256",
                    },
                ],
                data
            );
        }
    });
    const { wallet, owners, confirmRequired } = event;
    console.log({
        wallet,
        owners,
        confirmRequired: confirmRequired.toString(),
    });
};

main();
