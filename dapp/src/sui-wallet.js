import { createNetworkConfig, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { QueryClient } from '@tanstack/react-query';
import { formatUnits } from 'ethers';

// Initialize Sui client and query client
const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl('localnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});

const queryClient = new QueryClient();

let suiClient;

suiClient = new SuiClient({
  network: networkConfig.devnet.url, // Change to your desired network
});


// Function to connect to Sui Wallet
export async function connectSuiWallet() {
    

  if (typeof window === 'undefined') {
    console.error("Window object is not available. Are you running this in a browser?");
    return null;
  }

  if (!window.sui) {
    alert("Sui Wallet is not installed! Please install it to use this feature.");
    return null;
  }

  try {
    // Request connection to Sui Wallet
    await window.sui.requestPermissions();

    // Get the connected wallet address
    const accounts = await window.sui.getAccounts();
    const address = accounts[0] || "Not connected";
    console.log("Connected Sui Wallet Address:", address);

    // Ensure `suiClient` is initialized
    if (!suiClient) {
      suiClient = new SuiClient({ network: networkConfig.devnet.url });
    }

    // Get the balance of the connected wallet
    const balance = await suiClient.getBalance({ owner: address });
    const formattedBalance = formatUnits(balance.totalBalance, 9); // SUI has 9 decimal places
    console.log("Connected Sui Wallet Balance:", formattedBalance, "SUI");

    return { address, balance: formattedBalance };
  } catch (error) {
    console.error("Sui Wallet Connection Error:", error);
    return null;
  }
}


// Function to check IBT balance (replace with your contract logic)
export async function checkSuiBalance() {
  if (!walletProvider) {
    alert("Please connect your Sui Wallet first!");
    return;
  }

  try {
    const address = await walletProvider.getAddress();
    // Replace with your IBT contract logic
    const balance = await suiClient.getBalance({ owner: address });
    console.log("IBT Token Balance:", formatUnits(balance.totalBalance, 9)); // Adjust decimals as needed
    alert(`IBT Token Balance: ${formatUnits(balance.totalBalance, 9)}`);
  } catch (error) {
    console.error("Error interacting with IBT contract:", error);
  }
}