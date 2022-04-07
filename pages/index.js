import Link from "next/link";
import Image from "next/image";
import ExploreMoreButton from "../components/Buttons/ExploreMoreButton";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import Metadata from "../components/MetaData";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";
import AnimatedText from "../components/FramerMotion/AnimatedText";
import {
  popUpFromBottomForText,
  headingFromLeft,
  opacityVariant,
  popUp,
} from "../content/FramerMotionVariants";
import AnimatedHeading from "../components/FramerMotion/AnimatedHeading";
import AnimatedDiv from "../components/FramerMotion/AnimatedDiv";
import AnimatedButton from "../components/FramerMotion/AnimatedButton";
import { MdVerified } from "react-icons/md";

// Static Data Import--------
import skills from "../content/skillsData";
import certificates from "../content/certificatesData";
import projects from "../content/projectData";
import socialMedia from "../content/socialMedia";
import faqs from "../content/faqData";
// Static Data END--------

export default function Home({ blogs }) {
  const buttonsLinearVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        velocity: 10,
      },
    },
  };
  return (
    <>
      <Metadata title="About" />
      <div className="dark:bg-darkPrimary dark:text-gray-100">
        {/* HomPage */}

        <div className="relative w-screen h-screen flex flex-col-reverse gap-10 md:gap-0 md:flex-row justify-center bg-gradient-to-b from-purple-300 dark:from-darkSecondary dark:to-darkPrimary to-white">
          <div className="w-full md:w-1/2 h- grid place-items-center">
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
                  className="px-2 py-1 transition-all font-medium relative hover:text-white z-10 before:-z-10 before:absolute before:inset-0 before:w-0.5 before:transition-all before:hover:w-full before:bg-purple-700"
                  onClick={() => (window.location.href = "#view")}
                >
                  About me
                </AnimatedButton>

                <AnimatedButton
                  variants={buttonsLinearVariant}
                  infinity={true}
                  className="px-2 py-1 transition-all font-medium relative hover:text-white z-10 before:-z-10 before:absolute before:inset-0 before:w-0.5 before:transition-all before:hover:w-full before:bg-purple-700"
                  onClick={() => (window.location.href = "#contact")}
                >
                  Contact
                </AnimatedButton>
              </div>
            </div>
            {/* <div></div> */}
          </div>

          <div className="w-full md:w-1/2 grid place-items-center">
            <AnimatedDiv
              variants={popUp}
              infinity={true}
              className="relative bg-purple-800 w-3/5 xs:w-1/3 sm:!2/5 md:!w-1/2"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
            >
              <Image
                src="https://imgur.com/mKrXwWF.png"
                className="rounded-full  shadow-purple-400"
                layout="responsive"
                width={400}
                height={400}
                alt="cover Profile Image"
                // priority={true}
              />
            </AnimatedDiv>
          </div>
        </div>

        <div id="view" className="pt-20">
          {/* About me */}
          <section className="px-5 sm:px-20 sm:mx-20 text-md sm:text-base">
            <HomeHeading title="About Me" />
            <AnimatedText
              className="text-slate-500 dark:text-slate-400 font-medium"
              variants={popUpFromBottomForText}
              infinity={true}
            >
              Hi, welcome! I'm Jatin Sharma and I'm a self-taught React
              Developer 👋 as I am currently perusing my Bachelor Degree in
              Computer Science. I wanted to learn the web development so
              desperately in my High School, then as the time passed I've
              managed to get all the resources i need to start this journey,
              I've watched so many tutorial followed so many articles and built
              some projects. I've also some learned other programming languages
              such as Python, C, C++, etc. In my future, I also want to dive in
              the Mobile Development as well as Backend Development. I am
              currently Learning many things and backend is one on them. In my
              spare time I also write blogs on{" "}
              <Link href="https://dev.to/j471n" passHref>
                <a className="text-purple-600 underline">Dev.to</a>
              </Link>{" "}
              about what I am learning or some tutorials as well. If you are
              interested then must visit. 👋
            </AnimatedText>
          </section>
          {/* Skills Section */}
          <section>
            <HomeHeading title="My Top ⚡kills" />

            <div className="snap-center flex gap-2 overflow-x-scroll no-scrollbar p-5 md:px-10">
              {skills.map((skill) => {
                if (!skill.pinned) return null;
                return (
                  <div
                    title={skill.name}
                    key={skill.id}
                    className="home-content-section flex items-center justify-between overflow-hidden  before:absolute before:h-full before:w-20 before:bg-purple-600 before:-right-4 before:-z-10 before:rotate-[20deg] before:scale-y-150 before:top-4 hover:before:scale-[7]   before:duration-500 "
                  >
                    <AnimatedDiv
                      variants={popUpFromBottomForText}
                      infinity={true}
                      className="flex items-center gap-2"
                    >
                      <div className="relative w-10 h-10">
                        <Image
                          width={50}
                          height={50}
                          alt={skill.name}
                          src={`/${skill.icon}`}
                        />
                      </div>

                      <p className="uppercase font-bold text-sm sm:text-base">
                        {skill.name}
                      </p>
                    </AnimatedDiv>
                    <AnimatedText
                      variants={opacityVariant}
                      infinity={true}
                      className="uppercase font-bold text-lg border-t-[3px] border-purple-100 text-purple-300 z-10"
                    >
                      {skill.level}
                    </AnimatedText>
                  </div>
                );
              })}
              <ExploreMoreButton link="/skills" />
            </div>
          </section>
          {/* Blogs Section */}
          <section>
            <HomeHeading title="Recent Blogs 👩‍💻" />
            <div className="home-section-container no-scrollbar">
              {blogs.map((blog) => {
                return (
                  <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
                    <div className="home-content-section hover-slide-animation">
                      <AnimatedDiv
                        variants={popUpFromBottomForText}
                        infinity={true}
                      >
                        <Image
                          className="hidden w-full h-full rounded-xl mb-3 cursor-pointer select-none"
                          src={blog.cover_image}
                          alt={blog.title}
                          width={500}
                          height={207}
                          layout="responsive"
                          quality="50"
                        />
                      </AnimatedDiv>
                      <AnimatedDiv
                        variants={popUpFromBottomForText}
                        infinity={true}
                        className="flex items-center justify-between my-3 text-sm sm:text-base"
                      >
                        <p className="flex items-center space-x-1">
                          <AiOutlineCalendar />
                          <span className="text-xs font-medium">
                            {new Date(Date.parse(blog.published_at))
                              .toDateString()
                              .slice(4)}
                          </span>
                        </p>
                        <p className="flex items-center space-x-1">
                          <BiTime />
                          <span className="text-xs ml-1 font-medium">
                            {blog.reading_time_minutes} mins
                          </span>
                        </p>
                      </AnimatedDiv>
                      <AnimatedHeading
                        variants={popUpFromBottomForText}
                        infinity={true}
                        className="text-base sm:text-lg mb-1 font-bold md:font-extrabold truncate text-slate-600 dark:text-slate-300"
                      >
                        {blog.title}
                      </AnimatedHeading>
                      <AnimatedText
                        variants={popUpFromBottomForText}
                        className="text-xs sm:text-sm truncate-3 text-slate-400 font-medium"
                        infinity={true}
                      >
                        {blog.description}
                      </AnimatedText>
                    </div>
                  </Link>
                );
              })}

              <ExploreMoreButton link="/blogs" />
            </div>
          </section>
          {/* Certification Section */}
          <section>
            <HomeHeading title="Certification 📜" />
            <div className="home-section-container no-scrollbar ">
              {certificates.map((certificate) => {
                return (
                  <div
                    key={certificate.id}
                    className="home-content-section no-scrollbar flex flex-col  cursor-auto hover-slide-animation"
                  >
                    <AnimatedDiv
                      variants={popUpFromBottomForText}
                      infinity={true}
                      className="flex items-center justify-between mb-3 text-slate-400"
                    >
                      <p className="font-bold capitalize text-xs sm:text-sm">
                        {certificate.issuedBy.orgName}
                      </p>
                      <p className="font-medium text-xs sm:text-sm">
                        {certificate.issuedDate}
                      </p>
                    </AnimatedDiv>
                    <div className="flex items-center gap-4">
                      <AnimatedDiv
                        variants={popUpFromBottomForText}
                        infinity={true}
                        className="flex relative"
                      >
                        <Image
                          width={40}
                          height={40}
                          src={certificate.issuedBy.orgLogo}
                          alt={certificate.issuedBy.orgName}
                          objectFit="contain"
                          layout="fixed"
                        />
                      </AnimatedDiv>
                      <AnimatedText
                        variants={popUpFromBottomForText}
                        infinity={true}
                        className="capitalize font-semibold text-sm md:text-base border-purple-600 text-slate-600 dark:text-slate-300"
                      >
                        {certificate.title}
                      </AnimatedText>
                    </div>

                    <AnimatedButton
                      variants={popUpFromBottomForText}
                      infinity={true}
                      className="px-3 py-2 mt-2  bg-purple-700 !text-white text-center font-semibold outline-none w-full mx-auto flex items-center text-xs justify-center space-x-3 rounded-md auto-row"
                      onClick={() => window.open(certificate.urls.pdfURL)}
                    >
                      <MdVerified className="text-xl text-white" />
                      <p>View Certification</p>
                    </AnimatedButton>
                  </div>
                );
              })}
              {/* <ExploreMoreButton link="/certificates" /> */}
            </div>
          </section>
          {/* Project Section */}
          <section>
            <HomeHeading title="Projects 📂" />
            <div className="home-section-container no-scrollbar">
              {projects.map((project) => {
                if (!project.pinned) return null;

                return (
                  <div
                    key={project.id}
                    className="home-content-section no-scrollbar rounded-lg flex flex-col justify-start hover-slide-animation"
                    onClick={() => window.open(project.githubURL)}
                  >
                    <AnimatedDiv
                      variants={popUpFromBottomForText}
                      infinity={true}
                    >
                      <Image
                        className="rounded-xl mb-2"
                        width={360}
                        height={200}
                        src={project.coverURL}
                        alt={project.name}
                        layout="responsive"
                        objectFit="contain"
                        quality="50"
                      />
                    </AnimatedDiv>
                    <AnimatedHeading
                      variants={popUpFromBottomForText}
                      infinity={true}
                      className="capitalize my-2 mt-4 font-bold md:font-extrabold text-sm md:text-base dark:text-slate-300 text-slate-600 border-purple-600 truncate"
                    >
                      {project.name}
                    </AnimatedHeading>
                    <AnimatedText
                      variants={popUpFromBottomForText}
                      infinity={true}
                      className="text-xs sm:text-sm truncate-3 text-slate-400 font-medium"
                    >
                      {project.description}
                    </AnimatedText>
                  </div>
                );
              })}
              <ExploreMoreButton link="/projects" />
            </div>
          </section>

          <FAQ faqs={faqs} />
          <Contact socialMedia={socialMedia} />
        </div>
      </div>
    </>
  );
}

export function HomeHeading({ title }) {
  return (
    <AnimatedHeading
      className="w-full font-bold text-2xl text-center my-2 font-exo"
      variants={headingFromLeft}
      infinity={true}
    >
      {title}
    </AnimatedHeading>
  );
}

export async function getStaticProps() {
  const blogs = await fetch("https://dev.to/api/articles/me?per_page=10", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
    },
  }).then((res) => res.json());
  return {
    props: {
      blogs,
    },
    // updates the page automatically after 1 hour
    revalidate: 60 * 60,
  };
}
