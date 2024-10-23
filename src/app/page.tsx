"useActiveAccount";

import Image from "next/image";
import { TransactionButton, ConnectButton, useReadContract, useActiveAccount } from "thirdweb/react";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains"
import { getContract } from "thirdweb";
import { getAllActiveSigners } from "thirdweb/extensions/erc4337";
import { claimTo } from "thirdweb/extensions/erc721";
import { addSessionKey } from "thirdweb/extensions/erc4337";
import { Account } from "thirdweb/wallets";

export default function Home() {
  const smartWallet = useActiveAccount();
  const quantity = BigInt(1);

  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: smartWallet?.address as string,
  });

  const { data: activeSigners } = useReadContract(
    getAllActiveSigners, { contract: contract, });
  console.log(activeSigners);


  const claimNFT = async () => {
    try {
      const response = await fetch("/api/claimNFT", {
        method: "POST",
        body: JSON.stringify({
          address: smartWallet?.address as string,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("NFT claimed!");
      } else {
        alert("Failed to claim NFT");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <ConnectButton
        client={client}
        accountAbstraction={{
          chain: baseSepolia,
          sponsorGas: true,
        }}
      />
      <TransactionButton
        transaction={() => claimTo({
          contract: getContract({
            client: client,
            chain: baseSepolia,
            address: "0x1A028983B6CC9ec94F804F4e1085D04276d3f0E9"
          }),
          to: smartWallet?.address as string,
          quantity: quantity,
        })}
        onError={(error: any) => {
          console.error(error);
        }}
        onTransactionConfirmed={async () =>
          alert("NFT Claimed Successfully!")}
      >
        CLAIM NFT
      </TransactionButton>
      <TransactionButton
        transaction={() => addSessionKey({
          contract: contract,
          account: smartWallet as Account,
          sessionKeyAddress: "0x4Ff9aa707AE1eAeb40E581DF2cf4e14AffcC553d",
          permissions: {
            approvedTargets: "*",
            nativeTokenLimitPerTransaction: 0.05,
            permissionStartTimestamp: new Date(),
            permissionEndTimestamp: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          }

        })}
        onError={(error) => {
          console.error(error);
        }}
        onTransactionConfirmed={async () => alert("Session Key Added!")}
      >
        Add Session Key
      </TransactionButton>
    </div >
  );
}
