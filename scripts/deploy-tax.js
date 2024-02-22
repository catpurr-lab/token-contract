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
  const taxHandler = await hre.ethers.getContractFactory("ExponentialTaxHandler");

  const taxHandlerInstance = await taxHandler.deploy();
  await taxHandlerInstance.deployed();
  
  console.log("ExponentialTaxHandler deployed to:", taxHandlerInstance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
