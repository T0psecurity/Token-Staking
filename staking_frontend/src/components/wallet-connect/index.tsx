import { useEffect } from "react";
import { ethers } from "ethers";
// import '../../../globals.js'
import IndexPage from "../../../pages/index";
declare var window: any;

export default function ConnectWallet() {
  // const obj: { providers: any } = {};
  useEffect(() => {
    async function fetchWalletData() {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);

          // Check if the connected network is Binance Smart Chain
          const network = await provider.getNetwork();
          if (Number(network.chainId) !== 11155111) {
            throw new Error("Please configure MetaMask for Sepolia ETH Chain");
          }

          // Proceed with connecting the wallet and retrieving the account address and balance
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const balance = await provider.getBalance(address);

          console.log("Connected Address:", address);
          console.log("Balance:", ethers.formatEther(balance));
        } catch (error) {
          console.error("Error:", error);
          // Display the error message to the user
          // ...
        }
      } else {
        console.error("MetaMask not detected");
      }
    }

    fetchWalletData();
  }, []);

  return <IndexPage />;
}
