// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title IBT Token Contract for Ethereum Bridge
/// @notice Implements a mintable and burnable ERC20 token controlled by the deployer.
contract IBT is ERC20, Ownable {
    /// @dev Constructor initializes the token with a name and symbol.
    /// Passes the token name and symbol to the base ERC20 contract.
    constructor() ERC20("InterBlockchain Token", "IBT") Ownable(msg.sender) {}

    /// @notice Mint new tokens.
    /// @dev Only the owner (deployer) can call this function.
    /// @param to Address to receive the minted tokens.
    /// @param amount Amount of tokens to mint.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Burn tokens.
    /// @dev Only the owner (deployer) can call this function.
    /// @param from Address from which tokens will be burned.
    /// @param amount Amount of tokens to burn.
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }
}

//Deployed IBT to 0x5FbDB2315678afecb367f032d93F642f64180aa3