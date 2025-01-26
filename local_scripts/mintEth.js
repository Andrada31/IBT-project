const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    const recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const amount = ethers.utils.parseUnits("77", 18); 

    const IBT = await ethers.getContractAt("IBT", contractAddress);

    const tx = await IBT.mint(recipient, amount);
    await tx.wait();
    console.log(`Minted 77 IBT tokens to ${recipient}`);

    const balance = await IBT.balanceOf(recipient);
    console.log(`New balance of ${recipient}: ${ethers.utils.formatUnits(balance, 18)} IBT`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
