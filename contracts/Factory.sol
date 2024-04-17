// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./multisig.sol";

contract Factory {
    event WalletCreated(address wallet, address[] owners, uint confirmRequired);
    
    function createMultiSigWallet(address[] memory _owners, uint _numConfirmRequired)  public {
        MultiSig multiSig = new MultiSig(_owners,_numConfirmRequired);
        emit WalletCreated(address(multiSig), _owners, _numConfirmRequired);
    }

}