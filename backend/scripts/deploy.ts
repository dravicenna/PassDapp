import { ethers } from "hardhat";

async function main() {
  const Passdapp = await ethers.getContractFactory("Passdapp");
  const passdapp = await Passdapp.deploy();

  await passdapp.deployed();

  console.log("PassDapp deployed to:", passdapp.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
});
