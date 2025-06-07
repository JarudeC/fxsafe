"use client";
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="pt-24 pb-10 flex justify-center">
        <div className="relative w-full max-w-6xl rounded-3xl shadow-2xl mx-4 px-6 py-16 text-center overflow-hidden min-h-[400px] bg-gradient-to-br from-[#0F0C29] via-[#302B63] to-[#24243E]">
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Welcome to Your Dashboard
            </h1>
            <p className="text-white text-lg md:text-xl mb-8 max-w-xl font-medium">
              Track your transactions and manage your cross-border payments
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Total Sent</h3>
                <p className="text-3xl font-bold text-[#00C9A7]">₱250,000</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Monthly Transfers</h3>
                <p className="text-3xl font-bold text-[#007BFF]">3</p>
              </div>
              <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Saved in Fees</h3>
                <p className="text-3xl font-bold text-[#00C9A7]">₱12,500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original landing page hero for non-authenticated users
  const slide = {
    video: '/hero_vid.mp4',
    title: 'Send Money Home Instantly',
    subtitle: 'Stable. Transparent. Powered by RLUSD and XRPL.',
  };

  return (
    <div className="pt-24 pb-10 flex justify-center">
      <div className="relative w-full max-w-6xl rounded-3xl shadow-2xl mx-4 px-6 py-24 text-center overflow-hidden min-h-[500px]">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={slide.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">
            {slide.title}
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 max-w-xl font-medium">
            {slide.subtitle}
          </p>
          <button className="bg-gradient-to-r from-[#00C9A7] to-[#007BFF] hover:opacity-90 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-md transition-all duration-300">
            Try the Demo
          </button>
        </div>
      </div>
    </div>
  );
}