import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

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
        flex flex-col items-center justify-between
        w-full max-w-5xl
        min-h-[380px] sm:min-h-[500px] lg:min-h-[620px]
        bg-white/[0.15]
        rounded-2xl sm:rounded-[28px]
        px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12
        text-white
        mx-auto mt-6 mb-8 sm:mt-8 sm:mb-10
        border border-white/20
      "
    >
      {/* Content Section */}
      <div className="flex flex-col items-center text-center w-full gap-3 sm:gap-4 lg:gap-4 pt-3 sm:pt-10 lg:pt-15">
        <h2 className="font-bungee text-3xl sm:text-3xl lg:text-4xl uppercase tracking-wide break-words">
          {event.name}
        </h2>

        <p className="font-montserrat text-2xl sm:text-2xl lg:text-3xl pt-5 opacity-90">
          {event.time}
        </p>

        <p className="font-montserrat text-lg sm:text-xl lg:text-2xl italic opacity-90">
          {event.location}
        </p>
      </div>

      {/* Countdown Section */}
      <div className="w-[92%] sm:w-[88%] lg:w-[84%] max-w-4xl lg:max-w-[40vw] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-white/[0.20]">
        <div className="grid grid-cols-3 divide-x divide-white/20">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.mins },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center justify-center py-4 sm:py-6 lg:py-7">
              <span className="font-bungee text-2xl sm:text-3xl lg:text-4xl leading-none">
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="font-inria mt-1 sm:mt-2 lg:mt-2 text-xs sm:text-base lg:text-xl opacity-85 tracking-wide">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href={event.links[0]?.url ?? "#"}
        target={event.links[0]?.url ? "_blank" : undefined}
        rel={event.links[0]?.url ? "noreferrer" : undefined}
        className="font-montserrat pb-1 inline-flex translate-y-3 items-center gap-2 text-base sm:text-lg opacity-90 transition hover:opacity-100"
      >
        <Icon icon="heroicons-outline:external-link" className="h-5 w-5" aria-hidden="true" />
        More Information
      </a>
    </div>
  );
}