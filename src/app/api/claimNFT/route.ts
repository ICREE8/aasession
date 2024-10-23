import { NextResponse } from "next/server";

const {
    BACKEND_WALLET_ADDRESS,
    ENGINE_URL,
    THIRDWEB_SECRET_KEY,
} = process.env;

export async function POST(request: Request) {
    const { address } = await request.json();

    if (
        !BACKEND_WALLET_ADDRESS ||
        !ENGINE_URL ||
        !THIRDWEB_SECRET_KEY
    ) {
        return new Response("Missing environment variables", { status: 500 });
    }
}
const response = await fetch(
    `${ENGINE_URL}/contract/84532/0x1A028983B6CC9ec94F804F4e1085D04276d3f0E9/erc721/claim-to`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${THIRDWEB_SECRET_KEY}`,
            "chain": "84532",
            "contractAddress": "0x1A028983B6CC9ec94F804F4e1085D04276d3f0E9",
            "x-account-address": address,
            "x-backend-wallet-address": BACKEND_WALLET_ADDRESS,
        },
        body: JSON.stringify({
            "receiver": address,
            "quantity": "1",
        }),
    }
);

if (response.ok) {
    const data = await response.json();

    return NextResponse.json({
        sucess: true,
        data: data,
    });
} else {
    return NextResponse.json({
        success: false,
        data: null,
    });
}
