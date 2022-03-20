// SPDX-License-Identifier: MIT
/*
Loyalty Program Manager : manages the loyalty program: redemption, distribution
*/
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./LoyaltyERC20.sol";
import "./LoyaltyCoinFactory.sol";

contract LoyaltyProgramManager {

    address loyaltyCoinFactoryAddress;
    address public owner;
    mapping(address => bool) public admins;

    event CoinsEarned(address indexed _user, string indexed _tokenSymbol, uint256 _amount);
    event CoinsRedeemed(address indexed _user, string indexed _tokenSymbol, uint256 _amount);

    constructor(address _loyaltyCoinFactoryAddress) {
        loyaltyCoinFactoryAddress = _loyaltyCoinFactoryAddress;
        owner = msg.sender;
        admins[msg.sender] = true;
    }

    //user initiated to redeem coins for items
    function redeemCoins(string memory _tokenSymbol, uint256 _amount) external {
        LoyaltyCoinFactory loyaltyCoinFactory = LoyaltyCoinFactory(loyaltyCoinFactoryAddress);

        address loyaltyCoinAddress = loyaltyCoinFactory.getCoinAddressBySymbol(_tokenSymbol);

        LoyaltyERC20 coin = LoyaltyERC20(loyaltyCoinAddress);

        require(coin.balanceOf(msg.sender) >= _amount, "not enough coins to redeem");

        address coinOwner = coin.owner();
        console.log("coin owner: ", coinOwner);
        console.log("for coin: ", coin.symbol());
        //coin.approve(address(this), _amount);

        console.log("allowance in redeemCoins in manager: ", coin.allowance(msg.sender, address(this)));
        coin.transferFrom(msg.sender, coinOwner, _amount);

        emit CoinsRedeemed(msg.sender, _tokenSymbol, _amount);
    }

    //coin owner initiated to distribute coins to the user 
    function earnCoins(address _to, string memory _tokenSymbol, uint256 _amount) external onlyOwner {
        LoyaltyCoinFactory loyaltyCoinFactory = LoyaltyCoinFactory(loyaltyCoinFactoryAddress);

        address loyaltyCoinAddress = loyaltyCoinFactory.getCoinAddressBySymbol(_tokenSymbol);

        LoyaltyERC20 coin = LoyaltyERC20(loyaltyCoinAddress);

        require(coin.balanceOf(msg.sender) >= _amount, "not enough coins to distribute");
        console.log("allowance in manager - Coins: ", coin.allowance(msg.sender, address(this)));

        coin.transferFrom(msg.sender, _to, _amount);

        emit CoinsEarned(_to, _tokenSymbol, _amount);
    }


    modifier onlyOwnerAndAdmin {
        require(msg.sender == owner || admins[msg.sender], "not admin or owner");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "not the owner");
        _;
    }

}