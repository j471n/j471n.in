import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import useDarkMode from "../../hooks/useDarkMode";

export default function TopContainer({ className, children }) {
  const { darkMode } = useDarkMode();
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const clr = darkMode ? "#fff" : "#222";
  return (
    <div
      className={`relative w-screen h-screen flex flex-col-reverse gap-10 md:gap-0 md:flex-row justify-center bg-gradient-to-b dark:!from-[#444] dark:!to-darkPrimary !to-white ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                // value: clr,
              },
            },
            fpsLimit: 244,
            interactivity: {
              events: {
                // onClick: {
                //   enable: true,
                //   mode: "push",
                // },
                // onHover: {
                //   enable: true,
                //   mode: "repulse",
                // },
                resize: true,
              },
              // modes: {
              //   push: {
              //     quantity: 4,
              //   },
              //   repulse: {
              //     distance: 200,
              //     duration: 0.4,
              //   },
              // },
            },
            particles: {
              color: {
                value: clr,
              },
              links: {
                color: clr,
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 30,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: false,
          }}
        />
      </div>
      {children}
    </div>
  );
}
