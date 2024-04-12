const Database = require("./db");
const db = new Database(false);
const hre = require("hardhat");
const { network } = hre;

let defaultArgs = {
    delayStep: 500,
    redeploy: true,
};

class Web3Utils {
    constructor({ delayStep, redeploy } = defaultArgs) {
        (this.delayStep = delayStep), (this.redeploy = redeploy);
    }

    delay = (millisecond = this.delayStep) => {
        console.log("Delay:: ", millisecond);
        return new Promise((resolve) => setTimeout(resolve, millisecond));
    };

    getContract = async (smc, nw = network.name) => {
        let address = db.read(nw, smc);
        return await hre.ethers.getContractAt(smc, address);
    };

    deployContract = async (name, args = []) => {
        let address = await db.read(network.name, name);
        if (address && !this.redeploy) {
            const is = await hre.ethers.getContractAt(name, address);
            return is;
        } else {
            console.log("deploy: ", name);
            await this.delay();
            const smc = await hre.ethers.getContractFactory(name);
            const ins = await smc.deploy(...args);

            db.write(network.name, name, ins.address);
            console.log("Address of ", name, " ", ins.address);
            return ins;
        }
    };
}

module.exports = Web3Utils;
