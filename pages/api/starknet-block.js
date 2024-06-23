// File: pages/api/starknet-block.js

export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === 'GET') {
    // Extract the transaction hash from the query parameters
    const { hash } = req.query;

    // Validate that a hash was provided
    if (!hash) {
      return res.status(400).json({ error: 'Transaction hash is required' });
    }

    try {
      // Make a POST request to the Starknet RPC endpoint
      const response = await fetch('https://free-rpc.nethermind.io/sepolia-juno/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Construct the JSON-RPC request body
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "method": "starknet_getTransactionReceipt",
          "params": {
            "transaction_hash": hash,
          },
          "id": 1
        }),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      
      // Check for errors in the RPC response
      if (data.error) {
        throw new Error(data.error.message || 'Unknown error occurred');
      }

      // Send the successful response back to the client
      res.status(200).json(data);
    } catch (error) {
      // Log the error and send an error response to the client
      console.error('Error fetching Starknet transaction:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch Starknet transaction' });
    }
  } else {
    // Handle cases where the request method is not GET
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}