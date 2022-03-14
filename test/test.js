const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LoyaltyContractFactory", function () {
  it("Should create four coins", async function () {
    const LoyaltyCoinFactory = await hre.ethers.getContractFactory("LoyaltyCoinFactory");
    const factory = await LoyaltyCoinFactory.deploy();
    await factory.deployed();
  
    console.log("LoyaltyCoinFactory deployed to:", factory.address);
  
    await factory.createLoyaltyERC20Coin("MOES Coin", "MOES", 1000000);
    await factory.createLoyaltyERC20Coin("Starbucks Coin", "SBUCKS", 1000000);
    await factory.createLoyaltyERC20Coin("LOYL Coin", "LOYL", 1000000);
    await factory.createLoyaltyERC20Coin("McDonalds Coin", "MCD", 1000000);

    expect((await factory.totalCoins()).toNumber()).to.equal(4);

  });
});
