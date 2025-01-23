const ethers = require("ethers");

// Connect to the Anvil local blockchain
const provider = new ethers.JsonRpcProvider("http://localhost:8545");

// Use the first account as the signer
async function main() {
    // Fetch the list of accounts from the Anvil local blockchain
    const accounts = await provider.listAccounts();
    const signer = await provider.getSigner(accounts[0]);

    console.log("Deployer Address:", await signer.getAddress());

    // Replace with your deployed IBT token contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // ABI for the IBT contract
    const ibtAbi = [
        "function mint(address to, uint256 amount)",
        "function transfer(address to, uint256 amount)",
        "function balanceOf(address owner) view returns (uint256)"
    ];

    // Attach the IBT contract
    const ibt = new ethers.Contract(contractAddress, ibtAbi, signer);

    // Transfer 77 tokens to a specific MetaMask wallet
    const recipientAddress = "0x5fFCe2Aa47EB34F066D9259C15b2c0DF11a00c33"; // Replace with your MetaMask wallet address
    const amount = ethers.parseUnits("77", 18); // Convert 77 tokens to 18 decimal units

    console.log(`Transferring 77 tokens to ${recipientAddress}...`);
    const tx = await ibt.transfer(recipientAddress, amount);
    await tx.wait();

    console.log("Transfer complete!");
}

main().catch((error) => {
    console.error("Error:", error);
});
