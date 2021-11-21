pragma solidity >=0.7.0 <0.9.0;

import './Fund.sol';

contract FundFactory {
    address[] public deployedFunds;

    address public charityOwner;

    constructor()  {
        charityOwner = msg.sender;
    }

    function raiseFund(string memory name) public {
        Fund newFund = new Fund(name, msg.sender);
        deployedFunds.push(address(newFund));
    }

    function getFunds() public view returns (address[] memory) {
        return deployedFunds;
    }
}
