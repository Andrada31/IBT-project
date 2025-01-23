let provider;
let signer;
const ethers = require("ethers");

export async function connectMetaMask() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      provider = new ethers.BrowserProvider(window.ethereum); 
      signer = await provider.getSigner();

      const accounts = await provider.listAccounts();
      const address = accounts[0].address || "Not connected";
      console.log("Connected Wallet Address:", address);

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

export async function checkIBTBalance() {
  if (!signer) {
    alert("Please connect your wallet first!");
    return;
  }

  const ibtContract = new ethers.Contract(ibtAddress, ibtAbi, signer);


  try {
    const address = await signer.getAddress();
    const balance = await ibtContract.balanceOf(address);
    console.log("IBT Token Balance:", ethers.formatUnits(balance, 18)); 
    alert(`IBT Token Balance: ${ethers.formatUnits(balance, 18)}`);
  } catch (error) {
    console.error("Error interacting with IBT contract:", error);
  }
}

const ibtAbi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function mint(address to, uint256 amount)",
  "function transfer(address to, uint256 amount)",
];
const ibtAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
