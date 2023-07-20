async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying staking contract with address:", deployerAddress);

  const STAKING = await ethers.getContractFactory("Staking");
  const contract = await STAKING.deploy();

  await contract.deployed();

  console.log("Staking contract deployed at", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
