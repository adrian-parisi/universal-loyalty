// SPDX-License-Identifier: MIT
/*
Mintable, Burnable ERC20 loyalty coin for Univeral Loyalty
*/
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "hardhat/console.sol";

contract LoyaltyERC20 is ERC20 {
    address public owner;
    //add admin users later

    constructor(string memory  _tokenName, string memory _tokenSymbol, uint256 _totalSupply, address _owner) ERC20(_tokenName, _tokenSymbol) {
        _mint(msg.sender, _totalSupply * (10 ** 18));
        owner = _owner;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount * 10 ** 18);
    }

    function burn(address from, uint256 amount) external {
        _burn(from, amount * 10 ** 18);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "not the owner");
        _;
    }
}