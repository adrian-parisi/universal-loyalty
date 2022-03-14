// SPDX-License-Identifier: MIT
/*
Factory to create brand specific loyalty ERC20 tokens and keep track of them
*/
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./LoyaltyERC20.sol";

contract LoyaltyCoinFactory {

    mapping(string => address) public loyaltyCoins;
    uint256 public totalCoins;
    event CoinCreated(address indexed _creator, string indexed _tokenSymbol, uint _totalSupply);

    // change permissions later to only allow brand addresses authorized to create a coin
    function createLoyaltyERC20Coin(string memory  _tokenName, string memory _tokenSymbol, uint256 _totalSupply) public  {
        loyaltyCoins[_tokenSymbol] = address(new LoyaltyERC20(_tokenName, _tokenSymbol, _totalSupply, msg.sender));
        totalCoins++;
        emit CoinCreated(msg.sender, _tokenSymbol, _totalSupply);
     }

    //
    function getCoinAddressBySymbol(string memory _tokenSymbol) external view returns(address) {
        //require(LoyaltyERC20(loyaltyCoins[_tokenSymbol]).owner() != msg.sender, "does not own the token");
        return(loyaltyCoins[_tokenSymbol]);
    }

}