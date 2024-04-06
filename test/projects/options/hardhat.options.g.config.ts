/**
 * TESTS:
 * + Default Terminal Format
 * + L2: Base
 * + reportPureAndViewMethods
 * + excludeAutoGeneratedGetters
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import "@nomicfoundation/hardhat-ethers";
import { HardhatUserConfig } from "hardhat/types";

// We load the plugin here.
import "../../../src/index";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  mocha: {
    reporter: 'dot'
  },
  gasReporter: {
    coinmarketcap: process.env.CMC_API_KEY,
    currencyDisplayPrecision: 4,
    L2: "arbitrum",
    L1Etherscan: process.env.ETHERSCAN_API_KEY,
    L2Etherscan: process.env.ARBITRUM_API_KEY,
    enabled: true,
    reportPureAndViewMethods: true,
    excludeAutoGeneratedGetters: true
  }
};

// eslint-disable-next-line import/no-default-export
export default config;
