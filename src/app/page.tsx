import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { baseSepolia } from "thirdweb/chains"

export default function Home() {
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
