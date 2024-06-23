// File: pages/api/starknet-block.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { hash } = req.query;

    if (!hash) {
      return res.status(400).json({ error: 'Transaction hash is required' });
    }

    try {
      const response = await fetch('https://free-rpc.nethermind.io/sepolia-juno/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "starknet_getTransactionReceipt",
          "params": {
            "transaction_hash": hash,
          },
          "id": 1
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Unknown error occurred');
      }

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching Starknet transaction:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch Starknet transaction' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}