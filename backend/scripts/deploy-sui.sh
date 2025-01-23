#!/bin/bash

# Ensure Sui node is running (optional, if not running already)
echo "Starting the Sui node for the testnet..."
sui node --test &

# Give the node some time to initialize
sleep 10

# Navigate to your project folder
cd /path/to/your/sui_project

# Compile the Move contract
echo "Compiling the Move contract..."
sui move compile

# Deploy the contract to the local testnet
echo "Deploying the contract..."
sui move publish --path /path/to/your/sui_project/your_package

echo "Deployment successful!"
