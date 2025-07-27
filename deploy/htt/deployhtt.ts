import { ethers, upgrades } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory(
    "HTT"
  );
  const recipient = "0x03ADEC4FaDEef145a1719777fF83334e0bc1A100";
  const initialAuthority = "0x03ADEC4FaDEef145a1719777fF83334e0bc1A100";

  const htt = await upgrades.deployProxy(
    factory,
    [recipient, initialAuthority],
    { initializer: "initialize" }
  );

  await htt.waitForDeployment();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });