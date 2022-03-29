import AnimatedText from "./FramerMotion/AnimatedText";

export default function VideoCover({ videoUrl, title, buttonText, children }) {
  return (
    <div className="relative w-screen h-[85vh] md:h-[92vh]">
      <video
        className="w-full h-full"
        src={videoUrl}
        autoPlay
        muted
        loop
      ></video>

      <div className="absolute inset-0 bg-black text-white mix-blend-multiply flex flex-col items-center px-5 justify-center select-none">
        <h1 className="capitalize font-bold text-4xl sm:text-6xl ">{title}</h1>
        {children}

        <button
          className="capitalize text-base sm:text-2xl font-thin font-merriweather border-b-2 border-transparent hover:border-gray-100 py-1 cursor-pointer"
          onClick={() => (window.location.href = "#view")}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
