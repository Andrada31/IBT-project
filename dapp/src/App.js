import React, { useState, useEffect } from 'react';
import './styles/App.css';
import WalletHook from './hooks/walletHook';
import { checkEthBalance } from './components/metamask-wallet';
import { useSuiWallet } from './components/sui-wallet';
import '@mysten/dapp-kit/dist/index.css';

function App() {
  const [ethWalletInfo, setEthWalletInfo] = useState({ address: '', balance: '' });
  const [suiWalletInfo, setSuiWalletInfo] = useState({ address: '', balance: '' });

  const { checkSuiBalance } = useSuiWallet();

  useEffect(() => {
    // Load wallet info from local storage
    const storedEthWalletInfo = JSON.parse(localStorage.getItem('ethWalletInfo'));
    const storedSuiWalletInfo = JSON.parse(localStorage.getItem('suiWalletInfo'));

    if (storedEthWalletInfo) {
      setEthWalletInfo(storedEthWalletInfo);
    }

    if (storedSuiWalletInfo) {
      setSuiWalletInfo(storedSuiWalletInfo);
    }
  }, []);

  useEffect(() => {
    // Save wallet info to local storage
    localStorage.setItem('ethWalletInfo', JSON.stringify(ethWalletInfo));
    localStorage.setItem('suiWalletInfo', JSON.stringify(suiWalletInfo));
  }, [ethWalletInfo, suiWalletInfo]);

  const handleCheckBalance = async (walletType) => {
    if (walletType === 'Ethereum') {
      checkEthBalance();
    } else if (walletType === 'SUI') {
      await checkSuiBalance();
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
          <WalletHook walletType="Ethereum" setWalletInfo={setEthWalletInfo} />
          <div id="wallet-info" className="wallet-info">
            <p id="wallet-address">Address: {ethWalletInfo.address}</p>
            <p id="wallet-balance">Balance: {ethWalletInfo.balance}</p>
          </div>
        </div>
        <div className="wallet-container">
          <h2>SUI Wallet</h2>
          <WalletHook walletType="SUI" setWalletInfo={setSuiWalletInfo} />
          <div id="wallet-info" className="wallet-info">
            <p id="wallet-address">Address: {suiWalletInfo.address}</p>
            <p id="wallet-balance">Balance: {suiWalletInfo.balance}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;