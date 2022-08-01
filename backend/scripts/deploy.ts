import { ethers } from "hardhat";

async function main() {
  // get owner address
  const [owner] = await ethers.getSigners();
  console.log(`Owner address: ${owner.address}`);
  const Passdapp = await ethers.getContractFactory("PassDapp");
  const passdapp = await Passdapp.deploy();

  await passdapp.deployed();

  console.log("PassDapp deployed to:", passdapp.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
});
