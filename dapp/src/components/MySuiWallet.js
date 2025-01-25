import { ConnectButton, useCurrentWallet, useSuiClient } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

const MIST_PER_SUI = 1_000_000_000; // 1 SUI = 1 billion MIST

function MySuiWallet() {
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const suiClient = useSuiClient();
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  // Function to fetch SUI wallet balance
  const fetchBalance = async () => {
    if (!currentWallet || connectionStatus !== 'connected') return;

    try {
      const account = currentWallet.accounts[0]; // Use the first account from the wallet
      if (!account) throw new Error('No account found in wallet.');

      const result = await suiClient.getBalance({ owner: account.address + '' });
      const suiBalance = Number(result.totalBalance) / Number(MIST_PER_SUI); // Convert MIST to SUI
      setBalance(suiBalance);
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(err.message || 'Failed to fetch balance.');
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [currentWallet, connectionStatus]);

  return (
    <div>
      <ConnectButton />
      {connectionStatus === 'connected' ? (
        <div className='wallet-info'>
          <div>
            Address:
              {currentWallet.accounts.map((account) => (
                <p key={account.address}>- {account.address}</p>
              ))}

          </div>
          <div>
            <p>Balance:{balance} SUI</p>
          </div>
        </div>
      ) : (
        <div>Connection status: {connectionStatus}</div>
      )}
    </div>
  );
}

export default MySuiWallet;
