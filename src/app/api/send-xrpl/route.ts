import { NextResponse } from "next/server";
import xrpl, { Client, Wallet, Payment, SubmitResponse } from "xrpl";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { destination, destinationTag, estimatedXrp } = await req.json();

    if (!destination || !estimatedXrp) {
      return NextResponse.json(
        { status: "error", reason: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ───── XRPL setup ───── */
    const client: Client = new xrpl.Client(process.env.XRPL_NETWORK!);
    await client.connect();

    const wallet: Wallet = xrpl.Wallet.fromSeed(process.env.XRPL_SECRET!);
    const drops = xrpl.xrpToDrops(estimatedXrp);      // XRP → drops

    const tx: Payment = {
      TransactionType: "Payment",
      Account       : wallet.address,
      Destination   : destination,
      Amount        : drops,
      ...(destinationTag && { DestinationTag: parseInt(destinationTag) }),
    };

    const prepared = await client.autofill(tx);
    const signed   = wallet.sign(prepared);
    const result: SubmitResponse = await client.submitAndWait(signed.tx_blob);
    await client.disconnect();

    /* ───── Determine success or failure ───── */
    const ledgerResult = (result.result as any).meta?.TransactionResult;   // string | undefined
    const engineResult = result.result.engine_result;                      // string | undefined
    const txHash       = (result.result as any).tx_json?.hash ?? signed.hash;

    const succeeded =
      ledgerResult === "tesSUCCESS" || engineResult === "tesSUCCESS";

    return NextResponse.json(
      succeeded
        ? { status: "success", txHash }
        : { status: "error", reason: ledgerResult ?? engineResult ?? "Unknown" }
    );

  } catch (err: any) {
    console.error("XRPL error:", err);
    return NextResponse.json({ status: "error", reason: err.message });
  }
}
