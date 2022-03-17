// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
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
  let factory = await LoyaltyCoinFactory.deploy();
  await factory.deployed();

  console.log("LoyaltyCoinFactory deployed to:", factory.address);

  await factory.createLoyaltyERC20Coin("MOES Coin", "MOES", ethers.utils.parseUnits("1000000", 18));
  await factory.createLoyaltyERC20Coin("Starbucks Coin", "SBUCKS", ethers.utils.parseUnits("1000000", 18));
  await factory.createLoyaltyERC20Coin("LOYL Coin", "LOYL", ethers.utils.parseUnits("1000000", 18));
  await factory.createLoyaltyERC20Coin("McDonalds Coin", "MCD", ethers.utils.parseUnits("1000000", 18));

  console.log("Total coins:", (await factory.totalCoins()).toNumber());

  let loyaltyCoin = await factory.getCoinAddressBySymbol("LOYL");

  console.log(loyaltyCoin);

  loyaltyCoin = await factory.getCoinAddressBySymbol("SBUCKS");

  console.log(loyaltyCoin);

  //way to get a specific coin contract object
  let sbucksCoin = await hre.ethers.getContractAt("LoyaltyERC20", loyaltyCoin);
  // few tests for mint() and burn()
  const [owner, user] = await ethers.getSigners();

  console.log("owner address: ", await sbucksCoin.owner());
  console.log("owner balance: ", await sbucksCoin.balanceOf(await sbucksCoin.owner()));
  console.log("user address: ", user.address);
  console.log("user balance: ", await sbucksCoin.balanceOf(user.address));



  console.log("initial totalsupply(): ", (await sbucksCoin.totalSupply()));
  let nonce = await owner.getTransactionCount();
  console.log("nonce1: ", nonce);
  let txn = await sbucksCoin.mint(user.address, ethers.utils.parseUnits("100", 18), {nonce:nonce});
  txn.wait();
  console.log("after mint updated totalsupply(): ", (await sbucksCoin.totalSupply()));
  console.log("owner balance after mint: ", await sbucksCoin.balanceOf(owner.address));
  console.log("user balance after mint: ", await sbucksCoin.balanceOf(user.address));

  nonce = await owner.getTransactionCount();
  console.log("nonce2: ", nonce);
  txn = await sbucksCoin.burn(owner.address, ethers.utils.parseUnits("10", 18), {nonce:nonce});
  txn.wait();
  console.log("after burn updated totalsupply(): ", (await sbucksCoin.totalSupply()));
  console.log("owner balance after burn: ", await sbucksCoin.balanceOf(owner.address));
  console.log("user balance after burn: ", await sbucksCoin.balanceOf(user.address));

  factory = await factory.connect(user);
  sbucksCoin = await sbucksCoin.connect(user);
  await sbucksCoin.approve(factory.address, ethers.utils.parseUnits("5", 18));
  txn = await factory.redeemCoins("SBUCKS", ethers.utils.parseUnits("5", 18));
  console.log("after redeem updated totalsupply(): ", (await sbucksCoin.totalSupply()));
  console.log("owner balance after redeem: ", await sbucksCoin.balanceOf(owner.address));
  console.log("user balance after redeem: ", await sbucksCoin.balanceOf(user.address));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
