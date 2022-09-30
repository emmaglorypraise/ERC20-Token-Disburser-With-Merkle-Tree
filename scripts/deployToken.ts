import { ethers } from "hardhat";

// var ethers = require("ethers").ethers;

async function main() {

  const WITToken = await ethers.getContractFactory("WITToken");
  const wittoken = await WITToken.deploy("0x88538EE7D25d41a0B823A7354Ea0f2F252AD0fAf");

  await wittoken.deployed();

  console.log("WITToken deployed to:", wittoken.address);

// merkleTreeNFT.methods.safeMint(address, proof).send({ from: address })

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});