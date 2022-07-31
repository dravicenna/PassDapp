import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const KEY: any = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  networks: {
    hardhat: {},
    bsc: {
      url: "https://bsc-dataseed1.binance.org",
      accounts: [KEY],
    },
    bsc_test: {
      url: "https://data-seed-prebsc-2-s1.binance.org:8545",
      accounts: [KEY],
    },
    aurora: {
      url: `https://mainnet.aurora.dev`,
      accounts: [KEY],
    },
    fantom: {
      url: `https://rpc.ftm.tools/`,
      accounts: [KEY],
    },
  },
  solidity: "0.8.9",
};

export default config;
