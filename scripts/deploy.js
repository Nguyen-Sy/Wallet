const Web3Utils = require("../deployments/utils");
const { deployContract } = new Web3Utils();
const { ethers } = require("hardhat");

const TOPIC =
    "0xe981d41cfcc707f2fa59586347099614ffa99754751f6000ade1fbd3514ebd4d";

const main = async () => {
    const [signer] = await ethers.getSigners();
    const factory = await deployContract("Factory");
    const tx = await factory.createMultiSigWallet(
        [
            signer.address,
            "0xcE4B46a5AB415aEEbf89E0c666bcfeC9f07194E7",
            "0xb68896703efdAdC6aE601e3f9FcEA928a1e478df",
        ],
        2
    );
    console.log(tx.hash);
};

main();
