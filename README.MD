**Truffle init version**
git checkout Init-Truffle -b MyInitBranch

1. To deploy to rinkey
    npm install truffle-hdwallet-provider

    ```create a ".secret" file in the working folder which contains your mnemonic. Your 1st account will be the charityOwner!```
   
truffle migrate --network rinkeby --reset

2. To deploy to local Ganache

truffle migrate --network development --reset

**Truffle with reactive and web3 sample**
git checkout Web3 -b MyWeb3Branch
1. truffle migrate --network rinkeby --reset
2. copy the ./build/contracts to ./client/src  --> to make sure accessible to reactjs code
3. modify factory.js --> the FundFactory address needs to be replaced by your deployment

npm start

```Sample Code - (reusable) web3.js, factory.js, fund.js. (poc) App.js```

**Deploy and Host on github**
Simply access the home page

https://raymondfang2.github.io/fund/
For this hosted one, I have let anyone can raise Fund (For Testing Only) 
In Real Case, Only the charityOwner who deployed the Factory Contract has the permission to raise Fund

```text
Any code change, to redeploy 
cd client
npm run deploy
```

**1. Sample Code with Almost Everything***
tag -- 1-Sample-UI-Router-Factory-Fund

**3. Sample code with Donation and New Request***
tag -- 3-Sample-Donation-Request

**4. End to End Completion**
tag --4-End2End-Init

**5. End to End Completion with Bug fix in Solidify**
tag --5-End2End-2

**6. End to End Completion Clean**
tag --6-End2End-Clean

**7. HashRouter to resolve refresh problem in GitHub
tag 7-End2End-HashRouter

**8. Add a Barchart
tag 8-End2End-Barchart
    
**9. Add the header image
tag 9-End2End-Header

**10. Change FundFactory for performance in welcome.js
tag 10-End2End-Performance

**11. End2End unit ether
tag 11-End2End-Ether

Feature to be improved:
2. detail page:
   . Approval button error msg 
   . Hide button for non -permission user
   . Donation history

