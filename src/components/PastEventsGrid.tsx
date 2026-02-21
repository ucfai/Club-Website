import React from "react";

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

export default function PastEventsGrid({ pastEvents }: { pastEvents: Event[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-12 mb-6 px-4">
      <h1 className="text-4xl text-yellow-500 text-shadow-lg font-bold text-center mt-10 mb-20">Past Events</h1>

      <div className="grid gap-8 
                      grid-cols-1
                      sm:grid-cols-2 
                      md:grid-cols-3 
                      lg:grid-cols-4">
        {pastEvents.map((ev) => (
          <div key={ev.id} className="bg-white/10 rounded-xl shadow p-4 flex flex-col">
            
            {/* Image */}
            <img
              src={ev.image}
              alt={ev.name}
              className="w-full h-40 object-cover rounded-lg"
            />

            {/* Title */}
            <h3 className="text-lg font-semibold mt-3">{ev.name}</h3>

            {/* Date + location */}
            <p className="text-sm text-gray-500">{ev.date}</p>
            <p className="text-sm text-gray-600">{ev.location}</p>

          </div>
        ))}
      </div>
    </div>
  );
}