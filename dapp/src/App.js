import React, { useState, useEffect } from 'react';
import './App.css';
import { connectMetaMask, checkIBTBalance } from './metamask-wallet';

import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import { useSuiClientQuery } from '@mysten/dapp-kit';

// const { networkConfig } = createNetworkConfig({
// 	localnet: { url: getFullnodeUrl('localnet') },
// 	mainnet: { url: getFullnodeUrl('mainnet') },
// });
// const queryClient = new QueryClient();

// function MyComponent() {
// 	const { data, isPending, error, refetch } = useSuiClientQuery('getOwnedObjects', {
// 		owner: '0x123',
// 	});

// 	if (isPending) {
// 		return <div>Loading...</div>;
// 	}

// 	return <pre>{JSON.stringify(data, null, 2)}</pre>;
// }



function App() {
  const [walletType, setWalletType] = useState('Ethereum');
  const [walletInfo, setWalletInfo] = useState({ address: '', balance: '' });

  useEffect(() => {
    // Load wallet info from local storage
    const storedWalletType = localStorage.getItem('walletType');
    const storedWalletInfo = JSON.parse(localStorage.getItem('walletInfo'));

    if (storedWalletType) {
      setWalletType(storedWalletType);
    }

    if (storedWalletInfo) {
      setWalletInfo(storedWalletInfo);
    }
  }, []);

  useEffect(() => {
    // Save wallet info to local storage
    localStorage.setItem('walletType', walletType);
    localStorage.setItem('walletInfo', JSON.stringify(walletInfo));
  }, [walletType, walletInfo]);

  const handleWalletSwitch = (type) => {
    setWalletType(type);
    setWalletInfo({ address: '', balance: '' }); // Reset wallet info when switching
  };

  const connectMetaMaskHandler = async () => {
    const info = await connectMetaMask();
    if (info) {
      setWalletInfo({
        address: info.address || "Not connected",
        balance: `${info.balance || "0.00"} ETH`,
      });
    } else {
      setWalletInfo({
        address: "Connection failed",
        balance: "0.00 ETH",
      });
    }
  };

  const connectSUIHandler = () => {
    console.log('Connecting to SUI Wallet...');
    setWalletInfo({ address: 'SUI_ADDRESS', balance: 'SUI_BALANCE' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <button className={`nav-button ${walletType === 'Ethereum' ? 'active' : ''}`} onClick={() => handleWalletSwitch('Ethereum')}>Ethereum Wallet</button>
          <button className={`nav-button ${walletType === 'SUI' ? 'active' : ''}`} onClick={() => handleWalletSwitch('SUI')}>SUI Wallet</button>
        </nav>
      </header>
      {/* <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="localnet">
          <WalletProvider>
            <YourApp />
          </WalletProvider>
        </SuiClientProvider>
		  </QueryClientProvider> */}

      {/* <MyComponent></MyComponent> */}
      <main className="wallet-container">
        <h1>{walletType} Wallet</h1>
        <div className="button-container">
          {walletType === 'Ethereum' ? (
            <button id="connect-button" className="btn" onClick={connectMetaMaskHandler}>Connect MetaMask</button>
          ) : (
            <button id="connect-button" className="btn" onClick={connectSUIHandler}>Connect SUI Wallet</button>
          )}
          <button id="ibt-button" className="btn" onClick={checkIBTBalance}>Check IBT Balance</button>
        </div>
        <div id="wallet-info" className="wallet-info">
          <p id="wallet-address">Address: {walletInfo.address}</p>
          <p id="wallet-balance">Balance: {walletInfo.balance}</p>
        </div>
      </main>
    </div>
  );
}

export default App;