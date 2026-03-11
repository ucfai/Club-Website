import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const MobileNavbarButton = ({ currentPage }: { currentPage: string }) => {
  const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);

  const openSidenav = () => {
    setSidenavOpen(true);
  };

  const closeSidenav = () => {
    setSidenavOpen(false);

    if ((window as any).resumeParticles) {
      (window as any).resumeParticles();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 896 && sidenavOpen) {
        closeSidenav();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sidenavOpen]);

  return (
    <>
      <button
        className="no-particles cursor-pointer p-1.5 w-10 h-10 flex 0_5xl:hidden justify-center items-center bg-white hover:bg-gray-300 transition rounded-2xl"
        onClick={openSidenav}
      >
        <FaBars className="w-4.5 h-4.5 text-black my-auto" />
      </button>

      {sidenavOpen && (
        <>
          <div
            className="0_5xl:hidden fixed top-0 left-0 w-screen h-dvh z-30 opacity-80 bg-black"
            onClick={closeSidenav}
          />

          <div className="no-particles 0_5xl:hidden fixed flex flex-col justify-center items-center gap-10 px-7 py-10 top-0 right-0 z-50 max-w-80 w-3/4 h-dvh overflow-auto p-4 bg-[#0f0f0f] shadow-[0_2px_10px_#FFFFFF] font-inria-sans text-xl font-semibold tracking-wide">
            <button
              className="no-particles fixed top-6.5 right-6.5 cursor-pointer transition"
              aria-label="Close Button"
              onClick={closeSidenav}
            >
              <FaTimes className="w-7 h-7 text-white hover:text-gray-300 my-auto" />
            </button>

            <a
              href={currentPage !== "Home" ? "/" : "#"}
              onClick={(e) => {
                if (currentPage === "Home") {
                  e.preventDefault();
                  closeSidenav();
                }
              }}
              className={
                currentPage === "Home"
                  ? "text-[#F8D03F] hover:text-yellow-300"
                  : "text-white hover:text-gray-300"
              }
            >
              Home
            </a>
            <a
              href={currentPage !== "About" ? "/about" : "#"}
              onClick={(e) => {
                if (currentPage === "About") {
                  e.preventDefault();
                  closeSidenav();
                }
              }}
              className={
                currentPage === "About"
                  ? "text-[#F8D03F] hover:text-yellow-300"
                  : "text-white hover:text-gray-300"
              }
            >
              About
            </a>
            <a
              href={currentPage !== "Events" ? "/events" : "#"}
              onClick={(e) => {
                if (currentPage === "Events") {
                  e.preventDefault();
                  closeSidenav();
                }
              }}
              className={
                currentPage === "Events"
                  ? "text-[#F8D03F] hover:text-yellow-300"
                  : "text-white hover:text-gray-300"
              }
            >
              Events
            </a>
            <a
              href={currentPage !== "Projects" ? "/projects" : "#"}
              onClick={(e) => {
                if (currentPage === "Projects") {
                  e.preventDefault();
                  closeSidenav();
                }
              }}
              className={
                currentPage === "Projects"
                  ? "text-[#F8D03F] hover:text-yellow-300"
                  : "text-white hover:text-gray-300"
              }
            >
              Projects
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default MobileNavbarButton;
