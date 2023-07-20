import { useCallback } from "react";
import { ethers } from "ethers";
declare var window: any;

// eslint-disable-next-line no-undef
const isMainnet = process.env.REACT_APP_ENV === "MAINNET";

export default () => {
  const getContract = useCallback(
    async (address: any, abi: any) => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        return new ethers.Contract(address, abi, signer);
      } else {
        const provider = new ethers.JsonRpcProvider(
          "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
          11155111
        );

        return new ethers.Contract(address, abi, provider);
      }
    },
    [11155111]
  );

  return { getContract };
};
