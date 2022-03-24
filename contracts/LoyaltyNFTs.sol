// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "base64-sol/base64.sol";
import "hardhat/console.sol";

// give SVG code to contract
// output nft uril
// storing all nft metadata on-chain

contract LoyaltyNFTs is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address owner;

    event NFTCreated(uint256 indexed _tokenId, string _tokenURI);

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function awardLoyaltyNFT(address _loyalConsumer, string memory _svgImage, string memory _attributes) 
        public returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(_loyalConsumer, newItemId);

        //take imageURL and status text to create an SVG (move this to JS)
        //SVG to imageURI
        //tokenURI
        string memory imageURI = svgToImageURI(_svgImage);
        string memory tokenURI = createTokenURI(imageURI, _attributes);
        console.log(tokenURI);

        _setTokenURI(newItemId, tokenURI);

        emit NFTCreated(newItemId, tokenURI);

        return newItemId;
    }



    function svgToImageURI(string memory svg) internal pure returns(string memory) {
        string memory baseURI = "data:image/svg+xml;base64,";

        //base64 encoding of svg
        string memory svgEncoded = Base64.encode(bytes(string(abi.encodePacked(svg))));

        return(string(abi.encodePacked(baseURI, svgEncoded)));
    }

    function createTokenURI(string memory imageURI, string memory _attributes) internal view returns(string memory) {
        string memory baseURL = "data:application/json;base64,";
        return (string(abi.encodePacked(
                    baseURL,
                    Base64.encode(
                        bytes(abi.encodePacked(
                            '{"name":"', string(abi.encodePacked(name())), 
                            '",', _attributes, 
                            ', "image":"', imageURI,  
                            '", "description":"', string(abi.encodePacked(name())), ' Brand Loyalty NFT"}'
                            )))
        )));
    }
}
