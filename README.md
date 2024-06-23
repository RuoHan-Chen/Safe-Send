# SafeSend - Starknet Transaction Checker

SafeSend is a decentralized application (DApp) built on the Starknet blockchain, designed to provide users with a simple yet powerful tool for checking transaction statuses.

Live Demo: [https://safesend.vercel.app/](https://safesend.vercel.app/)

## Features

- **Wallet Connection**: Supports both Ethereum and Starknet wallets via Dynamic.xyz
- **Transaction Checking**: Input any Starknet transaction hash to retrieve detailed information
- **Responsive Design**: Built with React and Next.js, styled with Tailwind CSS for a seamless experience on all devices

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/safesend.git
   cd safesend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Connect your wallet using the DynamicWidget

4. Enter a Starknet transaction hash in the input field and click "Submit"

5. View the detailed transaction information

## Building for Production

To create a production build, run:
```
npm run build
```

Then, to start the production server:
```
npm start
```

## Technologies Used

- React
- Next.js
- Tailwind CSS
- Dynamic.xyz for wallet connection
- Starknet.js for blockchain interactions

## Contributing

We welcome contributions to SafeSend! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

[MIT License](LICENSE)

## Contact

For any queries or support, please open an issue in the GitHub repository.

---

Happy checking your Starknet transactions with SafeSend!