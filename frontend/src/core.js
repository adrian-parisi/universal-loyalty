import { ethers } from 'ethers';
import LoyaltyCoinFactory from './artifacts/contracts/LoyaltyCoinFactory.sol/LoyaltyCoinFactory.json';
import LoyaltyERC20 from './artifacts/contracts/LoyaltyERC20.sol/LoyaltyERC20.json';
import LoyaltyProgramManager from './artifacts/contracts/LoyaltyProgramManager.sol/LoyaltyProgramManager.json';


class LoyaltyCoinHelper {

  constructor(signer) {
    this.signer = signer;
    this.manager = new ethers.Contract(
      process.env.REACT_APP_LOYALTY_PROGRAM_MANAGER_ADDRESS,
      LoyaltyProgramManager.abi,
      signer
    );

    this.factory = new ethers.Contract(
      process.env.REACT_APP_LOYALTY_TOKEN_FACTORY_ADDRESS,
      LoyaltyCoinFactory.abi,
      signer
    );
  }

  async createLoyaltyToken(token) {
    console.log("Creating new loyalty token: ", token.symbol);
    console.log("Token name: " + token.name);
    console.log("Token symbol: " + token.symbol);
    console.log("Initial supply: " + token.initialSupply);
    const tx = await this.factory.createLoyaltyERC20Coin(token.name, token.symbol, ethers.utils.parseEther(token.initialSupply));
    const receipt = await tx.wait();
    const creationEvent = receipt.events.find(x => x.event === "CoinCreated");
    const tokenAddress = '0x' + creationEvent.topics[2].slice(-40);
    console.log(`Token ${token.name} has been created\n` +
      `Address: ${tokenAddress}\n` +
      `Total supply: ${token.initialSupply}`);
  }

  async earnCoins(tokenSymbol, address, amount) {
    const coinAddress = await this.factory.getCoinAddressBySymbol(tokenSymbol);
    console.log(`${tokenSymbol} address: ${coinAddress}`);
    const coin = new ethers.Contract(coinAddress, LoyaltyERC20.abi, this.signer);
    const amountWithDecimals = ethers.utils.parseEther(amount);
    await coin.approve(this.manager.address, ethers.BigNumber.from(amountWithDecimals));
    console.log(`Contract's been allowed to transfer ${amount} ${tokenSymbol}`);
    const tx = await this.manager.earnCoins(address, tokenSymbol, ethers.BigNumber.from(amountWithDecimals));
    await tx.wait();
    console.log(`Token ${tokenSymbol} has been distributed successfully to ${address}`);
  }

  async redeemCoins(tokenSymbol, amount) {
    console.log(`Redeeming coins: ${amount} ${tokenSymbol}`);
    const coinAddress = await this.factory.getCoinAddressBySymbol(tokenSymbol);
    console.log(`${tokenSymbol} address: ${coinAddress}`);
    const coin = new ethers.Contract(coinAddress, LoyaltyERC20.abi, this.signer);
    const amountWithDecimals = ethers.utils.parseEther(amount);
    await coin.approve(this.manager.address, ethers.BigNumber.from(amountWithDecimals));
    const tx = await this.manager.redeemCoins(tokenSymbol, ethers.BigNumber.from(amountWithDecimals));
    await tx.wait();
    console.log(`Successfully redeemed ${amount} ${tokenSymbol}`);
  }

}

export default LoyaltyCoinHelper;