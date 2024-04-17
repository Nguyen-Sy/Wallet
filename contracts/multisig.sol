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

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool excuted;
        uint numConfirmation;
    }

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public isConfirmed;
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event Deposit(address indexed sender, uint amount, uint balance);

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exsits");
        _;
    }
    modifier notExcuted(uint _txIndex) {
        require(!transactions[_txIndex].excuted, "tx already excuted");
        _;
    }

    modifier notConfirm(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data
    ) public onlyOwner {
        uint _txIndex = transactions.length;
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                excuted: false,
                numConfirmation: 0
            })
        );
        emit SubmitTransaction(msg.sender, _txIndex, _to, _value, _data);
    }

    function confirmTransaction(
        uint _txIndex
    ) public onlyOwner notConfirm(_txIndex) notExcuted(_txIndex) {
        Transaction storage tracsaction = transactions[_txIndex];
        tracsaction.numConfirmation += 1;
        isConfirmed[_txIndex][msg.sender] = true;
        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    fallback() external payable {}

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }
}
