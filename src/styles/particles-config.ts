import type { ISourceOptions } from "@tsparticles/engine";

const config: ISourceOptions = {
  background: {
    color: { value: "#000000" },
  },

  fpsLimit: 30,

  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
        width: 800,
        height: 800,
      },
    },

    color: { value: "#cba725" },

    shape: {
      type: "circle",
    },

    opacity: { value: 0.7 },

    size: { value: { min: 1, max: 2 } },

    links: {
      enable: true,
      distance: 100,
      color: "#856d15",
      opacity: 0.5,
      width: 2,
    },

    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      outModes: { default: "out" },
    },
  },

  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "repulse" },
    },

    modes: {
      grab: {
        distance: 120,
        links: { opacity: 0.7 },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: { distance: 150, duration: 0.3 },
      push: { quantity: 4 },
      remove: { quantity: 2 },
    },
  },

  detectRetina: true,
};

export default config;
