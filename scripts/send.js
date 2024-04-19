const Web3Utils = require("../deployments/utils");
const { deployContract } = new Web3Utils();
const { ethers } = require("hardhat");

const TOPIC =
    "0xe981d41cfcc707f2fa59586347099614ffa99754751f6000ade1fbd3514ebd4d";

const main = async () => {
    const [signer] = await ethers.getSigners();

    const send = await signer.sendTransaction({
        to: "<Address of created wallet>",
        value: ethers.utils.parseEther("0.001"),
    });
    console.log(send.hash);
};

main();
