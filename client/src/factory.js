import web3 from "./web3";
import FundFactory from "./contracts/FundFactory.json";

const instance = new web3.eth.Contract(
  FundFactory.abi,
  "0xD34fdF127573241FBF69A598F82045DF870a9640"
);
//replace the above address with the output of "truffle migrate ..." --> the contract address of FundFactory
//Only the account deployed the above factory can raise fund --> the charityOwner
export default instance;
