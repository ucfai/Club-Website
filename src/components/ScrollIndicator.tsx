import { FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";

const ScrollIndicator = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);

      if ((window as any).resumeParticles) {
        (window as any).resumeParticles();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });

    if ((window as any).resumeParticles) {
      (window as any).resumeParticles();
    }
  };

  if (!isTop) return null;

  return (
    <button
      onClick={scrollToNextSection}
      className="no-particles cursor-pointer fixed bottom-6 left-1/2 -translate-x-1/2 z-20 rounded-full animate-bounce [animation-duration:1.5s]"
    >
      <FaAngleDown className="w-13 h-13 text-[#F8D03F] hover:text-yellow-300" />
    </button>
  );
};

export default ScrollIndicator;
