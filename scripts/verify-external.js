const { run } = require("hardhat");
async function main() {
  await run(`verify:verify`, {
    contract: "contracts/treasury/TreasuryHandler.sol:TreasuryHandler",
    address: "0x3E12d8D1246784ACfCfDD50e68Ed3b0AC5a59ccf",
    constructorArguments: [
        "0x53e66b4a3af5392a228891455082232b07903c3d"
    ],
  });

  await run(`verify:verify`, {
    contract: "contracts/tax/ExponentialTaxHandler.sol:ExponentialTaxHandler",
    address: "0x57fb5d58E28d1306fE96a6313ea19DF0731C8bE7",
    constructorArguments: [
        500,
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

