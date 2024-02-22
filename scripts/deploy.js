// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const hre = require("hardhat");

const path = require("path");

async function timeoutAwait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NAME = process.env.TOKEN_NAME || "Catpurr";
  const SYMBOL = process.env.TOKEN_SYMBOL || "PURR";
  
  const signers = await hre.ethers.getSigners();
  const signer = signers[0];

  const Catpurr = await hre.ethers.getContractFactory("CATPURR");
  const ZeroTaxHandler = await hre.ethers.getContractFactory("ZeroTaxHandler");
  const ZeroTreasuryHandler = await hre.ethers.getContractFactory("ZeroTreasuryHandler");

  const zeroTaxHandler = await ZeroTaxHandler.deploy();
  await zeroTaxHandler.deployed();
  console.log("ZeroTaxHandler deployed to:", zeroTaxHandler.address);

  const zeroTreasuryHandler = await ZeroTreasuryHandler.deploy();
  await zeroTreasuryHandler.deployed();
  console.log("ZeroTreasuryHandler deployed to:", zeroTreasuryHandler.address);

  const catpurr = await Catpurr.deploy(NAME, SYMBOL, zeroTaxHandler.address, zeroTreasuryHandler.address);
  await catpurr.deployed();

  await timeoutAwait(10000);

  console.log("CATPURR deployed to:", catpurr.address);
  
  const taxHandler = await hre.ethers.getContractFactory("ExponentialTaxHandler");
  const treasuryHandler = await hre.ethers.getContractFactory("TreasuryHandler");

  const taxHandlerInstance = await taxHandler.deploy();
  await taxHandlerInstance.deployed();
  console.log("ExponentialTaxHandler deployed to:", taxHandlerInstance.address);

  const treasuryHandlerInstance = await treasuryHandler.deploy(
    signer.address,
  );
  await treasuryHandlerInstance.deployed();
  console.log("TreasuryHandler deployed to:", treasuryHandlerInstance.address);

  await catpurr.setTaxHandler(taxHandlerInstance.address);
  await catpurr.setTreasuryHandler(treasuryHandlerInstance.address);

  if (process.env.OWNER_ADDRESS) {
    await catpurr.transferOwnership(process.env.OWNER_ADDRESS);
    await taxHandlerInstance.transferOwnership(process.env.OWNER_ADDRESS);
    await treasuryHandlerInstance.transferOwnership(process.env.OWNER_ADDRESS);
  }

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(catpurr);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("CATPURR");

  fs.writeFileSync(
    path.join(contractsDir, "CATPURR.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
