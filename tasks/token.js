task("token:renounceOwnership", "Renounce ownership of the token")
  .addPositionalParam("token", "The token address")
  .setAction(async ({ token }) => {
    const tokenContract = await ethers.getContractAt("CATPURR", token);
    await tokenContract.renounceOwnership();
  });

task("token:transferOwnership", "Transfer ownership of the token")
  .addPositionalParam("token", "The token address")
  .addPositionalParam("newOwner", "The new owner address")
  .setAction(async ({ token, newOwner }) => {
    const tokenContract = await ethers.getContractAt("CATPURR", token);
    await tokenContract.transferOwnership(newOwner);
  });

task("token:setTaxHandler", "Set the tax handler of the token")
  .addPositionalParam("token", "The token address")
  .addPositionalParam("taxHandler", "The tax handler address")
  .setAction(async ({ token, taxHandler }) => {
    const tokenContract = await ethers.getContractAt("CATPURR", token);
    await tokenContract.setTaxHandler(taxHandler);
  });