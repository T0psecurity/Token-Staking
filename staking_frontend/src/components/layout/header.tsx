import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Button, HStack } from "@chakra-ui/react";
import { sign } from "crypto";
declare var window: any;

export default function Header() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    async function fetchWalletData() {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);

          const network = await provider.getNetwork();
          if (Number(network.chainId) !== 11155111) {
            throw new Error("Please configure MetaMask for Sepolia ETH Chain");
          }

          const signer = await provider.getSigner();
          const walletAddress = await signer.getAddress();
          const walletBalance = await provider.getBalance(walletAddress);
          console.log(walletAddress, walletBalance);

          setAddress(walletAddress);
          setBalance(ethers.formatEther(walletBalance));
          setIsConnected(true);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("MetaMask not detected");
      }
    }

    fetchWalletData();
  }, []);

  return (
    <HStack spacing={8} padding={"8"}>
      <Box>
        {!isConnected ? (
          <Button
            bgGradient="linear(to-l, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1))"
            bgClip="text"
            _hover={{ bgClip: "text" }}
            fontSize={"2xl"}
            onClick={() => {
              setIsConnected(true);
            }}
          >
            Connect Wallet
          </Button>
        ) : (
          <HStack>
            <Button
              bgGradient="linear(to-l, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1))"
              bgClip="text"
              _hover={{ bgClip: "text" }}
              fontSize={"2xl"}
            >
              {address}
            </Button>
            <Button
              bgGradient="linear(to-l, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1))"
              bgClip="text"
              _hover={{ bgClip: "text" }}
              fontSize={"2xl"}
            >
              {balance}
            </Button>
          </HStack>
        )}
      </Box>

      <Box>
        <Button
          bgGradient="linear(to-l, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1))"
          bgClip="text"
          _hover={{ bgClip: "text" }}
          fontSize={"2xl"}
          onClick={() => {
            setIsConnected(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Box>
    </HStack>
  );
}
