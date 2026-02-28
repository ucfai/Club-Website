import React, { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  mins: number;
  secs: number;
};

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

function parseEventDate(dateStr: string, timeStr: string): Date {
  const startTime = timeStr.split(" - ")[0];
  const convertTo24Hour = (time: string) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  };
  return new Date(`${dateStr}T${convertTo24Hour(startTime)}`);
}

export default function CountdownCard({ event }: { event: Event }) {
  const target = parseEventDate(event.date, event.time);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, mins, secs });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div
      className="
        flex flex-col items-center justify-center
        w-full max-w-5xl
        min-h-[360px] sm:min-h-[460px] lg:min-h-[580px]
        bg-white/[0.15]
        rounded-2xl sm:rounded-[28px]
        px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12
        text-white
        mx-auto mt-6 mb-8 sm:mt-8 sm:mb-10
        border border-white/20
      "
    >
      {/* Content Section */}
      <div className="flex flex-col items-center text-center w-full gap-4 sm:gap-4 lg:gap-4">
        <h2 className="font-bungee text-4xl sm:text-4xl lg:text-5xl uppercase tracking-wide break-words">
          {event.name}
        </h2>

        <p className="font-montserrat text-3xl sm:text-3xl lg:text-4xl opacity-90">
          {event.location}
        </p>
      </div>

      {/* Countdown Section */}
      <div className="mt-8 sm:mt-10 lg:mt-14 w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white/[0.20]">
        <div className="grid grid-cols-4 divide-x divide-white/20">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.mins },
            { label: "Seconds", value: timeLeft.secs },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center justify-center py-4 sm:py-6 lg:py-7">
              <span className="font-bungee text-3xl sm:text-4xl lg:text-5xl leading-none">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="font-inria mt-1 sm:mt-2 lg:mt-2 text-sm sm:text-lg lg:text-2xl opacity-85 tracking-wide">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}