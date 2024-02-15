task("tax:transferOwnership", "Transfer ownership of the tax handler")
  .addPositionalParam("contract", "The address of the contract")
  .addPositionalParam("newOwner", "The new owner address")
  .setAction(async ({ contract, newOwner }, { ethers }) => {
    const tax = await ethers.getContractAt("ExponentialTaxHandler", contract);
    const tx = await tax.transferOwnership(newOwner);
    await tx.wait();
    console.log(`Ownership of ${contract} transferred to ${newOwner}`);
  });
  

task("tax:addExempt", "Sets an address as an exempt benefactor")
  .addPositionalParam("contract", "The address of the contract")
  .addPositionalParam("benefactor", "The address that will be set as an exempt benefactor")
  .setAction(async ({ benefactor, contract }, { ethers }) => {
    const tax = await ethers.getContractAt("ExponentialTaxHandler", contract);
    const tx = await tax.addExempt(benefactor);
    await tx.wait();
    console.log(`Address ${benefactor} set as an exempt benefactor`);
  });

task("tax:setTaxRate", "Sets the tax rate")
  .addPositionalParam("contract", "The address of the contract")
  .addPositionalParam("taxRate", "The tax rate")
  .setAction(async ({ taxRate, contract }, { ethers }) => {
    const tax = await ethers.getContractAt("ExponentialTaxHandler", contract);
    const tx = await tax.setTaxRate(taxRate);
    await tx.wait();
    console.log(`Tax rate set to ${taxRate}`);
  });

task("tax:getTaxRate", "Gets the tax rate")
  .addPositionalParam("contract", "The address of the contract")
  .setAction(async ({ contract }, { ethers }) => {
    const tax = await ethers.getContractAt("ExponentialTaxHandler", contract);
    const taxRate = await tax.getTaxRate();
    console.log(`Tax rate is ${taxRate}`);
  });
