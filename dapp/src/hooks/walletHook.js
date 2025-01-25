import React from 'react';
import { connectMetaMask } from '../components/metamask-wallet';
import { useSuiWallet } from '../components/sui-wallet';

const WalletHook = ({ walletType, setWalletInfo }) => {
  const { connectSuiWallet } = useSuiWallet();

  const connectWallet = async () => {
    if (walletType === 'Ethereum') {
      const info = await connectMetaMask();
      setWalletInfo({
        address: info.address || 'Not connected',
        balance: `${info.balance || '0.00'} ETH`,
      });
    } else {
      try {
        const info = await connectSuiWallet();
        setWalletInfo({
          address: info.address || 'Not connected',
          balance: `${info.balance || '0.00'} SUI`,
        });
      } catch (error) {
        console.error('Failed to connect to SUI Wallet:', error);
      }
    }
  };

  return (
    <div className="button-container">
      <button className="btn" onClick={connectWallet}>
        Connect {walletType} Wallet
      </button>
    </div>
  );
};

export default WalletHook;