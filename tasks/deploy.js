// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  //const LoyaltyERCToken = await hre.ethers.getContractFactory("LoyaltyERC20");
  //const loyalty = await LoyaltyERCToken.deploy("Loyalty Coin", "LOYL", 1000000);

  const LoyaltyCoinFactory = await hre.ethers.getContractFactory("LoyaltyCoinFactory");
  const factory = await LoyaltyCoinFactory.deploy();
  await factory.deployed();

  console.log("LoyaltyCoinFactory deployed to:", factory.address);

  await factory.createLoyaltyERC20Coin("MOES Coin", "MOES", 1000000);
  await factory.createLoyaltyERC20Coin("Starbucks Coin", "SBUCKS", 1000000);
  await factory.createLoyaltyERC20Coin("MOES Coin", "LOYL", 1000000);
  await factory.createLoyaltyERC20Coin("Starbucks Coin", "MCD", 1000000);

  console.log("Total coins:", (await factory.totalCoins()).toNumber());

  let loyaltyCoin = await factory.getCoinAddressBySymbol("LOYL");

  console.log(loyaltyCoin);

  loyaltyCoin = await factory.getCoinAddressBySymbol("SBUCKS");

  console.log(loyaltyCoin);

  //way to get a specific coin contract object
  const sbucksCoin = await hre.ethers.getContractAt("LoyaltyERC20", loyaltyCoin);
  console.log(await sbucksCoin.owner());

  // few tests for mint() and burn()
  const [owner] = await ethers.getSigners();
  console.log("initial totalsupply(): ", (await sbucksCoin.totalSupply()));
  let txn = await sbucksCoin.mint(owner.address, 10000);
  txn.wait();
  console.log("after mint updated totalsupply(): ", (await sbucksCoin.totalSupply()));

  txn = await sbucksCoin.burn(owner.address, 10000);
  txn.wait();
  console.log("after burn updated totalsupply(): ", (await sbucksCoin.totalSupply()));


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
