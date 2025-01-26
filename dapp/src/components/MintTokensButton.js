import React from "react";
import IBT from "../IBT.json";
const { ethers } = require("ethers");
const IBT_ABI = IBT.abi;

const MintTokensButton = ({
  contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  recipient = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  amount,
  provider,
  setIbtBalance,
}) => {
  const handleMint = async () => {
    try {
      // Ensure parameters are valid
      if (!contractAddress || !recipient || !amount || !provider) {
        alert("Missing required parameters!");
        return;
      }
      const signer = provider.getSigner();
      if (!signer) {
        alert("No signer found. Please connect your wallet.");
        return;
      }

      const IBT = new ethers.Contract(contractAddress, IBT_ABI, signer);
      const tx = await IBT.mint(recipient, amount);
      
      await tx.wait();

      console.log(`Minted ${amount} IBT tokens to ${recipient}`);

      const balance = await IBT.balanceOf(recipient);
      console.log("Balance retrieved from contract:", balance); // Debugging log
      const formattedBalance = ethers.utils.formatUnits(balance, 18);

      alert(`Minted ${amount} IBT tokens successfully!`);
      setIbtBalance(`${formattedBalance} IBT`);
    } catch (error) {
      console.error("Error minting tokens:", error);
      alert("Failed to mint tokens. See console for details.");
    }
  };

  return (
    <button className="btn" onClick={handleMint}>
      Mint {amount} IBT Tokens
    </button>
  );
};

export default MintTokensButton;