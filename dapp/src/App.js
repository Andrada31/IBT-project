import React, { useState, useEffect } from 'react';
import './styles/App.css';
import MyMetamask from './components/MyMetamask';
import MySuiWallet from './components/MySuiWallet';
import TransactionContainer from './components/TransactionContainer';
import '@mysten/dapp-kit/dist/index.css';

function App() {
  const [walletType, setWalletType] = useState('Ethereum');
  const [ethWalletInfo, setEthWalletInfo] = useState({ address: '', balance: '' });

  useEffect(() => {
    const storedEthWalletInfo = JSON.parse(localStorage.getItem('ethWalletInfo'));

    if (storedEthWalletInfo) {
      setEthWalletInfo(storedEthWalletInfo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ethWalletInfo', JSON.stringify(ethWalletInfo));
  }, [ethWalletInfo]);

  const handleWalletSwitch = (type) => {
    setWalletType(type);
    setEthWalletInfo({ address: '', balance: '' }); 
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
        </div>
      </main>   
      <TransactionContainer/>
    </div>
  );
}

export default App;