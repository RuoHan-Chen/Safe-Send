"use client"  // Directive for Next.js to use client-side rendering for this component

// Import necessary components and functions from various libraries
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

// Import wallet connectors for Ethereum and Starknet
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";

// Create a Wagmi configuration for Ethereum mainnet
const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

// Create a new QueryClient for React Query
const queryClient = new QueryClient();

// Define the Login component
const Login = ({children}) => {
  return (
    // Set up the Dynamic context with environment ID and wallet connectors
    <DynamicContextProvider
      settings={{
        // Environment ID for Dynamic.xyz integration
        environmentId: "858ed354-fd4f-462a-bdbe-834e4406a0d7",
        // Specify wallet connectors for Ethereum and Starknet
        walletConnectors: [
          EthereumWalletConnectors,
          StarknetWalletConnectors
        ],
      }}
    >
      {/* Provide the Wagmi configuration */}
      <WagmiProvider config={config}>
        {/* Set up React Query provider */}
        <QueryClientProvider client={queryClient}>
          {/* Connect Dynamic with Wagmi */}
          <DynamicWagmiConnector>
            {/* Render child components */}
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
     </DynamicContextProvider>
  );
};

export default Login;