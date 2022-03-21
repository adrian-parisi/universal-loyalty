// SPDX-License-Identifier: MIT
/*
Factory to create brand specific loyalty ERC20 tokens and keep track of them
*/
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "./LoyaltyERC20.sol";

contract LoyaltyCoinFactory {

    mapping(address => bool) public admins;
    address owner;
    mapping(string => address) public loyaltyCoins;
    uint256 public totalCoins;
    event CoinCreated(address indexed _creator, address indexed _coinAddress, string indexed _tokenSymbol, uint _totalSupply);
    event CoinsRedeemed(address indexed _user, string indexed _tokenSymbol);

    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }

    // change permissions later to only allow brand addresses authorized to create a coin
    function createLoyaltyERC20Coin(string memory  _tokenName, string memory _tokenSymbol, uint256 _totalSupply) public onlyOwnerAndAdmin {
        loyaltyCoins[_tokenSymbol] = address(new LoyaltyERC20(_tokenName, _tokenSymbol, _totalSupply, msg.sender));
        totalCoins++;
        emit CoinCreated(msg.sender, loyaltyCoins[_tokenSymbol] , _tokenSymbol, _totalSupply);
     }

    //
    function getCoinAddressBySymbol(string memory _tokenSymbol) public view returns(address) {
        //require(LoyaltyERC20(loyaltyCoins[_tokenSymbol]).owner() != msg.sender, "does not own the token");
        return(loyaltyCoins[_tokenSymbol]);
    }

    modifier onlyOwnerAndAdmin {
        require(msg.sender == owner || admins[msg.sender], "not admin or owner");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "not the owner");
        _;
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function deactivateAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }

    //user initiated to redeem coins for items
    function redeemCoins(string memory _tokenSymbol, uint256 _amount) external {
        address loyaltyCoinAddress = getCoinAddressBySymbol(_tokenSymbol);
        LoyaltyERC20 coin = LoyaltyERC20(loyaltyCoinAddress);

        require(coin.balanceOf(msg.sender) > _amount, "not enough coins to redeem");

        address coinOwner = coin.owner();
        console.log("coin owner: ", coinOwner);
        console.log("for coin: ", coin.symbol());
        //coin.approve(address(this), _amount);

        console.log("allowance: ", coin.allowance(msg.sender, address(this)));
        coin.transferFrom(msg.sender, coinOwner, _amount);

        emit CoinsRedeemed(msg.sender, _tokenSymbol);
    }

}