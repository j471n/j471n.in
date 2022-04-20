
export default function TopContainer({className, children}) {
  return (
    <div
      className={`relative w-screen h-screen flex flex-col-reverse gap-10 md:gap-0 md:flex-row justify-center bg-gradient-to-b from-gray-400 dark:from-[#444] dark:to-darkPrimary to-white ${className}`}
    >
      {/* <div className="w-full md:w-1/2  grid place-items-center">
        <div className="text-center md:text-left my-7 md:my-0">
          <AnimatedText
            variants={opacityVariant}
            infinity={true}
            className="uppercase font-medium text-sm sm:text-base"
          >
            Hi there! I'm
          </AnimatedText>
          <AnimatedHeading
            variants={popUp}
            infinity={true}
            className="capitalize font-bold text-4xl sm:text-4xl lg:text-6xl 3xl:text-8xl text-purple-600"
          >
            Jatin Sharma
          </AnimatedHeading>
          <AnimatedText
            variants={opacityVariant}
            infinity={true}
            className="capitalize text-base sm:text-2xl font-thin font-merriweather"
          >
            React Developer
          </AnimatedText>

          <div className="flex gap-4 mt-4 md:mt-4 justify-center md:justify-start">
            <AnimatedButton
              variants={buttonsLinearVariant}
              infinity={true}
              className="px-2 py-1 transition-all font-medium relative hover:text-white z-10 before:-z-10 before:absolute before:inset-0 before:w-0.5 before:transition-all before:hover:w-full before:bg-purple-700 select-none"
              onClick={() => (window.location.href = "#view")}
            >
              About me
            </AnimatedButton>

            <AnimatedButton
              variants={buttonsLinearVariant}
              infinity={true}
              className="px-2 py-1 transition-all font-medium relative hover:text-white z-10 before:-z-10 before:absolute before:inset-0 before:w-0.5 before:transition-all before:hover:w-full before:bg-purple-700 select-none"
              onClick={() => (window.location.href = "#contact")}
            >
              Contact
            </AnimatedButton>
          </div>
        </div>
      </div> */}

      {/* <div className="w-full md:w-1/2 grid place-items-center">
        <AnimatedDiv
          variants={popUp}
          infinity={true}
          className="relative w-3/5 xs:w-1/3 sm:!2/5 md:!w-1/2 group"
        >
          <div
            className="absolute inset-0 bg-purple-800 animate-[spin_3s_linear_infinite]"
            style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
          ></div>
          <Image
            src={homeProfileImage}
            className="rounded-full shadow"
            layout="responsive"
            width={400}
            height={400}
            alt="cover Profile Image"
          />
        </AnimatedDiv>
      </div> */}
      {children}

      {/* <div className="absolute -bottom-1 left-0 right-0 h-[20%] bg-gradient-to-b from-transparent to-white z-10"></div> */}
    </div>
  );
}
