import React, { useState, useEffect } from 'react';

export default function StarknetTransaction({ transactionHash }) {
  const [txInfo, setTxInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactionInfo() {
      if (!transactionHash) {
        setError('No transaction hash provided');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/starknet-block?hash=${transactionHash}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        const result = data.result;

        let actualFeeInEther = 'N/A';
        if (result.actual_fee && result.actual_fee.amount) {
          const feeBigInt = BigInt(result.actual_fee.amount);
          actualFeeInEther = (Number(feeBigInt) / 10**18).toFixed(18);
        }

        setTxInfo({
          actualFee: actualFeeInEther,
          executionStatus: result.execution_status,
          finalityStatus: result.finality_status,
          transactionHash: result.transaction_hash,
          blockHash: result.block_hash,
          blockNumber: result.block_number
        });
      } catch (e) {
        setError(`Failed to fetch transaction information: ${e.message}`);
        console.error('Error:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactionInfo();
  }, [transactionHash]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error: {error}</p>;

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:text-white mt-6">
      <h2 className="text-3xl font-bold mb-6">Starknet Transaction Information</h2>
      {txInfo && (
        <ul className="space-y-4 text-lg">
          {/* <li><span className="font-semibold">Transaction Hash:</span> <span className="break-all">{txInfo.transactionHash}</span></li> */}
          <li><span className="font-semibold">Actual Fee:</span> {txInfo.actualFee} Ether</li>
          <li>
            <span className="font-semibold">Execution Status:</span> 
            <span className={txInfo.executionStatus === "SUCCEEDED" ? "text-green-500 font-bold ml-2" : "ml-2"}>
              {txInfo.executionStatus}
            </span>
          </li>
          <li><span className="font-semibold">Finality Status:</span> {txInfo.finalityStatus}</li>
          {/* <li><span className="font-semibold">Block Hash:</span> <span className="break-all">{txInfo.blockHash}</span></li> */}
          <li><span className="font-semibold">Block Number:</span> {txInfo.blockNumber}</li>
        </ul>
      )}
    </div>
  );
}