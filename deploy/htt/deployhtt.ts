import { getWallet } from "../../utils";
import { Deployer } from "@matterlabs/hardhat-zksync";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();
  const deployer = new Deployer(hre, wallet);

  const contractArtifact = await deployer.loadArtifact(
    "HTT"
  );
  const recipient = "0x03ADEC4FaDEef145a1719777fF83334e0bc1A100";
  const initialAuthority = "0x03ADEC4FaDEef145a1719777fF83334e0bc1A100";

  const htt = await hre.zkUpgrades.deployProxy(
    getWallet(),
    contractArtifact,
    [recipient, initialAuthority],
    { initializer: "initialize" }
  );

  await htt.waitForDeployment();
}

// Successfully compiled 14 Solidity files
// Era Sepolia Implementation contract was deployed to 0x85636FC8CF3401dB5d15ff7D4CC1F7b0cC76b9d8
// Era Sepolia UUPS proxy was deployed to 0xb2c039474F2145c588ac1201b60FC7f0D05e5E8d