pragma solidity >=0.7.0 <0.9.0;

import './Fund.sol';

contract FundFactory {
    address[] public deployedFunds;
    //added
    Fund[] public fundRefs;
    struct FundBalance {
        string fundName;
        uint balance;
    }

    address public charityOwner;

    constructor()  {
        charityOwner = msg.sender;
    }

    function raiseFund(string memory name) public {
        Fund newFund = new Fund(name, msg.sender);
        deployedFunds.push(address(newFund));
        //added
        fundRefs.push(newFund);
    }

    function getFunds() public view returns (address[] memory) {
        return deployedFunds;
    }

    function getFundBalances() public view returns (FundBalance[] memory) {
        uint len = fundRefs.length;
        FundBalance[] memory fbs = new FundBalance[](len);
        for (uint i=0; i<len; i++) {
            (string memory fundName,uint balance,,,) = fundRefs[i].getSummary(); //Summary is tuple from Fund contract, first 2 fields are name and balance
            FundBalance memory fb = FundBalance(fundName, balance);
            fbs[i] = fb;
        }
        return fbs;
    }
}
