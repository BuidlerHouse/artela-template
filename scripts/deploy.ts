const hre = require("hardhat");

import {
  bindAspect,
  deployAspect,
  getBoundAddress,
  getBoundAspect,
} from "artela-hardhat-plugin";

async function testContract(contractAddress: string, aspectId: string) {
  const Contract = await hre.ethers.getContractAt("Storage", contractAddress);
  console.log("Get the aspect context");
  let validationData = await Contract.getAspectContext.staticCall(
    aspectId,
    "ToContract"
  );
  console.log("getAspectContext response:", validationData);
  // Call the setAspectContext method
  const response = await Contract.setAspectContext.staticCall(
    "ToAspect",
    "HelloAspect"
  );
  console.log("setAspectContext response:", response);
}

async function main() {
  const network = hre.network.name;
  const Storage = await hre.ethers.getContractFactory("Storage");
  console.log("start deploy");
  const token = await Storage.deploy({ gasLimit: 9000000 });
  await token.waitForDeployment();
  const contractAddress = await token.getAddress();
  console.log("deployed contract", contractAddress);
  const aspect = await deployAspect(
    "[]",
    ["preTxExecute", "postTxExecute"],
    "build/index_debug.wasm",
    "",
    network
  );
  const bind = await bindAspect(contractAddress, aspect, "9000000", network);
  console.log("deployed aspect", aspect, "contract: ", contractAddress);
  // const boundAddress = await getBoundAddress(aspect, network);
  // const boundAspect = await getBoundAspect(contractAddress, network);
  await testContract(contractAddress, aspect);
  console.log("done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
