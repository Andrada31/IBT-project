import React from 'react';
import { connectMetaMask } from '../components/metamask-wallet';

const MetaHook = ({ walletType, setWalletInfo }) => {
  const connectWallet = async () => {
    const info = await connectMetaMask();
    setWalletInfo({
      address: info.address || 'Not connected',
      balance: `${info.balance || '0.00'} ETH`,
    });
  };

  return (
    <div className="button-container">
      <button className="btn" onClick={connectWallet}>
        Connect {walletType} Wallet
      </button>
    </div>
  );
};

export default MetaHook;