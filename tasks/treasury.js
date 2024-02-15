task("treasury:withdraw", "Withdraws the funds from the contract")
  .addPositionalParam("contract", "The address of the contract")
  .addPositionalParam("tokenContract", "The address of the token contract")
  .addPositionalParam("balance", "The amount of tokens to withdraw")
  .setAction(async ({ contract, tokenContract, balance }, { ethers, network }) => {
    if (network.name === "hardhat") {
      console.warn(
        "You are running the withdraw task with Hardhat network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }

    const contractInstance = await ethers.getContractAt("TreasuryHandler", contract);
    const tx = await contractInstance.withdraw(
      tokenContract,
      balance,
      { 
        gasLimit: 1000000,
      }
    );
    await tx.wait();
    console.log(`Withdrawn ${balance} CATPURR tokens from ${contract}`);
  }
);

task("treasury:transferOwnership", "Transfer ownership of the treasury handler")
  .addPositionalParam("contract", "The address of the contract")
  .addPositionalParam("newOwner", "The new owner address")
  .setAction(async ({ contract, newOwner }, { ethers }) => {
    const treasury = await ethers.getContractAt("TreasuryHandler", contract);
    const tx = await treasury.transferOwnership(newOwner);
    await tx.wait();
    console.log(`Ownership of ${contract} transferred to ${newOwner}`);
  });