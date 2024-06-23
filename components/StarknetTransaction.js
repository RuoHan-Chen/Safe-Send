import React, { useState, useEffect } from 'react';

export default function StarknetTransaction({ transactionHash }) {
  // State to store the transaction information
  const [txInfo, setTxInfo] = useState(null);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to handle any errors that occur during fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactionInfo() {
      // Check if a transaction hash is provided
      if (!transactionHash) {
        setError('No transaction hash provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch transaction data from the API
        const response = await fetch(`/api/starknet-block?hash=${transactionHash}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Check for errors in the API response
        if (data.error) {
          throw new Error(data.error);
        }

        const result = data.result;

        // Calculate the actual fee in Ether
        let actualFeeInEther = 'N/A';
        if (result.actual_fee && result.actual_fee.amount) {
          const feeBigInt = BigInt(result.actual_fee.amount);
          actualFeeInEther = (Number(feeBigInt) / 10**18).toFixed(18);
        }

        // Set the transaction information state
        setTxInfo({
          actualFee: actualFeeInEther,
          executionStatus: result.execution_status,
          finalityStatus: result.finality_status,
          transactionHash: result.transaction_hash,
          blockHash: result.block_hash,
          blockNumber: result.block_number
        });
      } catch (e) {
        // Handle any errors that occur during fetching
        setError(`Failed to fetch transaction information: ${e.message}`);
        console.error('Error:', e);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    }

    fetchTransactionInfo();
  }, [transactionHash]); // Re-run effect when transactionHash changes

  // Render loading state
  if (loading) return <p className="text-center text-xl">Loading...</p>;
  // Render error state
  if (error) return <p className="text-center text-xl text-red-500">Error: {error}</p>;

  // Render transaction information
  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:text-white mt-6">
      <h2 className="text-3xl font-bold mb-6">Starknet Transaction Information</h2>
      {txInfo && (
        <ul className="space-y-4 text-lg">
          {/* Transaction hash display is commented out */}
          {/* <li><span className="font-semibold">Transaction Hash:</span> <span className="break-all">{txInfo.transactionHash}</span></li> */}
          <li><span className="font-semibold">Actual Fee:</span> {txInfo.actualFee} Ether</li>
          <li>
            <span className="font-semibold">Execution Status:</span> 
            <span className={txInfo.executionStatus === "SUCCEEDED" ? "text-green-500 font-bold ml-2" : "ml-2"}>
              {txInfo.executionStatus}
            </span>
          </li>
          <li><span className="font-somibold">Finality Status:</span> {txInfo.finalityStatus}</li>
          {/* Block hash display is commented out */}
          {/* <li><span className="font-semibold">Block Hash:</span> <span className="break-all">{txInfo.blockHash}</span></li> */}
          <li><span className="font-semibold">Block Number:</span> {txInfo.blockNumber}</li>
        </ul>
      )}
    </div>
  );
}