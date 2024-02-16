require("@nomicfoundation/hardhat-toolbox");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");
require("./tasks/accounts");
require("./tasks/treasury");
require("./tasks/tax");
require("./tasks/token");

require('dotenv').config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "testnet",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY
    }
  },
  networks: {
    testnet: {
      url: 'https://bsc-testnet.blockpi.network/v1/rpc/public',
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: 'https://bsc.blockpi.network/v1/rpc/public',
      accounts: [process.env.PRIVATE_KEY]
    },
    blastSepolia: {
      url: 'https://sepolia.blast.io',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    }
  }
};
