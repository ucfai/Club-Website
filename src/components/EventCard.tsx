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
        flex w-full flex-col items-center justify-center
        max-w-4xl
        md:min-h-[50vh]
        md:max-h-[640px]
        rounded-3xl
        border border-white/10
        bg-white/[0.07]
        backdrop-blur-sm
        p-8 sm:p-11 md:p-14
        text-white
        font-['Montserrat']
        gap-5 md:gap-6
        mx-auto
      "
    >
      <h2 className="text-center text-3xl sm:text-4xl md:text-[2.8rem] font-extrabold uppercase tracking-wide whitespace-normal break-words font-['Bungee'] leading-tight">
        {event.name}
      </h2>

      <p className="text-lg sm:text-2xl md:text-[1.7rem] text-center text-white/80 whitespace-normal break-words font-semibold">
        {event.location}
      </p>

      <p className="text-center text-base sm:text-lg text-white/70 max-w-2xl whitespace-normal break-words leading-relaxed">
        {event.description}
      </p>

      <div
        className="
          mt-5 md:mt-7 flex overflow-hidden
          rounded-2xl border border-white/10
          bg-white/15
          backdrop-blur-sm
          divide-x divide-white/15
        "
      >
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.mins },
          { label: "Seconds", value: timeLeft.secs },
        ].map((unit) => (
          <div key={unit.label} className="flex min-w-[82px] sm:min-w-[108px] md:min-w-[118px] flex-col items-center px-4 py-3 sm:px-6 sm:py-4 md:px-7 md:py-5">
            <span className="text-4xl sm:text-5xl md:text-[3.4rem] font-extrabold leading-none font-['Bungee']">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-2 text-xs sm:text-sm uppercase tracking-wide text-white/75 font-['Bungee']">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}