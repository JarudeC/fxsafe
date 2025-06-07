"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const txHash = searchParams.get("txHash");
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-900 text-white px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">✅ Transaction Successful!</h1>
        <p>Your funds have been sent using XRPL.</p>
        {txHash && <p className="mt-4 text-sm">Transaction Hash: {txHash}</p>}

        <button
          onClick={() => router.push("/")}
          className="mt-8 bg-white text-green-900 font-semibold px-6 py-3 rounded-full shadow hover:opacity-90 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}


