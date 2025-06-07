// /app/send/ph/success/page.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const txHash = searchParams.get("txHash");

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">✅ Transaction Successful!</h1>
        <p>Your funds have been sent using XRPL.</p>
        {txHash && <p className="mt-4 text-sm">Transaction Hash: {txHash}</p>}
      </div>
    </div>
  );
}

