import { ConnectButton, useCurrentWallet } from '@mysten/dapp-kit';
 
function MySuiWallet() {
	const { currentWallet, connectionStatus } = useCurrentWallet();
 
	return (
		<div>
			<ConnectButton />
			{connectionStatus === 'connected' ? (
				<div>
					<h2>Current wallet:</h2>
					<div>Name: {currentWallet.name}</div>
					<div>
						Accounts:
						<ul>
							{currentWallet.accounts.map((account) => (
								<li key={account.address}>- {account.address}</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div>Connection status: {connectionStatus}</div>
			)}
		</div>
	);
}

export default MySuiWallet;