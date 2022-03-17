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
    mapping(address => bool) public admins;
    //add admin users later

    constructor(string memory  _tokenName, string memory _tokenSymbol, uint256 _totalSupply, address _owner) 
                ERC20(_tokenName, _tokenSymbol) {
        owner = _owner;
        admins[_owner] = true;
        _mint(_owner, _totalSupply);
    }

    function mint(address to, uint256 amount) external onlyOwnerAndAdmin {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyOwnerAndAdmin {
        _burn(from, amount);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "not the owner");
        _;
    }

    modifier onlyOwnerAndAdmin {
        require(msg.sender == owner || admins[msg.sender], "not admin or owner");
        _;
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function deactivateAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }
}