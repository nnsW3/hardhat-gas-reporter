/**
 * TESTS:
 * + Default Terminal Format
 * + L2: Optimism
 * + Autoconfiguration without etherscan api-key
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
    L2: "optimism",
    enabled: true,
    reportPureAndViewMethods: true,
    excludeAutoGeneratedGetters: true
  }
};

// eslint-disable-next-line import/no-default-export
export default config;
