import React, { useState, useEffect } from 'react';
import { useAccount } from "wagmi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import StarknetTransaction from '../components/StarknetTransaction';

export default function Account() {
  // Hook to check if the user is connected to a wallet
  const { isConnected } = useAccount();
  
  // State for managing the transaction hash input
  const [transactionHash, setTransactionHash] = useState('');
  
  // State to control whether to show the transaction details
  const [showTransaction, setShowTransaction] = useState(false);
  
  // State to manage client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Effect to set isClient to true once the component mounts
  // This helps prevent hydration errors with server-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionHash) {
      setShowTransaction(true);
    }
  };

  // Show a loading spinner while waiting for client-side rendering
  if (!isClient) {
    return (
      <div className="flex justify-center items-center h-screen">
        <style>{spinnerStyle}</style>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-card">
        {!isConnected ? (
          // Display connect wallet prompt if user is not connected
          <>
            <h1 className="account-title">
              Please Connect To Continue
            </h1>
            <DynamicWidget className="mb-6" />
          </>
        ) : (
          // Display main interface if user is connected
          <>
            <h1 className="account-title">
              Welcome to SafeSend
            </h1>
            
            {/* Widget for managing wallet connection */}
            <DynamicWidget className="mb-8" />

            {/* Form for submitting transaction hash */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-black dark:text-white font-bold mb-2" htmlFor="txHash">
                  Transaction Hash:
                </label>
                <input
                  id="txHash"
                  type="text"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  className="account-input"
                  placeholder="Enter transaction hash"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="account-button"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Conditional rendering of StarknetTransaction component */}
            {showTransaction && (
              <div className="mt-8">
                <StarknetTransaction transactionHash={transactionHash} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}