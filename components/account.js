import React, { useState, useEffect } from 'react';
import { useAccount } from "wagmi";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import StarknetTransaction from '../components/StarknetTransaction';

export default function Account() {
  const { isConnected } = useAccount();
  const [transactionHash, setTransactionHash] = useState('');
  const [showTransaction, setShowTransaction] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionHash) {
      setShowTransaction(true);
    }
  };

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
          <>
            <h1 className="account-title">
              Please Connect To Continue
            </h1>
            <DynamicWidget className="mb-6" />
          </>
        ) : (
          <>
            <h1 className="account-title">
              Welcome to SafeSend
            </h1>
            
            <DynamicWidget className="mb-8" />
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