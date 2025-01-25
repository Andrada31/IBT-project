import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MetaHook from './hooks/walletHook';
import { checkEthBalance } from './components/metamask-wallet';
import MySuiWallet from './components/sui-wallet';
import '@mysten/dapp-kit/dist/index.css';

import { ConnectButton } from '@mysten/dapp-kit';


function App() {
  const [ethWalletInfo, setEthWalletInfo] = useState({ address: '', balance: '' });

  useEffect(() => {
    // Load wallet info from local storage
    const storedEthWalletInfo = JSON.parse(localStorage.getItem('ethWalletInfo'));

    if (storedEthWalletInfo) {
      setEthWalletInfo(storedEthWalletInfo);
    }
  }, []);

  useEffect(() => {
    // Save wallet info to local storage
    localStorage.setItem('ethWalletInfo', JSON.stringify(ethWalletInfo));
  }, [ethWalletInfo]);

  const handleCheckBalance = async (walletType) => {
    if (walletType === 'Ethereum') {
      checkEthBalance();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>IBT token exchange</h1>
      </header>
      <main className="wallets-container">
        <div className="wallet-container">
          <h2>Ethereum Wallet</h2>
          <MetaHook walletType="Ethereum" setWalletInfo={setEthWalletInfo} />
          <div id="wallet-info" className="wallet-info">
            <p id="wallet-address">Address: {ethWalletInfo.address}</p>
            <p id="wallet-balance">Balance: {ethWalletInfo.balance}</p>
          </div>
        </div>
        <div className="wallet-container">
          <h2>SUI Wallet</h2>
          <MySuiWallet/>
        </div>
      </main>   
    </div>
  );
}

export default App;