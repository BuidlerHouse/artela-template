const hre = require("hardhat");

import {
  JoinPoint,
  bindAspect,
  deployAspect,
  getBoundAddress,
  getBoundAspect,
  AspectProperty,
} from "artela-hardhat-plugin";

async function testContract(contractAddress: string, ownerAddress: string) {
  const Contract = await hre.ethers.getContractAt("Counter", contractAddress);
  let ownerResponse = await Contract.isOwner.staticCall(ownerAddress);
  console.log("isOwner response:", ownerResponse);
  let addResponse = await Contract.add(3);
  console.log("add response:", addResponse);
  const response = await Contract.get.staticCall();
  console.log("get response:", response);
}

async function main() {
  const network = hre.network.name;
  const [deployer] = await hre.ethers.getSigners();
  const Counter = await hre.ethers.getContractFactory("Counter");
  console.log("start deploy");
  const token = await Counter.deploy({ gasLimit: 9000000 });
  await token.waitForDeployment();
  const contractAddress = await token.getAddress();
  console.log("deployed contract", contractAddress);
  const ownerAddress = deployer.address
  // if we want verifyTx failed, we can change the verifyAccount value to ownerAddress, such as ownerAddress + "1234"
  let properties: AspectProperty[] = [
    { key: "verifyAccount", value: ownerAddress }
  ];
  const aspect = await deployAspect(
    properties,
    [JoinPoint.PreTxExecute],
    "build/auth_debug.wasm",
    "",
    network
  );

  const bind = await bindAspect(contractAddress, aspect, "9000000", network);
  console.log("deployed aspect", aspect, "contract: ", contractAddress);
  // const boundAddress = await getBoundAddress(aspect, network);
  // const boundAspect = await getBoundAspect(contractAddress, network);
  await testContract(contractAddress, ownerAddress);
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
