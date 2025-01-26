

export const mintIBTTokens = async (currentWallet, suiClient, setError, setIsProcessing) => {
  if (!currentWallet?.accounts[0]) {
    setError('Sui wallet not connected');
    return;
  }

  try {
    setIsProcessing(true);
    const signTransactionFeature =
      currentWallet?.features['sui:signAndExecuteTransaction'];

    if (!signTransactionFeature) {
      throw new Error('Wallet missing required features');
    }

    const mintAmount = 777; 

    const txData = {
      kind: 'moveCall',
      packageObjectId: '0x15bef618abdf230d32bb197eeef24bb6a0aa36d3e8f04cc77231eba4045eb2ac', // Your deployed contract's object ID
      module: 'IBT', // The Move module you have for minting
      function: 'mint', // Function in Move contract to mint IBT tokens
      typeArguments: [],
      arguments: [
        { type: 'address', value: currentWallet.accounts[0].address },
        { type: 'u64', value: mintAmount }
      ],
    };

    const transaction = await signTransactionFeature.signAndExecuteTransaction(txData);
    setError(`Transaction sent: ${transaction.transactionDigest}`);

    await suiClient.waitForTransaction(transaction.transactionDigest);
    setError('Successfully minted IBT tokens!');
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Failed to mint tokens');
  } finally {
    setIsProcessing(false);
  }
};
