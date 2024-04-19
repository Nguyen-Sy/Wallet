const Web3Utils = require("../deployments/utils");
const { deployContract } = new Web3Utils();
const { ethers } = require("hardhat");

const tryGetTopic = (logs) => {
    for (let i = 0; i < logs.length; i++) {
        const { data, topics } = logs[i];
        try {
            const parsedData = ethers.utils.defaultAbiCoder.decode(
                [
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        indexed: false,
                        internalType: "uint256",
                        name: "balance",
                        type: "uint256",
                    },
                ],
                data
            );
            const [address] = ethers.utils.defaultAbiCoder.decode(
                ["address"],
                topics[1]
            );
            console.log(
                { ...parsedData, address },
                "Deposit topics:: ",
                topics[0]
            );
        } catch {
            continue;
        }
    }
};

const main = async () => {
    const [signer] = await ethers.getSigners();

    const send = await signer.sendTransaction({
        to: "0x4FF83d12E8FD655579834aEe3B4d2BCe479b9Bcd",
        value: ethers.utils.parseEther("0.001"),
    });

    const { logs } = await ethers.provider.getTransactionReceipt(send.hash);
    tryGetTopic(logs);
};

main();
