// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract ClaimToken {
    event Sent(address receiver, uint256 amount);

    address public WITToken;
    
    bytes32 merkleRoot;

    constructor(address _WITToken) {
        merkleRoot = 0x72fdac8e46324ac5ebf7d5c17932385531814f5f21be7e77698cbd05722b2b08;
        WITToken = _WITToken;
    }

    mapping(address => bool) public claimed;

    function claimToken(uint256 amount, bytes32[] memory proof) public {
        require(!claimed[msg.sender], "Address already claimed");

        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));

        require(MerkleProof.verify(proof, merkleRoot, leaf), "Not whitelisted");

        IERC20(WITToken).transfer(msg.sender, amount);

        claimed[msg.sender] = true;

        emit Sent(msg.sender, amount);
    }

}
