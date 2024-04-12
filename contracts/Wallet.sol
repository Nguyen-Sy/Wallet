// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";

contract MultiSig {
    address[] public owners;
    uint public numConfirmRequired;
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }
    mapping(address => bool) public isOwner;

    constructor(address[] memory _owners, uint _numConfirmRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmRequired > 0 && _numConfirmRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmRequired = _numConfirmRequired;
    }
}
