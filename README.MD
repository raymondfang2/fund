**Truffle init version**
git checkout Init-Truffle -b MyInitBranch

1. To deploy to rinkey
    npm install truffle-hdwallet-provider

    ```create a ".secret" file in the working folder which contains your mnemonic. Your 1st account will be the charityOwner!```
   
npm migrate --network rinkeby

2. To deploy to local Ganache

npm migrate --network development

**Truffle with reactive and web3 sample**
git checkout Web3 -b MyWeb3Branch
1. npm migrate --network rinkeby
2. copy the ./build/contracts to ./client/src  --> to make sure accessible to reactjs code
3. modify factory.js --> the FundFactory address needs to be replaced by your deployment

npm start

```Sample Code - (reusable) web3.js, factory.js, fund.js. (poc) App.js```


