require("@nomiclabs/hardhat-etherscan"),
require("@nomiclabs/hardhat-ethers");

//require("@nomicfoundation/hardhat-toolbox")
// require('dotenv').config();
//require("@nomiclabs/hardhat-waffle");
//require("@nomiclabs/hardhat-etherscan");
//  const PRIVATE_KEY = process.env.PRIVATE_KEY;
//  const sepolia_API = process.env.sepolia_API;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: {
      //get api key from ethersan
      sepolia: 'FX4SZKUX3P37GZEIZHT41FHZZK89VM3JIW'
    }
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      //get api-key from alchamy
      url: "https://sepolia.infura.io/v3/ee48903ff5e14bbea34665521c5eba54",
      //get Private key from MetaMask
      accounts: ["c2d7644c875de5a2220d9e80c9e3b71983c778ab44f5cb5dbf38acc0d2a58849"]
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
},
}



// require("@nomicfoundation/hardhat-toolbox");
// // require("@nomiclabs/hardhat-ethers");
// // require("@nomiclabs/hardhat-etherscan"),
// module.exports = {
//     solidity: "0.8.20",
//     defaultNetwork:"sepolia",
//     networks:{
//       sepolia:{
//         url:"https://sepolia.infura.io/v3/ee48903ff5e14bbea34665521c5eba54",
//         accounts:["c2d7644c875de5a2220d9e80c9e3b71983c778ab44f5cb5dbf38acc0d2a58849"]
//       }
//     },
//     etherscan:{
//       apikey:"NM7WJZZZQTG7HAASXNS99H26U9TZI7GQZR"
//     }
// }