async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  // Replace with your contract's deployed address as a plain string
  const contractAddress = "0xYourDeployedContractAddressHere";

  // Get the contract ABI and connect to it
  const IBT = await ethers.getContractFactory("IBT");
  const ibt = await IBT.attach(contractAddress);

  // Check the balance of the deployer's address
  const balance = await ibt.balanceOf(deployer.address);
  console.log("Deployer's balance:", ethers.utils.formatUnits(balance, 18));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
