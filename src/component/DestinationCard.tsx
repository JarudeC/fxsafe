import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  image: string;    // e.g. "/flags/ph.png"
  name: string;     // e.g. "Philippines"
  currency: string; // e.g. "Receive PHP (IOU)"
}

export default function DestinationCard({ image, name, currency }: Props) {
  const isPhilippines = name.toLowerCase().includes("philippines");

  const CardContent = (
    <div className="relative flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden p-6 shadow-md hover:shadow-xl transition duration-300 min-w-[260px] max-w-xs w-full">
      {/* Flag */}
      <img
        src={image}
        alt={`${name} flag`}
        className="w-16 h-16 object-cover rounded-full shadow mb-4 border border-white/20"
      />

      {/* Info */}
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-sm text-white/80 mb-4">{currency}</p>

      {/* CTA */}
      <div className="flex items-center gap-2 text-sm text-blue-300 hover:text-white font-medium transition">
        <span>Send Now</span>
        <FaArrowRight />
      </div>
    </div>
  );

  return isPhilippines ? (
    <Link href="/send/ph" className="block">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}