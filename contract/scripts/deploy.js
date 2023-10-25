const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("ShahidToken");
  const token = await Token.deploy(1000000);
  // await token.deployed();
  console.log("ShahidToken deployed to:", token.address);

  const TokenPurchaseContract = await hre.ethers.getContractFactory("TokenPurchaseContract");
  const tokenPurchaseContract = await TokenPurchaseContract.deploy(token.address, 2000000000000000);
  // await tokenPurchaseContract.deployed();
  console.log("TokenPurchaseContract deployed to:", tokenPurchaseContract.address);
}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
