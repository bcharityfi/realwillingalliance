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

// August 7, 2025
// Era Sepolia UUPS proxy was deployed to 0x40D2b3b9f8566Fa19c2F1F5b6aA445B171cC3f53

// August 8, 2025
// 1. Era UUPS proxy was deployed to 0x65F081c9428D5782EF2bf74FFEA0e46675f9Db39
// 2. Era UUPS proxy was deployed to 0xB8385002d6CC2fD5F980f45602cbd156FdFe00e9

