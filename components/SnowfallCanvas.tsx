// @ts-nocheck

import React, { useEffect, useRef } from "react";

import { useDarkMode } from "@context/darkModeContext";

const SnowfallCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const c = canvasRef.current;
      const $ = c.getContext("2d");
      let w = window.innerWidth;
      let h = window.innerHeight;

      const Snowy = () => {
        let snow;
        const arr = [];
        const num = 1000,
          tsc = 1,
          sp = 1;
        const sc = 1.3,
          mv = 20,
          min = 1;

        const Flake = function () {
          this.draw = function () {
            this.g = $.createRadialGradient(
              this.x,
              this.y,
              0,
              this.x,
              this.y,
              this.sz
            );
            this.g.addColorStop(0, "rgba(255,255,255,1)");
            this.g.addColorStop(1, "rgba(255,255,255,0)");
            $.moveTo(this.x, this.y);
            $.fillStyle = this.g;
            $.beginPath();
            $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
            $.fill();
          };
        };

        for (let i = 0; i < num; ++i) {
          snow = new Flake();
          snow.y = Math.random() * (h + 50);
          snow.x = Math.random() * w;
          snow.t = Math.random() * (Math.PI * 2);
          snow.sz = (100 / (10 + Math.random() * 100)) * sc;
          snow.sp = Math.pow(snow.sz * 0.8, 2) * 0.15 * sp;
          snow.sp = snow.sp < min ? min : snow.sp;
          arr.push(snow);
        }

        const go = () => {
          window.requestAnimationFrame(go);
          $.clearRect(0, 0, w, h);
          // $.fillStyle = "rgba(0,0,0, 1)"; // - add background color
          $.fillRect(0, 0, w, h);
          $.fill();

          for (let i = 0; i < arr.length; ++i) {
            const f = arr[i];
            f.t += 0.05;
            f.t = f.t >= Math.PI * 2 ? 0 : f.t;
            f.y += f.sp;
            f.x += Math.sin(f.t * tsc) * (f.sz * 0.3);
            if (f.y > h + 50) f.y = -10 - Math.random() * mv;
            if (f.x > w + mv) f.x = -mv;
            if (f.x < -mv) f.x = w + mv;
            f.draw();
          }
        };
        go();
      };

      window.addEventListener(
        "resize",
        () => {
          if (c) {
            w = window.innerWidth;
            h = window.innerHeight;
            c.width = w;
            c.height = h;
          }
        },
        false
      );

      Snowy();
    }
  }, []);

  const canvasStyles: React.CSSProperties = {
    backgroundColor: "transparent",
    margin: 0,
    overflow: "hidden",
    fontFamily: "'Molle', cursive",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: -1,
  };

  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 100000,
        pointerEvents: "none",
      }}
    >
      <canvas
        className="w-full h-full"
        ref={canvasRef}
        id="canv"
        style={canvasStyles}
      ></canvas>
    </div>
  );
};

export default SnowfallCanvas;
