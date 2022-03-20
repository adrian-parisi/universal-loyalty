

const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("LoyaltyContractFactory", function () {
    let LoyaltyCoinFactory;
    let factory;
    let sbucksCoin;
    let user;
    let owner;
    let loyaltyCoin;

    before(async function () {
        LoyaltyCoinFactory = await hre.ethers.getContractFactory("LoyaltyCoinFactory");
        factory = await LoyaltyCoinFactory.deploy();
        await factory.deployed();
                
        [owner, user] = await ethers.getSigners();
        
      });
    it("Should create 4 tokens", async function () {
    
        await factory.createLoyaltyERC20Coin("MOES Coin", "MOES", ethers.utils.parseUnits("1000000", 18));
        await factory.createLoyaltyERC20Coin("Starbucks Coin", "SBUCKS", ethers.utils.parseUnits("1000000", 18));
        await factory.createLoyaltyERC20Coin("LOYL Coin", "LOYL", ethers.utils.parseUnits("1000000", 18));
        await factory.createLoyaltyERC20Coin("McDonalds Coin", "MCD", ethers.utils.parseUnits("1000000", 18));

        expect((await factory.totalCoins()).toNumber()).to.equal(4);

    });

    it("check total supply for SBUCKS", async function () {
        loyaltyCoin = await factory.getCoinAddressBySymbol("SBUCKS");

        //way to get a specific coin contract object
        let sbucksCoin = await hre.ethers.getContractAt("LoyaltyERC20", loyaltyCoin);

        const totalS = await sbucksCoin.totalSupply();

        expect(totalS).to.equal(ethers.utils.parseUnits("1000000", 18));
      });

});
