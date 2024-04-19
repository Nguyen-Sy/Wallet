const Web3Utils = require("../deployments/utils");
const { deployContract } = new Web3Utils();
const { ethers } = require("hardhat");

const TOPIC =
    "0xe981d41cfcc707f2fa59586347099614ffa99754751f6000ade1fbd3514ebd4d";

const main = async () => {
    const [signer] = await ethers.getSigners();
    const factory = await deployContract("Factory");
};

main();
