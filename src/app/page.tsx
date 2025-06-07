"use client";

import Navbar from "../component/Navbar";
import DestinationCarousel from "../component/DestinationCarousel";
import HeroCarousel from "../component/HeroCarousel";
import DashboardStats from "../component/DashboardStats";
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E] text-white">
      <Navbar />
      <HeroCarousel />
      
      {isAuthenticated && <DashboardStats />}

      {/* What is FXSafe Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Send Money, Not Fees</h2>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          FXSafe lets you send RLUSD to family or friends abroad—converted instantly to local currency through XRPL's built-in AMM. No banks, no delays, no hidden fees.
        </p>
      </section>

      {/* Destination Carousel Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-left text-white">Send Money To These Countries</h2>
        <DestinationCarousel
          destinations={[
            {
              image: "philippines.jpg",
              name: "Philippines",
              tagline: "Receive in PHP (IOU)",
            },
            {
              image: "indonesia.jpg",
              name: "Indonesia",
              tagline: "Receive in IDR (IOU)",
            },
            {
              image: "malaysia.jpg",
              name: "Malaysia",
              tagline: "Receive in MYR (IOU)",
            },
            {
              image: "india.jpg",
              name: "India",
              tagline: "Receive in INR (IOU)",
            },
            {
              image: "bangladesh.svg",
              name: "Bangladesh",
              tagline: "Receive in BDT (IOU)",
            }
          ]}
        />
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-left text-white">What Our Early Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 hover:bg-white/20 transition rounded-xl shadow-lg p-6 backdrop-blur-sm">
            <div className="text-lg font-semibold mb-2">"Faster than banks"</div>
            <div className="text-white/80 mb-4">I sent RLUSD to my family in the Philippines. They received it in local PHP tokens in seconds.</div>
            <div className="text-white/60 text-sm">- Melissa, Dubai</div>
          </div>
          <div className="bg-white/10 hover:bg-white/20 transition rounded-xl shadow-lg p-6 backdrop-blur-sm">
            <div className="text-lg font-semibold mb-2">"No hidden charges"</div>
            <div className="text-white/80 mb-4">Used FXSafe to pay my helper's tuition directly. 100% transparent and easy to use.</div>
            <div className="text-white/60 text-sm">- Jianwei, Singapore</div>
          </div>
          <div className="bg-white/10 hover:bg-white/20 transition rounded-xl shadow-lg p-6 backdrop-blur-sm">
            <div className="text-lg font-semibold mb-2">"Just works"</div>
            <div className="text-white/80 mb-4">Feels like using PayNow, but for overseas. And I didn't lose 8% to banks or agencies.</div>
            <div className="text-white/60 text-sm">- Aditya, Malaysia</div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">Start Sending with FXSafe</h2>
        <p className="text-lg text-white/80 mb-8 text-center max-w-2xl">
          Get started with just your XRPL wallet. Try it on the testnet to see how fast and affordable cross-border payments can be.
        </p>
        <button className="bg-gradient-to-r from-[#00C9A7] to-[#007BFF] hover:opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-md transition-all duration-300">
          Connect Wallet & Try Demo
        </button>
      </section>
    </div>
  );
}
