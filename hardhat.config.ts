require("artela-hardhat-plugin");
require("@nomicfoundation/hardhat-ethers");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  solidity: "0.8.7",
  networks: {
    artela: {
      url: "https://betanet-rpc2.artela.network",
      accounts: [process.env.PRIVATEKEY],
    },
    local: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATEKEY_LOCAL],
    }
  }
};
