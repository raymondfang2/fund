import web3 from "./web3";
import FundFactory from "./contracts/FundFactory.json";

const instance = new web3.eth.Contract(
  FundFactory.abi,
  "0x51Db7f91171dCc3508a82e8FDBaAa364f071FF5E"
);
//replace the above address with the output of "truffle migrate ..." --> the contract address of FundFactory
//Only the account deployed the above factory can raise fund --> the charityOwner
export default instance;
