import {
  Heading,
  Avatar,
  Flex,
  Box,
  Center,
  Text,
  Stack,
  Button,
  HStack,
  VStack,
  Link,
  Badge,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { abi } from "../../../abi/Staking.json";
import { abi as TokenABI } from "../../../abi/MockERC20.json";
import useContract from "../../../hooks/useContract";
import { ethers } from "ethers";
import { BigNumberish } from "ethers";
import { useEffect, useState } from "react";

declare var window: any;

interface Pool {
  depositToken: any;
  rewardToken: any;
  depositedAmount: number;
  apy: number;
  lockDays: number;
}

interface User {
  amount: number;
  lastRewardAt: number;
  lockUntil: number;
  pendingReward: number;
  available: boolean;
}

const TOTAL_POOL = 3;
const TOKEN = "0x01d4C5A517302609331094C56Cc8727640611667";
const STAKING = "0xAe292034ce76827de9927FB4259A0Fd10344f02c";
const STAKE_AMOUNT = 100;

export default function PoolCards() {
  const { getContract } = useContract();

  const [pool, setPool] = useState<Array<Pool>>([]);
  const [user, setUser] = useState<Array<User>>([]);
  const getStakingContract = async () => await getContract(STAKING, abi);

  const getTokenContract = async () => await getContract(TOKEN, TokenABI);

  const dir = useBreakpointValue({ base: "column", md: "row" });

  const fetchPoolInfo = async () => {
    const stakingContract = await getStakingContract();
    let poolArray = [];
    for (let i = 0; i < TOTAL_POOL; i++) {
      const pool = await stakingContract["poolInfo(uint256)"](i);
      const tmpPool = {
        depositToken: pool[0],
        rewardToken: pool[1],
        depositedAmount: Number(pool[2]),
        apy: Number(pool[3]),
        lockDays: Number(pool[4]),
      };
      poolArray.push(tmpPool);
    }
    setPool(poolArray);
  };

  const fetchUserInfo = async (address: string) => {
    const stakingContract = await getStakingContract();
    const tokenContract = await getTokenContract();
    const allowAmount = await tokenContract["allowance(address,address)"](
      address,
      STAKING
    );
    console.log(allowAmount > STAKE_AMOUNT);
    let userArray = [];
    for (let i = 0; i < TOTAL_POOL; i++) {
      const user = await stakingContract["userDetail(uint,address)"](
        i,
        address
      );
      const reward = await stakingContract["pendingReward(uint,address)"](
        i,
        address
      );
      const tmpUser = {
        amount: Number(user[0]),
        lastRewardAt: Number(user[1]),
        lockUntil: Number(user[2]),
        pendingReward: Number(reward),
        available: allowAmount > STAKE_AMOUNT,
      };
      userArray.push(tmpUser);
    }
    setUser(userArray);
  };
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
          fetchPoolInfo();
          fetchUserInfo(walletAddress);
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        console.error("MetaMask not detected");
      }
    }

    fetchWalletData();
  }, [getContract]);

  const deposit = async (idx: number) => {
    const stakingContract = await getStakingContract();
    const tokenContract = await getTokenContract();
    // const pool = await stakingContract["add(address,address,uint256,uint)"](
    //   TOKEN,
    //   TOKEN,
    //   140,
    //   80
    // );
    // const pool = await stakingContract["poolInfo(uint256)"](2);
    // const pool = await stakingContract["pendingReward(uint,address)"](
    //   0,
    //   "0x17a9cA19768D19c165323E1c7934692074A95A0D"
    // );
    // const pool = await stakingContract["userDetail(uint,address)"](
    //   1,
    //   "0x17a9cA19768D19c165323E1c7934692074A95A0D"
    // );
    if (!user[idx].available) {
      await tokenContract["approve(address,uint256)"](STAKING, STAKE_AMOUNT);
    } else {
      await stakingContract["deposit(uint,uint)"](idx, STAKE_AMOUNT);
    }
    // const pool = await stakingContract["withdraw(uint,uint)"](1, 20);
  };
  return (
    // <Flex direction={['column', 'row']} >
    <Center py={4}>
      <Stack direction={dir} spacing={8}>
        {pool.length &&
          user.length &&
          pool.map((tmp, idx) => {
            return (
              <Box
                key={idx}
                //   maxW={'320px'}
                w={"full"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
                borderWidth="2px"
                borderRadius={"2xl"}
                style={{
                  borderImage:
                    "linear-gradient(to left, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1)) 1",
                }}
              >
                <VStack spacing={8}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    spacing={44}
                    align={"start"}
                  >
                    <Avatar
                      size={"xl"}
                      src={"background-logo.png"}
                      mb={4}
                      pos={"relative"}
                    />
                    <VStack>
                      <Text fontWeight={"bold"} fontSize={"2xl"}>
                        ArmorAI
                      </Text>
                      <Text fontWeight={"thin"}>Will be locked</Text>
                      <Button>{`${tmp.lockDays} days`}</Button>
                    </VStack>
                  </Stack>
                  <VStack spacing={4}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={56}
                      align={"start"}
                    >
                      <Text>Current APY:</Text>
                      <Text>{`${tmp.apy}%`}</Text>
                    </Stack>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={64}
                      align={"start"}
                    >
                      <Text>Earn</Text>
                      <Text fontWeight={"bold"}>Armor</Text>
                    </Stack>
                    {/* <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={"56"}
                      align={"start"}
                    >
                      <Text>Current APY:</Text>
                      <Text>100%</Text>
                    </Stack> */}
                  </VStack>
                  <Button
                    paddingX={32}
                    paddingY={32}
                    paddingTop={6}
                    paddingBottom={6}
                    bgColor={"purple"}
                    _hover={{
                      bgColor: "purple.900",
                    }}
                    onClick={() => deposit(idx)}
                  >
                    Enable Stacking
                  </Button>
                  <VStack spacing={4}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={52}
                      align={"start"}
                    >
                      <Text>You Stacked</Text>
                      <Text>{`${user[idx].amount} ARMOR`}</Text>
                    </Stack>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={52}
                      align={"start"}
                    >
                      <Text>Your Reward</Text>
                      <Text
                        fontWeight={"bold"}
                      >{`${user[idx].pendingReward} ARMOR`}</Text>
                    </Stack>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      spacing={40}
                      align={"start"}
                    >
                      <Text>Totak Stacked in Pool</Text>
                      <Text>{`${tmp.depositedAmount} ARMR`}</Text>
                    </Stack>
                  </VStack>
                </VStack>
              </Box>
            );
          })}
        {/* <Box
          //   maxW={'320px'}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          borderWidth="2px"
          borderRadius={"2xl"}
          style={{
            borderImage:
              "linear-gradient(to left, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1)) 1",
          }}
        >
          <VStack spacing={8}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={44}
              align={"start"}
            >
              <Avatar
                size={"xl"}
                src={"background-logo.png"}
                mb={4}
                pos={"relative"}
              />
              <VStack>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  ArmorAI
                </Text>
                <Text fontWeight={"thin"}>Will be locked</Text>
                <Button>1 days</Button>
              </VStack>
            </Stack>
            <VStack spacing={4}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={56}
                align={"start"}
              >
                <Text>Current APY:</Text>
                <Text>100%</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={64}
                align={"start"}
              >
                <Text>Earn</Text>
                <Text fontWeight={"bold"}>Armor</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={"56"}
                align={"start"}
              >
                <Text>Current APY:</Text>
                <Text>100%</Text>
              </Stack>
            </VStack>
            <Button
              paddingX={32}
              paddingY={32}
              paddingTop={6}
              paddingBottom={6}
              bgColor={"purple"}
              _hover={{
                bgColor: "purple.900",
              }}
            >
              Enable Stacking
            </Button>
            <VStack spacing={4}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={52}
                align={"start"}
              >
                <Text>You Stacked</Text>
                <Text>0.0 ARMOR</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={52}
                align={"start"}
              >
                <Text>Your Reward</Text>
                <Text fontWeight={"bold"}>0.0 ARMOR</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={40}
                align={"start"}
              >
                <Text>Totak Stacked in Pool</Text>
                <Text>0.0 ARMR</Text>
              </Stack>
            </VStack>
          </VStack>
        </Box>
        <Box
          //   maxW={'320px'}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
          borderWidth="2px"
          borderRadius={"2xl"}
          style={{
            borderImage:
              "linear-gradient(to left, rgba(255, 255, 37, 1), rgba(83, 219, 255, 1), rgba(255, 85, 243, 1), rgba(83, 219, 255, 1), rgba(255, 0, 255, 1)) 1",
          }}
        >
          <VStack spacing={8}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={44}
              align={"start"}
            >
              <Avatar
                size={"xl"}
                src={"background-logo.png"}
                mb={4}
                pos={"relative"}
              />
              <VStack>
                <Text fontWeight={"bold"} fontSize={"2xl"}>
                  ArmorAI
                </Text>
                <Text fontWeight={"thin"}>Will be locked</Text>
                <Button>1 days</Button>
              </VStack>
            </Stack>
            <VStack spacing={4}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={56}
                align={"start"}
              >
                <Text>Current APY:</Text>
                <Text>100%</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={64}
                align={"start"}
              >
                <Text>Earn</Text>
                <Text fontWeight={"bold"}>Armor</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={"56"}
                align={"start"}
              >
                <Text>Current APY:</Text>
                <Text>100%</Text>
              </Stack>
            </VStack>
            <Button
              paddingX={32}
              paddingY={32}
              paddingTop={6}
              paddingBottom={6}
              bgColor={"purple"}
              _hover={{
                bgColor: "purple.900",
              }}
            >
              Enable Stacking
            </Button>
            <VStack spacing={4}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={52}
                align={"start"}
              >
                <Text>You Stacked</Text>
                <Text>0.0 ARMOR</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={52}
                align={"start"}
              >
                <Text>Your Reward</Text>
                <Text fontWeight={"bold"}>0.0 ARMOR</Text>
              </Stack>
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={40}
                align={"start"}
              >
                <Text>Totak Stacked in Pool</Text>
                <Text>0.0 ARMR</Text>
              </Stack>
            </VStack>
          </VStack>
        </Box> */}
      </Stack>
    </Center>
  );
}
