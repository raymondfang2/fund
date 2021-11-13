import web3 from "./web3";
import FundFactory from "./contracts/FundFactory.json";

const instance = new web3.eth.Contract(
  FundFactory.abi,
  "0x6969853dEEd9C3F1EeEC96188f8542d250C69665"
);
//replace the above address with the output of "truffle migrate ..." --> the contract address of FundFactory
//Only the account deployed the above factory can raise fund --> the charityOwner
export default instance;
