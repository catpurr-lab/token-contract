// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const hre = require("hardhat");

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
  const signers = await hre.ethers.getSigners();
  const signer = signers[0];

  const catpurr = await hre.ethers.getContractAt("CATPURR", process.env.CATPURR_CONTRACT_ADDRESS);
  const treasuryHandler = await hre.ethers.getContractFactory("TreasuryHandler");

  const treasuryHandlerInstance = await treasuryHandler.deploy(
    signer.address,
  );
  await treasuryHandlerInstance.deployed();
  console.log("TreasuryHandler deployed to:", treasuryHandlerInstance.address);

  await catpurr.setTreasuryHandler(treasuryHandlerInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
