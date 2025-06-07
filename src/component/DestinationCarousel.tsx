"use client";
import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DestinationCard from './DestinationCard';

interface Destination {
  image: string;
  name: string;
  tagline: string;
}

const CARD_WIDTH = 320; // px
const GAP = 16; // px (gap-4)

export default function DestinationCarousel({ destinations }: { destinations: Destination[] }) {
  const [index, setIndex] = useState(destinations.length); // Start at the first "real" item
  const [cardsToShow, setCardsToShow] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create infinite loop by duplicating destinations
  const infiniteDestinations = [
    ...destinations,
    ...destinations,
    ...destinations,
  ];

  // Responsive cardsToShow: max 4 per screen
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      const maxCards = Math.floor(screenWidth / (CARD_WIDTH + GAP));
      setCardsToShow(Math.min(maxCards, 4)); // Max 4 cards
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex(i => i - 1);
  };

  const goRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex(i => i + 1);
  };

  // Handle infinite loop transitions
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      if (index >= destinations.length * 2) {
        setIndex(destinations.length);
      } else if (index < destinations.length) {
        setIndex(destinations.length * 2 - 1);
      }
      setIsTransitioning(false);
    }, 500); // Match the transition duration

    return () => clearTimeout(timer);
  }, [index, isTransitioning, destinations.length]);

  const maxIndex = infiniteDestinations.length - cardsToShow;
  const boundedIndex = Math.min(Math.max(index, 0), maxIndex);
  const translateX = -(boundedIndex * (CARD_WIDTH + GAP));

  return (
    <div className="relative w-full overflow-hidden">
      {/* Arrows */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        onClick={goLeft}
        aria-label="Previous"
        style={{ display: destinations.length <= cardsToShow ? 'none' : undefined }}
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
        onClick={goRight}
        aria-label="Next"
        style={{ display: destinations.length <= cardsToShow ? 'none' : undefined }}
      >
        <FaChevronRight size={20} />
      </button>

      {/* Cards Row */}
      <div ref={containerRef} className="w-full">
        <div
          className={`flex gap-4 ${isTransitioning ? 'transition-transform duration-500' : ''}`}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {infiniteDestinations.map((dest, i) => (
            <div
              key={dest.name + i}
              style={{ width: `${CARD_WIDTH}px`, minWidth: `${CARD_WIDTH}px` }}
              className="flex-shrink-0 py-4 group"
            >
              <div className="h-full w-full group-hover:z-10 relative">
                <DestinationCard {...dest} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
