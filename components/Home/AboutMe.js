import React from "react";
import { popUpFromBottomForText } from "../../content/FramerMotionVariants";
import { HomeHeading } from "../../pages";
import AnimatedText from "../FramerMotion/AnimatedText";
import Link from "next/link";

export default function AboutMe() {
  return (
    <section className="px-5 sm:px-20 sm:mx-20 text-md sm:text-base">
      <HomeHeading title="About Me" />
      <AnimatedText
        className="text-slate-500 dark:text-slate-400 font-medium"
        variants={popUpFromBottomForText}
      >
        Hi, welcome! I'm Jatin Sharma and I'm a self-taught React Developer 👋
        as I am currently perusing my Bachelor Degree in Computer Science. I
        wanted to learn the web development so desperately in my High School,
        then as the time passed I've managed to get all the resources i need to
        start this journey, I've watched so many tutorial followed so many
        articles and built some projects. I've also some learned other
        programming languages such as Python, C, C++, etc. In my future, I also
        want to dive in the Mobile Development as well as Backend Development. I
        am currently Learning many things and backend is one on them. In my
        spare time I also write blogs on{" "}
        <Link href="https://dev.to/j471n" passHref>
          <a className="text-purple-600 underline">Dev.to</a>
        </Link>{" "}
        about what I am learning or some tutorials as well. If you are
        interested then must visit. 👋
      </AnimatedText>
    </section>
  );
}
