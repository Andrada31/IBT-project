// import { ethers } from "ethers";

let provider;
let signer;
const ethers = require("ethers");

// Step 1: Connect MetaMask
export async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider in v6
      signer = await provider.getSigner();

      // Get connected account address (ensure it's a string)
      const accounts = await provider.listAccounts();
      const address = accounts[0].address || "Not connected";
      console.log("Connected Wallet Address:", address);

      // Fetch wallet balance (formatted to string)
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);
      console.log("Connected Wallet Address:", address);
      console.log("Connected Wallet Balance:", formattedBalance, "ETH");
      return { address, balance: formattedBalance };
    } catch (error) {
      console.error("MetaMask Connection Error:", error);
      return null;
    }
  } else {
    alert("MetaMask is not installed! Please install it to use this feature.");
    return null;
  }
}

// Step 2: Interact with IBT Token Contract
export async function checkIBTBalance() {
  if (!signer) {
    alert("Please connect your wallet first!");
    return;
  }

  // Set up IBT Contract
  const ibtContract = new ethers.Contract(ibtAddress, ibtAbi, signer);

  // Example: Check IBT Balance
  try {
    const address = await signer.getAddress();
    const balance = await ibtContract.balanceOf(address);
    console.log("IBT Token Balance:", ethers.formatUnits(balance, 18)); // Assuming 18 decimals
    alert(`IBT Token Balance: ${ethers.formatUnits(balance, 18)}`);
  } catch (error) {
    console.error("Error interacting with IBT contract:", error);
  }
}

// Step 3: Example Contract ABI and Address
const ibtAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function mint(address to, uint256 amount)",
  "function transfer(address to, uint256 amount)",
];
const ibtAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your IBT token contract address
