import { ethers } from "ethers";

let provider;
let signer;

// Step 1: Connect MetaMask
async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      const address = await signer.getAddress();
      console.log("Connected Wallet Address:", address);

      // Display wallet address
      document.getElementById("wallet-address").innerText = `Address: ${address}`;

      // Display balance
      const balance = await provider.getBalance(address);
      console.log("Wallet Balance (ETH):", ethers.utils.formatEther(balance));
      document.getElementById("wallet-balance").innerText = `Balance: ${ethers.utils.formatEther(balance)} ETH`;

      return { address, balance: ethers.utils.formatEther(balance) };
    } catch (error) {
      console.error("MetaMask Connection Error:", error);
    }
  } else {
    alert("MetaMask is not installed! Please install it to use this feature.");
  }
}

// Step 2: Interact with IBT Token Contract
async function interactWithIBT(contractAddress, abi) {
  if (!signer) {
    alert("Please connect your wallet first!");
    return;
  }

  // Set up IBT Contract
  const ibtContract = new ethers.Contract(contractAddress, abi, signer);

  // Example: Check IBT Balance
  try {
    const address = await signer.getAddress();
    const balance = await ibtContract.balanceOf(address);
    console.log("IBT Token Balance:", ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
    alert(`IBT Token Balance: ${ethers.utils.formatUnits(balance, 18)}`);
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
const ibtAddress = "YOUR_IBT_CONTRACT_ADDRESS_HERE"; // Replace with your IBT token contract address

// Expose functions to the global scope
window.connectMetaMask = connectMetaMask;
window.interactWithIBT = interactWithIBT;
