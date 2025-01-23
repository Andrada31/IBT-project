async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const IBT = await ethers.getContractFactory("IBT");
  const ibt = await IBT.deploy();

  console.log("IBT deployed to:", ibt.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// IBT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
