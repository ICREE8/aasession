"use client";

import Image from "next/image";
import { ConnectButton, useReadContract, useActiveAccount } from "thirdweb/react";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains"
import { getContract } from "thirdweb";
import { getAllActiveSigners } from "thirdweb/extensions/erc4337";
import { claimTo } from "thirdweb/extensions/erc721";


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
    </div >
  );
}
