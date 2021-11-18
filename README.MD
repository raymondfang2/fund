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

**Deploy and Host on github**
Simply access the home page

https://raymondfang2.github.io/fund/
For this hosted one, it is deployed via my account so that raise fund can only be done by charityOwner - me!

```text
Any code change, to redeploy 
cd client
npm run deploy
```

**1. Sample Code with Almost Everything***
tag -- 1-Sample-UI-Router-Factory-Fund


TODO:
1. Bug in Solidity Contract - multiple donation from the same person should count once only for:
   donatorsCount++;
2. detail page:
    . Donate Form (Done)
    . Request List (below the summary)
    . Approve Button (beside the Request)
    . Create Request Form (above the request list)
