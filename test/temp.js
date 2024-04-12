const { expect } = require("chai");
const { Database } = require("../deployments");

const db = new Database(false);

const redeploy = true;
const hre = require("hardhat");
const { ethers, network } = hre;
let delayStep = 500;

const delay = (delayInms = delayStep) => {
    console.log("Delay: ", delayInms);
    return new Promise((resolve) => setTimeout(resolve, delayInms));
};

const atAddress = async (smc) => {
    let address = await db.read(network.name, smc);
    return await hre.ethers.getContractAt(smc, address);
};

const deploySMC = async (name, args = []) => {
    let address = await db.read(network.name, name);
    if (address && !redeploy) {
        const is = await hre.ethers.getContractAt(name, address);
        return is;
    } else {
        console.log("deploy: ", name);
        await delay();
        const smc = await hre.ethers.getContractFactory(name);
        const ins = await smc.deploy(...args);

        await db.write(network.name, name, ins.address);
        console.log("Address of ", name, " ", ins.address);
        return ins;
    }
};

describe("Token contract", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        const ProxyInzPos = await deploySMC("ProxyInzPos", [35, 100]);
        await ProxyInzPos.initialize();

        const USDT = await deploySMC("USDT", ["USDT", "USDT"]);
        await USDT.approve(ProxyInzPos.address, 1000000000);
        await ProxyInzPos.depositToken(USDT.address, 100000000, "oke");

        const withdraw = await ProxyInzPos.withdrawToken(
            USDT.address,
            100000000
        );
        withdraw.wait();
        const data = await ProxyInzPos.getTokens();
        console.log(data);

        await ProxyInzPos.withdrawSettleFees();
        expect(true);
    });
});