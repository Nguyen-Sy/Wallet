const Web3Utils = require("../deployments/utils");
const { deployContract } = new Web3Utils();
const { ethers } = require("hardhat");

const TOPIC =
    "0xe981d41cfcc707f2fa59586347099614ffa99754751f6000ade1fbd3514ebd4d";

const main = async () => {
    const factory = await deployContract("Factory");
    const tx = await factory.createMultiSigWallet(
        [
            "0x376CAE3573156ecaBc0E5aCFF8028ad21830D582",
            "0xcE4B46a5AB415aEEbf89E0c666bcfeC9f07194E7",
            "0xb68896703efdAdC6aE601e3f9FcEA928a1e478df",
        ],
        2
    );

    const { logs } = await ethers.provider.getTransactionReceipt(tx.hash);
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
