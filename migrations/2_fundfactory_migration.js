const FundFactory = artifacts.require('./FundFactory.sol');

module.exports = function(deployer) {
    deployer.deploy(FundFactory);
};