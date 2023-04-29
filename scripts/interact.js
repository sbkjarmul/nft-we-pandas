const GOERLI_API_KEY = process.env.GOERLI_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const GOERLI_CONTRACT_ADDRESS = process.env.GOERLI_CONTRACT_ADDRESS;
const IPFS_METADATA_URL = process.env.IPFS_METADATA_URL;

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = "goerli"),
  GOERLI_API_KEY
);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const nftContract = new ethers.Contract(
  GOERLI_CONTRACT_ADDRESS,
  contract.abi,
  signer
);

async function main() {
  const message = await nftContract.name();
  console.log("The name is: " + message);

  alchemyProvider.getBalance(PUBLIC_KEY).then((balance) => {
    const balanceInEth = ethers.utils.formatEther(balance);
    console.log(`balance: ${balanceInEth} ETH`);
  });

  const nftResult = await nftContract.mintNFT(PUBLIC_KEY, IPFS_METADATA_URL, {
    value: 11,
    gasLimit: 500_000,
  });
  console.log(nftResult);
}
main();
