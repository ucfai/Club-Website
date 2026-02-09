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
        flex flex-col items-center
        w-full max-w-2xl
        bg-white/4 
        rounded-2xl
        p-8 sm:p-10
        text-white
        gap-6
        mx-auto mt-10 mb-10
      "
    >
      <h2 className="text-center text-2xl sm:text-3xl font-bold">
        {event.name}
      </h2>

      <p className="text-sm sm:text-base text-center opacity-90 px-2">
        {event.description}
      </p>

      <p className="text-sm sm:text-base text-center opacity-80">
        {event.location}
      </p>

      <div
        className="
          bg-white/10 backdrop-blur-md
          rounded-xl
          px-6 py-4
          flex gap-8 sm:gap-12
          mt-4
        "
      >
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.mins },
          { label: "Seconds", value: timeLeft.secs },
        ].map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs sm:text-sm opacity-80 mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}