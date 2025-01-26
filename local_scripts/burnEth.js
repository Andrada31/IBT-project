const { ethers } = require("hardhat");

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
    const burner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 
    const burnAmount = ethers.utils.parseUnits("77", 18); 
    const IBT = await ethers.getContractAt("IBT", contractAddress);

    const initialBalance = await IBT.balanceOf(burner);
    console.log(`Initial balance of ${burner}: ${ethers.utils.formatUnits(initialBalance, 18)} IBT`);

    const tx = await IBT.burn(burner,burnAmount); 
    await tx.wait();
    console.log(`Burned ${ethers.utils.formatUnits(burnAmount, 18)} IBT tokens from ${burner}`);

    const finalBalance = await IBT.balanceOf(burner);
    console.log(`Final balance of ${burner}: ${ethers.utils.formatUnits(finalBalance, 18)} IBT`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
