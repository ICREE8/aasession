import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains"
import { getContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";


export default function Home() {
  const smartWallet = useActiveAccount();

  const contract = getContract({
    client: client,
    chain: baseSepolia,
    address: smartWallet?.address as string,

  });

  return (
    <div className="flex justify-center items-center h-screen">
      <ConnectButton
        client={client}
        accountAbstraction={{
          chain: baseSepolia,
          sponsorGas: true,
        }}

      />
    </div>
  );
}
