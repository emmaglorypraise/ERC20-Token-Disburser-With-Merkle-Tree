require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan")
// require("dotenv").config({ path: ".env" });

const GOERLI_API_KEY_URL = process.env.GOERLI_API_KEY_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const API_TOKEN = process.env.API_TOKEN;

module.exports = {
  solidity: "0.8.10",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/FVhKzRogIAlI_zgqGdtgyVzZYTL9_yct",
      accounts: ["e550d9f280f76bbd7438cbeaf03453f899fd83588cf3f2312143c22b7dc025c0"],
    },
  },
  etherscan: {
    apiKey: "GMSKNX6XU6KESUH67CV5F6ZJIEEF2ZPVP8"
  },
  lockGasLimit: 200000000000,
  gasPrice: 10000000000,
};