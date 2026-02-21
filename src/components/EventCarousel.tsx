import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in-start">("idle");
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const outTimerRef = useRef<number | null>(null);
  const unlockTimerRef = useRef<number | null>(null);
  const rafOneRef = useRef<number | null>(null);
  const rafTwoRef = useRef<number | null>(null);

  const transitionMs = 220;
  const hasEvents = events.length > 0;
  const hasMultipleEvents = events.length > 1;

  useEffect(() => {
    if (!hasEvents) {
      setDisplayIndex(0);
      return;
    }

    if (displayIndex >= events.length) {
      setDisplayIndex(0);
    }
  }, [displayIndex, events.length, hasEvents]);

  useEffect(() => {
    return () => {
      if (outTimerRef.current) window.clearTimeout(outTimerRef.current);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      if (rafOneRef.current) window.cancelAnimationFrame(rafOneRef.current);
      if (rafTwoRef.current) window.cancelAnimationFrame(rafTwoRef.current);
    };
  }, []);

  const animateTo = useCallback(
    (targetIndex: number, nextDirection: 1 | -1) => {
      if (!hasMultipleEvents || isAnimating || targetIndex === displayIndex) return;

      setIsAnimating(true);
      setDirection(nextDirection);
      setPhase("out");

      if (outTimerRef.current) window.clearTimeout(outTimerRef.current);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);

      outTimerRef.current = window.setTimeout(() => {
        setDisplayIndex(targetIndex);
        setPhase("in-start");

        rafOneRef.current = window.requestAnimationFrame(() => {
          rafTwoRef.current = window.requestAnimationFrame(() => {
            setPhase("idle");
          });
        });

        unlockTimerRef.current = window.setTimeout(() => {
          setIsAnimating(false);
        }, transitionMs);
      }, transitionMs);
    },
    [displayIndex, hasMultipleEvents, isAnimating]
  );

  const next = useCallback(() => {
    if (!hasMultipleEvents) return;
    animateTo((displayIndex + 1) % events.length, 1);
  }, [animateTo, displayIndex, events.length, hasMultipleEvents]);

  const prev = useCallback(() => {
    if (!hasMultipleEvents) return;
    animateTo((displayIndex - 1 + events.length) % events.length, -1);
  }, [animateTo, displayIndex, events.length, hasMultipleEvents]);

  const goToIndex = useCallback(
    (targetIndex: number) => {
      if (!hasMultipleEvents || targetIndex === displayIndex || isAnimating) return;

      const nextDirection: 1 | -1 =
        displayIndex === events.length - 1 && targetIndex === 0
          ? 1
          : displayIndex === 0 && targetIndex === events.length - 1
            ? -1
            : targetIndex > displayIndex
              ? 1
              : -1;

      animateTo(targetIndex, nextDirection);
    },
    [animateTo, displayIndex, events.length, hasMultipleEvents, isAnimating]
  );

  useEffect(() => {
    if (!hasEvents) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasEvents, next, prev]);

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (typeof touchEndX !== "number") {
      touchStartX.current = null;
      return;
    }

    const deltaX = touchStartX.current - touchEndX;
    const swipeThreshold = 40;

    if (Math.abs(deltaX) < swipeThreshold) return;
    if (deltaX > 0) next();
    else prev();

    touchStartX.current = null;
  };

  if (!hasEvents) {
    return (
      <div className="w-full py-6 text-center text-white/80">
        No upcoming events yet.
      </div>
    );
  }

  let cardAnimationClass = "translate-x-0 opacity-100";

  if (phase === "out") {
    if (direction === 1) {
      cardAnimationClass = "-translate-x-6 opacity-0";
    } else {
      cardAnimationClass = "translate-x-6 opacity-0";
    }
  } else if (phase === "in-start") {
    if (direction === 1) {
      cardAnimationClass = "translate-x-6 opacity-0";
    } else {
      cardAnimationClass = "-translate-x-6 opacity-0";
    }
  }

  return (
    <section className="w-full py-6" aria-label="Event carousel">
      <div
        className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-3 sm:px-4"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="hidden w-full items-center justify-center gap-3 md:gap-4 sm:flex">
          <button
            onClick={prev}
            aria-label="Previous event"
            disabled={!hasMultipleEvents}
            className="
              inline-flex h-24 w-12 items-center justify-center
              transition-opacity hover:opacity-95
              disabled:cursor-not-allowed disabled:opacity-30
            "
          >
            <span
              aria-hidden="true"
              className="
                block h-0 w-0
                border-y-[34px] border-r-[22px] border-y-transparent border-r-white/55
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]
              "
            />
          </button>

          <div className={`min-w-0 flex-1 transform-gpu transition-all duration-200 ease-out ${cardAnimationClass}`}>
            <CountdownCard event={events[displayIndex]} />
          </div>

          <button
            onClick={next}
            aria-label="Next event"
            disabled={!hasMultipleEvents}
            className="
              inline-flex h-24 w-12 items-center justify-center
              transition-opacity hover:opacity-95
              disabled:cursor-not-allowed disabled:opacity-30
            "
          >
            <span
              aria-hidden="true"
              className="
                block h-0 w-0
                border-y-[34px] border-l-[22px] border-y-transparent border-l-white/55
                drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]
              "
            />
          </button>
        </div>

        <div className={`w-full transform-gpu transition-all duration-200 ease-out sm:hidden ${cardAnimationClass}`}>
          <CountdownCard event={events[displayIndex]} />
        </div>

        {hasMultipleEvents && (
          <div className="mt-1 flex items-center gap-2" aria-label="Event indicators">
            {events.map((event, index) => (
              <button
                key={event.id}
                type="button"
                aria-label={`Go to event ${index + 1}`}
                onClick={() => goToIndex(index)}
                disabled={isAnimating}
                aria-current={index === displayIndex ? "true" : undefined}
                className={`h-2.5 rounded-full transition ${
                  index === displayIndex
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
