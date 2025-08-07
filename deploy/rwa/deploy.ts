import { getWallet } from "../../utils";
import { Deployer } from "@matterlabs/hardhat-zksync";
import { ethers } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function (hre: HardhatRuntimeEnvironment) {
  const wallet = getWallet();
  const deployer = new Deployer(hre, wallet);

  const contractArtifact = await deployer.loadArtifact(
    "RealWillingAlliance"
  );
  const recipient = "0x03ADEC4FaDEef145a1719777fF83334e0bc1A100";
  const initialAuthority = "0x03ADEC4FaDEef145a1719777fF83334e0bc1A100";

  const rwa = await hre.zkUpgrades.deployProxy(
    getWallet(),
    contractArtifact,
    [recipient, initialAuthority],
    { initializer: "initialize" }
  );

  await rwa.waitForDeployment();
}

// Successfully compiled 14 Solidity files
// Era Sepolia Implementation contract was deployed to 0xF95A031C464d0428D00E49e914757Fe2ef595d3D
// Era Sepolia UUPS proxy was deployed to 0x40D2b3b9f8566Fa19c2F1F5b6aA445B171cC3f53
