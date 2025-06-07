"use client";

import Navbar from "@/component/Navbar";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

export default function SendToPhilippinesPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    senderName: "",
    recipientName: "",
    destination: "",
    destinationTag: "",
    amountUsd: "",
    payMethod: "xrpl",
  });

  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=PHP");
        const data = await res.json();
        setConversionRate(data.rates.PHP);
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        setConversionRate(56.23); // fallback
      }
    };

    fetchRate();
  }, []);

  const estimatedPhp =
    conversionRate && form.amountUsd && !isNaN(Number(form.amountUsd))
      ? (parseFloat(form.amountUsd) * conversionRate).toFixed(2)
      : "0.00";

  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "#888",
      color: "white",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#aaa",
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "white",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#000",
      color: "white",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused ? "#1F2937" : "#000",
      color: "white",
      cursor: "pointer",
    }),
    input: (base: any) => ({
      ...base,
      color: "white",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      color: "white",
      "&:hover": {
        color: "#ccc",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "white",
    }),
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  function isValidXrplAddress(address: string): boolean {
    return /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(address);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidXrplAddress(form.destination)) {
      setAlertMessage("Invalid XRPL address. Please check and try again.");
      setShowAlert(true);
      return;
    }

    const res = await fetch("/api/send-xrpl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: form.destination,
        destinationTag: form.destinationTag ? parseInt(form.destinationTag) : undefined,
        amountUsd: form.amountUsd,
        currency: "XRP",
      }),
    });

    const data = await res.json();
    if (data.status === "success") {
      router.push(`/send/ph/success?txHash=${data.txHash}`);
    } else {
      setAlertMessage("Failed to send transaction. Please try again.");
      setShowAlert(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white">
      <Navbar />

      {/* Toast Alert */}
      {showAlert && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 font-bold px-6 py-4 rounded shadow-lg z-50">
          <div className="flex justify-between items-center gap-4">
            <span>{alertMessage}</span>
            <button onClick={() => setShowAlert(false)} className="text-red-700 hover:text-red-900 text-lg">
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-24">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/10"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Send Money to the Philippines 🇵🇭
          </h1>
          <p className="text-white/70 mb-6">
            Transfer <strong>XRP</strong> directly on the XRPL to any wallet address in real-time.
          </p>

          <div className="flex flex-col">
            <label htmlFor="senderName" className="mb-1 text-white/90">Your Name</label>
            <input
              id="senderName"
              name="senderName"
              required
              value={form.senderName}
              onChange={handleChange}
              className="bg-white/10 border border-white/50 text-white rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="recipientName" className="mb-1 text-white/90">Recipient's Name</label>
            <input
              id="recipientName"
              name="recipientName"
              required
              value={form.recipientName}
              onChange={handleChange}
              className="bg-white/10 border border-white/50 text-white rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="destination" className="mb-1 text-white/90">Recipient XRPL Address</label>
            <input
              id="destination"
              name="destination"
              required
              placeholder="rXXXXXXXXXXXXXXXXXXXXXXXX"
              value={form.destination}
              onChange={handleChange}
              className="bg-white/10 border border-white/50 text-white rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="destinationTag" className="mb-1 text-white/90">Destination Tag (Optional)</label>
            <input
              id="destinationTag"
              name="destinationTag"
              placeholder="e.g. 123456"
              value={form.destinationTag}
              onChange={handleChange}
              className="bg-white/10 border border-white/50 text-white rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amountUsd" className="mb-1 text-white/90">Amount in USD</label>
            <input
              id="amountUsd"
              name="amountUsd"
              type="text"
              inputMode="decimal"
              required
              value={form.amountUsd}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                  setForm({ ...form, amountUsd: value });
                }
              }}
              className="bg-white/10 border border-white/50 text-white rounded-md px-4 py-2"
            />
            <p className="text-sm text-white/60 mt-1">
              ≈ <span className="font-semibold">{estimatedPhp} PHP</span> (est.)
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00C9A7] to-[#007BFF] hover:opacity-90 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Now
          </button>
        </form>
      </div>
    </div>
  );
}
