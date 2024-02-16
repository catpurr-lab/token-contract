const { run } = require("hardhat");
async function main() {
  await run(`verify:verify`, {
    contract: "contracts/Catpurr.sol:CATPURR",
    address: "0x20bc80955b3893b012Bc0FBa3d1605de57E00c1c",
    constructorArguments: [
        "Catpurr",
        "PURR",
        "0x1F34DdE0B8808a9246E769dDfb723FEC384BEe65",
        "0xd79F9d3a65d706f8E1d3a8F35C56FD0a5bD3edeD",
    ],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

