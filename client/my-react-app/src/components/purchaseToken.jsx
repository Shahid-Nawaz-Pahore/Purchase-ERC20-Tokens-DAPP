import React, { useState, useEffect } from 'react';
import { ShahidTokenAddress, TokenPurchaseAddress, ABIShahidToken, ABITokenPurchase } from "../context/Address";
import { Contract, providers, ethers } from 'ethers';
import styles from './purchaseToken.module.css';

const provider = new providers.JsonRpcProvider('https://sepolia.infura.io/v3/ee48903ff5e14bbea34665521c5eba54');
const wallet = new ethers.Wallet('c2d7644c875de5a2220d9e80c9e3b71983c778ab44f5cb5dbf38acc0d2a58849', provider);

const shahidTokenContract = new Contract(ShahidTokenAddress, ABIShahidToken, wallet);
const tokenPurchaseContract = new Contract(TokenPurchaseAddress, ABITokenPurchase, wallet);

function TokenPurchaseComponent() {
    const [numberOfTokensToTransfer, setNumberOfTokensToTransfer] = useState('');
    const [numberOfTokensToPurchase, setNumberOfTokensToPurchase] = useState('');
    const [output, setOutput] = useState('');
    const [tokenBalance, setTokenBalance] = useState(0); // State to store the token balance
    const [contractBalance, setContractBalance] = useState(0); // State to store the contract balance

    useEffect(() => {
        // Fetch and set the token balance and contract balance when the component mounts
        fetchTokenBalance();
        fetchContractBalance();
    }, []);

    const fetchTokenBalance = async () => {
        const balance = await shahidTokenContract.balanceOf(wallet.address);
        setTokenBalance(balance.toString());
    };

    const fetchContractBalance = async () => {
        const balance = await provider.getBalance(tokenPurchaseContract.address);
        const balanceInEther = ethers.utils.formatEther(balance);
        setContractBalance(balanceInEther);
    };

    const handleTransfer = async () => {
        try {
            console.log(numberOfTokensToTransfer);
            console.log(tokenBalance); // Log the token balance

            // You can add logic here to check if the user has enough tokens to transfer

            const approvalAmount = numberOfTokensToTransfer; // Set this to the number of tokens you want to transfer
            const approvalTx = await shahidTokenContract.transfer(TokenPurchaseAddress, approvalAmount);
            await approvalTx.wait();

            // Update the token balance after a successful transfer
            fetchTokenBalance();

            setOutput(`Transferred ${approvalAmount} tokens.`);
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const handlePurchase = async () => {
        try {
            console.log(numberOfTokensToPurchase);
            console.log(tokenBalance); // Log the token balance

            // You can add logic here to check if the user has enough tokens to make a purchase

            const cost = numberOfTokensToPurchase * await tokenPurchaseContract.tokenPrice();
            console.log(cost);

            const tx = await tokenPurchaseContract.purchaseTokens(numberOfTokensToPurchase, {
                value: cost
            });

            await tx.wait();

            // Update the token balance after a successful purchase
            fetchTokenBalance();

            setOutput('Tokens purchased successfully!');
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Purchase ERC20 Tokens DAPP</h1>
            <div className='body'>
                <h2>Your Token Balance: {tokenBalance} </h2>
                <h2>Contract Balance: {contractBalance} ETH</h2>
                <div>
                    <label htmlFor="numberOfTokensToTransfer">Number of Tokens to Transfer:</label>
                    <input
                        type="number"
                        id="numberOfTokensToTransfer"
                        placeholder="Enter the number of tokens to transfer"
                        value={numberOfTokensToTransfer}
                        onChange={(e) => setNumberOfTokensToTransfer(e.target.value)}
                    />
                    <button onClick={handleTransfer}>Transfer Tokens</button>
                </div>
                <div>
                    <label htmlFor="numberOfTokensToPurchase">Number of Tokens to Purchase:</label>
                    <input
                        type="number"
                        id="numberOfTokensToPurchase"
                        placeholder="Enter the number of tokens to purchase"
                        value={numberOfTokensToPurchase}
                        onChange={(e) => setNumberOfTokensToPurchase(e.target.value)}
                    />
                    <button onClick={handlePurchase}>Purchase Tokens</button>
                </div>
            </div>
            <div id="output" className={styles.output}>
                {output}
            </div>
        </div>
    );
}

export default TokenPurchaseComponent;
