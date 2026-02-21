import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black/85 text-white sticky top-0 z-50 shadow-md repeat-y backdrop-blur-md">

      {/* Top bar — used on both desktop and mobile */} 
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo || Can replace this with img tag for the actual logo later on */}
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="AI@UCF Logo" className="h-10 w-10" />
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-wide"> AI </span>
            <span className="text-xl text-yellow-400 font-bold tracking-wide"> @UCF </span>
          </div>
        </div>

        {/* Desktop Links  */}
        <div className="hidden md:flex justify-center items-center flex-1">
          <div className="bg-neutral-900/90 rounded-full px-8 py-2 flex items-center justify-between w-[50%] max-w-xl">
            <a href="/" className="text-gray-300 hover:text-yellow-400 transition mx-4"> About </a>
            <p className="text-gray-500 dark:text-gray-400"> | </p>
            <a href="/events" className="text-gray-300 hover:text-yellow-400 transition mx-4"> Events </a>
            <p className="text-gray-500 dark:text-gray-400"> | </p>
            <a href="/projects" className="text-gray-300 hover:text-yellow-400 transition mx-4"> Projects</a>
          </div>
        </div>

        {/* Mobile version */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? 
          // close icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
           : 
           // hamburger menu icon
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"/>
          </svg>
          }
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 text-lg bg-black">
          <a href="/" className="hover:text-gray-300 transition">Home</a>
          <a href="/projects" className="hover:text-gray-300 transition">Projects</a>
          <a href="/about" className="hover:text-gray-300 transition">About</a>
        </div>
      )}
    </nav>
  );
}
