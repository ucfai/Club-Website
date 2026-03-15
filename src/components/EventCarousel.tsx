import React, { useRef, useState } from "react";
import CountdownCard from "./EventCard";

type Event = {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  links: { type: string; url: string }[];
};

export default function CountdownCarousel({ events }: { events: Event[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");  // added for different animations for left vs right
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const hasEvents = events.length > 0;
  const hasMultiple = events.length > 1;
  const transitionMs = 200;

  const changeIndex = (newIndex: number) => {
    if (!hasMultiple || isAnimating || newIndex === index) return;

    setIsAnimating(true);

    setTimeout(() => {
      setIndex(newIndex);
      setIsAnimating(false);
    }, transitionMs);
  };

  const next = () => {
    setDirection("right");
    changeIndex((index + 1) % events.length);
  };

  const prev = () => {
    setDirection("left");
    changeIndex((index - 1 + events.length) % events.length);
  }
    

  // Touch
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
    }

    touchStartX.current = null;
  };

  if (!hasEvents) {
    return (
      <div className="w-full py-6 text-center text-white/80">
        No upcoming events yet.
      </div>
    );
  }

  const animationClass = isAnimating
    ? direction === "right" 
      ? "opacity-0 -translate-x-4"
      : "opacity-0 translate-x-4"
    : "opacity-100 translate-x-0";

  return (
    <section className="w-full py-6">
      <div
        className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-3 sm:px-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Desktop (changed breakpoint to md) */}
        <div className="hidden w-full items-center justify-center gap-3 md:flex"> 
          {/* LEFT TRIANGLE */}
          <button
            onClick={prev}
            disabled={!hasMultiple}
            className="inline-flex h-24 w-12 items-center justify-center disabled:opacity-30"
          >
            <span className="block h-0 w-0 border-y-[34px] border-r-[22px] border-y-transparent border-r-white/55" />
          </button>

          <div
            className={`flex-1 transition-all duration-200 ease-out ${animationClass}`}
          >
            <CountdownCard event={events[index]} />
          </div>

          {/* RIGHT TRIANGLE */}
          <button
            onClick={next}
            disabled={!hasMultiple}
            className="inline-flex h-24 w-12 items-center justify-center disabled:opacity-30"
          >
            <span className="block h-0 w-0 border-y-[34px] border-l-[22px] border-y-transparent border-l-white/55" />
          </button>
        </div>

        {/* Mobile  (changed breakpoint to md) */}
        <div
          className={`w-full transition-all duration-200 ease-out md:hidden ${animationClass}`}
        >
          <CountdownCard event={events[index]} />
        </div>

        {/* Indicators */}
        {hasMultiple && (
          <div className="mt-1 flex gap-2">
            {events.map((event, i) => (
              <button
                key={event.id}
                onClick={() => changeIndex(i)}
                disabled={isAnimating}
                className={`h-2.5 rounded-full transition ${
                  i === index
                    ? "w-7 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}