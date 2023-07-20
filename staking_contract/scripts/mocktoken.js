const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying staking contract with address:", deployerAddress);

  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const contract = await MockERC20.deploy(
    "SSS",
    "SSS",
    ethers.utils.parseEther("1000")
  );

  await contract.deployed();

  console.log("Token contract deployed at", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
