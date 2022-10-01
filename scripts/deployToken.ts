const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
const data =  require("../gen_files/drop_ticket_roots.json");

async function main() {

const claimeeAddress = Object.keys(data)[1];
const proof = data[claimeeAddress].proof;

  ////----------------------- DEPLOY WITTOKEN.sol ----------------------------------///
  const WITToken = await ethers.getContractFactory("WITToken");
  const wittoken = await WITToken.deploy();

  await wittoken.deployed();

  console.log("WITToken deployed to:", wittoken.address);

  console.log('Deploying token......')

  const WITTokenTransfer = await ethers.getContractAt("WITToken", wittoken.address);

 


////----------------------- DEPLOY ClaimToken.sol ----------------------------------///

const ClaimToken = await ethers.getContractFactory("ClaimToken");
const _claimToken = await ClaimToken.deploy(wittoken.address);

await _claimToken.deployed();

console.log("Claim token contract deployed to:", _claimToken.address);

console.log('Deploying claimToken.sol contract......')

// balance of claimToken.sol
const balanceOfClaimContract = await WITTokenTransfer.balanceOf(_claimToken.address);
console.log("token balance of ClaimToken.sol before transfer", balanceOfClaimContract);

// transfer tokens from WITTOken.sol contract to claimToken.sol contract
const transfer = await WITTokenTransfer.withdrawFromContract(_claimToken.address, "20000000000000000000");


////----------------------- Impersonate Claimee addresss ----------------------------------///

await helpers.impersonateAccount(claimeeAddress);
const impersonatedSigner = await ethers.getSigner(claimeeAddress);
console.log('Impersonating......')


// gives of impersonator's address Ethers for transactions
await helpers.setBalance(impersonatedSigner.address, 100n ** 18n);

// check token balance of claimee address
let ethersBalance = await ethers.provider.getBalance(impersonatedSigner.address);
console.log("Balance of ether", ethersBalance)

//check token balance of Impersonator's address
const tokenBalanceOfClaimee = await WITTokenTransfer.balanceOf(impersonatedSigner.address);
console.log("token balance of claimee before", tokenBalanceOfClaimee);

// Create Instance of ClaimToken.sol contract
const Interact = await ethers.getContractAt("ClaimToken", _claimToken.address );
const claimeYourToken = await Interact.connect(impersonatedSigner).claimToken(2, proof);
const result = await claimeYourToken.wait();
// console.log("Result from claiming token", result)

//check token balance of ClaimToken.sol contract
const tokenBalanceOfClaimerContract = await WITTokenTransfer.balanceOf(_claimToken.address);
console.log("token balance of ClaimToken.sol Contract", tokenBalanceOfClaimerContract);

//check token balance of Impersonator's address
const tokenBalanceOfClaimee2 = await WITTokenTransfer.balanceOf(impersonatedSigner.address);
console.log("token balance of claimee after", tokenBalanceOfClaimee2);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});