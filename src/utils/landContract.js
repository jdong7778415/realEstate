import { ethers } from "ethers";
import contractABI from "../abi/MyLandContract.json";

const contractAddress = "0xf8e81D47203A594245E36C48e151709F0C19fBe8"; // 替换为你的合约地址

export async function transferLand(landBuyer, landID) {
  if (typeof window === "undefined" || !window.ethereum) {
    alert("please install MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const tx = await contract.transferLand(landBuyer, landID);
  await tx.wait();
  alert("The land has been transferred on the blockchain!");
}