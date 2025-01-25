import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MyMetamask from './components/MyMetamask';
import MySuiWallet from './components/MySuiWallet';
import SuiTransaction from './hooks/suiTransaction';
import '@mysten/dapp-kit/dist/index.css';

function App() {
  const [walletType, setWalletType] = useState('Ethereum');
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

  const handleWalletSwitch = (type) => {
    setWalletType(type);
    setEthWalletInfo({ address: '', balance: '' }); // Reset wallet info when switching
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>IBT token exchange</h1>
      </header>
      <main className="wallets-container">
        <div className="wallet-container">
          <h2>MetaMask</h2>
          <MyMetamask walletType={walletType} setWalletInfo={setEthWalletInfo} />
        </div>
        <div className="wallet-container">
          <h2>SUI Wallet</h2>
          <MySuiWallet />
          {/* <SuiTransaction /> */}
        </div>
      </main>   
    </div>
  );
}

export default App;