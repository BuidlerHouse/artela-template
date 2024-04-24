# Artela Template

for Artela contract development, please follow the link below:
[Artela Contract Development Guide](https://docs.artela.network/develop/guides/contract-via-aspect)

## Guide

```
npm install
mv .env.example .env # Fill your PrivateKey here
```

### Optional: run devnet

#### prerequisites

install go, [jq](https://jqlang.github.io/jq/download/)

```
npx hardhat devnet
```

initail test wallet with balance

| Address                                    | Private Key                                                        | Bech32 Acc                                 |
| ------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------ |
| 0x636B813875bFEEb5941089b07c18Cf6F31B27C55 | 0xd63ca10fae51e35945cb366d7601ea79d65e79aa176c82fbb3df2cfd8d58fcb5 | art1vd4czwr4hlhtt9qs3xc8cxx0ducmylz4sh4l5m |
| 0xAdbc81cDb00a2461A5Ab70a3DF1401E0a79a1478 | 0x7b13c9f33b3b5663700297471733a88796fccc33b0da8e9b813f7a8422533304 | art14k7grndspgjxrfdtwz3a79qpuzne59rcg5y2vp |
| 0xf0B2Ad824e98d5A3245A9E3c85dda71D513C37d1 | 0xc5e3059ac8e54e415e3d81831fc24f292f825ae3d2690bab97d3e3c80065046e | art17ze2mqjwnr26xfz6nc7gthd8r4gncd73a585zw |
| 0x2ABb8c7bf395326C2A3B489D3fDe844822e55ccf | 0x91c00a2cbf598cdb1173d06674d8ee7fea71437c196867f4d9a0088105f697c0 | art192acc7lnj5exc23mfzwnlh5yfq3w2hx06pkj0u |

it will run a artela node at `http://127.0.0.1:8545`

compile smart contract

```
npm run compile
```

or

```
yarn compile
```

compile aspect

```
npm run compile-aspect
```

or

```
yarn compile-aspect
```

if you have error building the wasm file on windows, please try:

```
npm run compile-as
```

or

```
yarn compile-as
```

Run the deploy script

```
# local devnet
npx hardhat run scripts/deploy.ts --network local

# testnet
npx hardhat run scripts/deploy.ts --network artela
```

example output:

```
$ npx hardhat run scripts/deploy.ts --network artela
start deploy
deployed contract 0x1d99888F86E4Cd5A5762dF5dF84CDa23F3dbac34
from address:  0x376b40c51E96AbCE9F00a2d7aAf6b6e5519a7898
deployAspect: sending signed transaction...
receipt: {
  blockHash: '0x323edd8ae5addac327c146571855320f1edd0900c4c3a3944d8adaef7ca2a961',
  blockNumber: 6062762,
  contractAddress: null,
  cumulativeGasUsed: 140303,
  from: '0x376b40c51e96abce9f00a2d7aaf6b6e5519a7898',
  gasUsed: 9000000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x30dbac2a15523d294bbe24f95d954f88a49057fe7b6844236832a15009d70c45',
  transactionIndex: 0,
  type: '0x0',
  aspectAddress: '0xA5e2fBe17dd3045Ae13A08cB023c514Ac89C29F4'
}
View the transaction on the explorer: https://betanet-scan.artela.network/tx/0x30dbac2a15523d294bbe24f95d954f88a49057fe7b6844236832a15009d70c45
aspectID: 0xA5e2fBe17dd3045Ae13A08cB023c514Ac89C29F4
bindAspect: sending signed transaction...
receipt: {
  blockHash: '0xcf1e1e74e607bab9135909116125f3fde37c8a1e3de42b5ae0f02c740af2ee09',
  blockNumber: 6062764,
  contractAddress: null,
  cumulativeGasUsed: 0,
  from: '0x376b40c51e96abce9f00a2d7aaf6b6e5519a7898',
  gasUsed: 9000000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0x0000000000000000000000000000000000a27e14',
  transactionHash: '0x7a0bf909a156e30f8bbc29ee673590e2c59baf154ea239507655b4903d21215a',
  transactionIndex: 0,
  type: '0x0'
}
View the transaction on the explorer: https://betanet-scan.artela.network/tx/0x7a0bf909a156e30f8bbc29ee673590e2c59baf154ea239507655b4903d21215a
Aspect bind success
deployed aspect 0xA5e2fBe17dd3045Ae13A08cB023c514Ac89C29F4 contract:  0x1d99888F86E4Cd5A5762dF5dF84CDa23F3dbac34
Get the aspect context
getAspectContext response: HelloWorld
setAspectContext response: true
done
```

## Commands 

```
use --help flag for more information

npx hardhat compile # compile solidity
npx hardhat compile-aspect # compile the aspect, default aspect/index.ts
npx hardhat deploy-aspect --joinpoints preContractCall --wasm build/index_debug.wasm # deploy the aspect
npx hardhat create-account # create new account
npx hardhat devnet # run local devnet
npx hardhat setup # setup project directory for aspect in an existing project
npx hardhat call --contract Storage --address $CONTRACT  --method getAspectContext --network artela  $ASPECT ToContract # call contract method
npx hardhat get-balance --address 0x376b40c51E96AbCE9F00a2d7aAf6b6e5519a7898 # get balance of account address
npx hardhat transfer --from  0x376b40c51E96AbCE9F00a2d7aAf6b6e5519a7898 --to 0xe5107dee9CcC8054210FF6129cE15Eaa5bbcB1c0 --amount 0.01 # transfer amount from one account to another
npx hardhat get-bound-address --aspect $ASPECT --network artela # get bound address of aspect
npx hardhat get-bound-aspect --contract $CONTRACT --network artela # get bound aspect of contract
```
