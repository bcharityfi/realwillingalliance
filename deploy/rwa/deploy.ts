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
