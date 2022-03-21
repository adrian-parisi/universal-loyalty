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

  //deploy loyalty program manager
  const LoyaltyProgamMgr = await hre.ethers.getContractFactory("LoyaltyProgramManager");
  let manager = await LoyaltyProgamMgr.deploy(factory.address);
  await manager.deployed();

  console.log("LoyaltyProgramManager deployed to:", manager.address);

  await factory.createLoyaltyERC20Coin("MOES Coin", "MOES", ethers.utils.parseUnits("1000000", 18));
  await factory.createLoyaltyERC20Coin("Starbucks Coin", "SBUCKS", ethers.utils.parseUnits("1000000", 18));
  await factory.createLoyaltyERC20Coin("LOYL Coin", "LOYL", ethers.utils.parseUnits("1000000", 18));
  await factory.createLoyaltyERC20Coin("McDonalds Coin", "MCD", ethers.utils.parseUnits("1000000", 18));

  console.log("Total coins created:", (await factory.totalCoins()).toNumber());

  loyaltyCoin = await factory.getCoinAddressBySymbol("SBUCKS");

  console.log("SBUCKS Contract Address: ", loyaltyCoin);

  //way to get a specific coin contract object
  let sbucksCoin = await hre.ethers.getContractAt("LoyaltyERC20", loyaltyCoin);
  // few tests for mint() and burn()
  const [owner, user] = await ethers.getSigners();

  console.log("owner address: ", await sbucksCoin.owner());
  console.log("user address: ", user.address);
  printLog(await sbucksCoin.totalSupply(), 
          await sbucksCoin.balanceOf(owner.address), 
          await sbucksCoin.balanceOf(user.address), 
          "INITIAL STAGE");

  let nonce = await owner.getTransactionCount();
  //console.log("nonce1: ", nonce);

  //mint (by owner)
  let txn = await sbucksCoin.mint(user.address, ethers.utils.parseUnits("100", 18), {nonce:nonce});
  txn.wait();
  printLog(await sbucksCoin.totalSupply(), 
          await sbucksCoin.balanceOf(owner.address), 
          await sbucksCoin.balanceOf(user.address), 
          "AFTER MINT");

  // burn (by owner)
  nonce = await owner.getTransactionCount();
  txn = await sbucksCoin.burn(owner.address, ethers.utils.parseUnits("10", 18), {nonce:nonce});
  txn.wait();
  printLog(await sbucksCoin.totalSupply(), 
          await sbucksCoin.balanceOf(owner.address), 
          await sbucksCoin.balanceOf(user.address), 
          "AFTER BURN");

  // redeem (by user)
  factory = await factory.connect(user);
  sbucksCoin = await sbucksCoin.connect(user);
  // let success = await sbucksCoin.approve(manager.address, ethers.utils.parseUnits("50", 18));
  // console.log("approve worked? ", success);
  // txn = await manager.redeemCoins("SBUCKS", ethers.utils.parseUnits("50", 18));

  await sbucksCoin.approve(factory.address, ethers.utils.parseUnits("5", 18));
  txn = await factory.redeemCoins("SBUCKS", ethers.utils.parseUnits("5", 18));
  printLog(await sbucksCoin.totalSupply(), 
          await sbucksCoin.balanceOf(owner.address), 
          await sbucksCoin.balanceOf(user.address), 
          "AFTER REDEEM");

}

// debug log function
function printLog(totalSupply, ownerBalance, userBalance, stage) {
  console.log("-----------------------------------------");
  console.log("Stage: ", stage);
  console.log("      USER Balance: ", userBalance);
  console.log("      OWNER Balance: ", ownerBalance);
  console.log("      TOTALSUPPLY: ", totalSupply);
  console.log("-----------------------------------------");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
