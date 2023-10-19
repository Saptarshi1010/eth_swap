// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

module.exports = async function (deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed()

  // Deploy EthSwap
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed()

  // Transfer all tokens to EthSwap (1 million)
  await token.transfer(ethSwap.address, '1000000000000000000000000')
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
