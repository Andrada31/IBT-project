import React, { useState } from "react";
const { ethers } = require("ethers");

const BurnTokensButton = ({ provider }) => {
  const [burnAmount, setBurnAmount] = useState("");

  const handleBurn = async () => {
    try {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // IBT contract address
      const burner = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Address that will burn tokens

      // Ensure parameters are valid
      if (!burnAmount || !provider) {
        alert("Missing required parameters!");
        return;
      }

      const IBT = new ethers.Contract(contractAddress, IBT.abi, provider.getSigner());
      const amountToBurn = ethers.utils.parseUnits(burnAmount, 18);

      // Check initial balance
      const initialBalance = await IBT.balanceOf(burner);
      console.log(`Initial balance of ${burner}: ${ethers.utils.formatUnits(initialBalance, 18)} IBT`);

      // Burn tokens
      const tx = await IBT.burn(burner, amountToBurn); // Burn from the caller's address
      await tx.wait();
      console.log(`Burned ${ethers.utils.formatUnits(amountToBurn, 18)} IBT tokens from ${burner}`);

      // Check balance after burning
      const finalBalance = await IBT.balanceOf(burner);
      console.log(`Final balance of ${burner}: ${ethers.utils.formatUnits(finalBalance, 18)} IBT`);

      alert(`Burned ${burnAmount} IBT tokens successfully!`);
    } catch (error) {
      console.error("Error burning tokens:", error);
      alert("Failed to burn tokens. See console for details.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={burnAmount}
        onChange={(e) => setBurnAmount(e.target.value)}
        placeholder="Amount to burn"
      />
      <button className="btn" onClick={handleBurn}>
        Burn IBT Tokens
      </button>
    </div>
  );
};

export default BurnTokensButton;