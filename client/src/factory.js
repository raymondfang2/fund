import web3 from "./web3";
import FundFactory from "./contracts/FundFactory.json";

const instance = new web3.eth.Contract(
  FundFactory.abi,
    "0x61B663dB4Eb4EAAa5E2BD9180891A7462B5732dE"
  //"0x05EDC19c9C6DA045dB3C8Fc260EbEc1897b7B0eE"
  // "0xD34fdF127573241FBF69A598F82045DF870a9640"
);
//replace the above address with the output of "truffle migrate ..." --> the contract address of FundFactory
//Only the account deployed the above factory can raise fund --> the charityOwner
export default instance;
