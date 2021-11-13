import web3 from "./web3";
import Fund from "./contracts/Fund.json";


export default (address) => {
    return new web3.eth.Contract(
        Fund.abi,
        address
    );
};
