import { NextResponse } from "next/server";
import xrpl from "xrpl";

// Disable cache in Next.js server functions
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { destination, destinationTag, amountUsd } = await req.json();

    // Validate input
    if (!destination || !amountUsd) {
      return NextResponse.json({ status: "error", message: "Missing required fields." }, { status: 400 });
    }

    // XRPL setup
    const client = new xrpl.Client(process.env.XRPL_NETWORK!);
    await client.connect();

    const wallet = xrpl.Wallet.fromSeed(process.env.XRPL_SECRET!);
    const drops = xrpl.xrpToDrops(amountUsd); // convert to drops

    const tx: xrpl.Payment = {
      TransactionType: "Payment",
      Account: wallet.address,
      Destination: destination,
      Amount: drops,
      ...(destinationTag ? { DestinationTag: parseInt(destinationTag) } : {}),
    };

    const prepared = await client.autofill(tx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);

    await client.disconnect();

    // Handle success
    if (
      typeof result.result.meta === "object" &&
      result.result.meta !== null &&
      "TransactionResult" in result.result.meta &&
      result.result.meta.TransactionResult === "tesSUCCESS"
    ) {
      return NextResponse.json({
        status: "success",
        txHash: result.result.hash,
      });
    } else {
      return NextResponse.json({
        status: "error",
        reason: result.result.meta && typeof result.result.meta === "object" ? result.result.meta.TransactionResult : "Unknown error",
      });
    }
  } catch (err) {
    console.error("XRPL error:", err);
    return NextResponse.json({ status: "error", message: (err as Error).message });
  }
}
