@echo off
REM Ensure Sui node is running (optional, if not running already)
echo Starting the Sui node for the testnet...
start sui node --test

REM Give the node some time to initialize
timeout /t 10

REM Change to the directory containing your Move contract code
cd "C:\Users\parac\Documents\Documents\UVT\Anul III\IBT\Final project\contracts\sui"

REM Compile the Move contract (to check for errors)
echo Compiling the Move contract...
sui move build

REM Deploy the contract to the local testnet (change 'publish' to 'deploy' or correct the command as needed)
echo Deploying the contract...
sui move deploy --path "C:\Users\parac\Documents\Documents\UVT\Anul III\IBT\Final project\contracts\sui"

echo Deployment successful!
pause
