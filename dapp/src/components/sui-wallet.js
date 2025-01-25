import { useCurrentWallet, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client';
import { formatUnits } from 'ethers';

// Initialize Sui client
const suiClient = new SuiClient({ url: getFullnodeUrl('devnet') });

export function useSuiWallet() {
  const wallet = useCurrentWallet();

  const connectSuiWallet = async () => {
    if (!wallet.isConnected) {
      try {
        // Request connection to Sui Wallet
        await wallet.connect();

        const address = wallet.address || 'Not connected';
        console.log('Connected Sui Wallet Address:', address);

        // Get the balance of the connected wallet
        const balanceData = await suiClient.getBalance({ owner: address });
        const balance = formatUnits(balanceData.totalBalance, 9); // SUI has 9 decimal places
        console.log('Connected Sui Wallet Balance:', balance, 'SUI');

        return { address, balance };
      } catch (error) {
        console.error('Sui Wallet Connection Error:', error);
        return null;
      }
    } else {
      console.log('Sui Wallet is already connected.');
      const address = wallet.address;
      const balanceData = await suiClient.getBalance({ owner: address });
      const balance = formatUnits(balanceData.totalBalance, 9);
      return { address, balance };
    }
  };

  const checkSuiBalance = async () => {
    if (!wallet.isConnected) {
      alert('Please connect your Sui Wallet first!');
      return;
    }

    try {
      const address = wallet.address;
      const balanceData = await suiClient.getBalance({ owner: address });
      const balance = formatUnits(balanceData.totalBalance, 9); // Adjust decimals as needed
      alert(`IBT Token Balance: ${balance}`);
    } catch (error) {
      console.error('Error interacting with IBT contract:', error);
    }
  };

  return { connectSuiWallet, checkSuiBalance };
}
