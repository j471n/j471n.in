import Link from "next/link";
import Image from "next/image";
import ExploreMoreButton from "../components/Buttons/ExploreMoreButton";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { GrCertificate } from "react-icons/gr";
import {
  getPinnedProjects,
  getPinnedSkills,
  getCertificates,
  getSocialMedia,
  getFAQs,
  // getPinnedFAQs,
} from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import VideoCover from "../components/VideoCover";
import Contact from "../components/Contact";
import FAQ from "../components/FAQ";

export default function Home({
  blogs,
  skills,
  certificates,
  projects,
  socialMedia,
  faqs,
}) {
  return (
    <>
      <Metadata title="About" />
      <div className="dark:bg-darkPrimary dark:text-gray-100">
        <VideoCover
          title="Jatin Sharma"
          videoUrl={"https://imgur.com/GoHeE7r.mp4"}
          buttonText="front-end developer"
        >
          {/* <p className="max-w-md p-5">
            Hi, welcome! I'm Jatin Sharma and I'm a self-taught React Developer
            👋 as I am currently perusing my Bachelor Degree in Computer
            Science. I wanted to learn the web development so desperately in my
            High School, then as th e time passed I've
          </p> */}
        </VideoCover>

        <div id="view" className="pt-20">
          {/* About me */}
          <section className="px-5 sm:px-20 sm:mx-20 text-md sm:text-base">
            <HomeHeading title="About Me" />
            <p className="text-slate-500 dark:text-slate-400 font-[500]">
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
            </p>
          </section>
          {/* Skills Section */}
          <section>
            <HomeHeading title="My Top ⚡kills" />

            <div className="flex gap-2 overflow-x-scroll no-scrollbar p-5 md:px-10">
              {skills.map((skill) => {
                return (
                  <div
                    title={skill.name}
                    key={skill.id}
                    className="home-content-section flex items-center justify-between overflow-hidden before:absolute before:h-full before:w-20 before:bg-purple-600 before:-right-4   before:-z-10 before:rotate-[20deg] before:scale-y-150 before:top-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10">
                        <Image width={60} height={60} src={`/${skill.icon}`} />
                      </div>

                      <p className="uppercase font-bold text-base">
                        {skill.name}
                      </p>
                    </div>
                    <p className="uppercase font-bold text-lg border-t-[3px] border-purple-100 text-purple-300">
                      {skill.level}
                    </p>
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
                    <div className="home-content-section">
                      <Image
                        className="hidden w-full h-full rounded-xl mb-3 cursor-pointer select-none"
                        src={blog.cover_image}
                        alt={blog.title}
                        width={500}
                        height={207}
                        layout="responsive"
                      />

                      <div className="flex items-center justify-between my-3 text-sm sm:text-base">
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
                      </div>
                      <h3 className="text-base sm:text-lg mb-1 font-bold truncate text-slate-600 dark:text-slate-300">
                        {blog.title}
                      </h3>
                      <p className="text-xs sm:text-sm truncate-3 text-slate-400">
                        {blog.description}
                      </p>
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
            <div className="home-section-container no-scrollbar">
              {certificates.map((certificate) => {
                return (
                  <div
                    key={certificate.id}
                    className="home-content-section no-scrollbar flex flex-col  cursor-auto"
                  >
                    <div className="flex items-center justify-between mb-3 text-slate-400">
                      <p className="font-bold capitalize text-xs sm:text-sm">
                        {certificate.issuedBy.orgName}
                      </p>
                      <p className="font-medium text-xs sm:text-sm">
                        {certificate.issuedDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex relative">
                        <Image
                          width={40}
                          height={40}
                          src={certificate.issuedBy.orgLogo}
                          alt={certificate.issuedBy.orgName}
                          objectFit="contain"
                          layout="fixed"
                        />
                      </div>
                      <p className="capitalize font-semibold text-sm md:text-base border-purple-600 text-slate-600 dark:text-slate-300">
                        {certificate.title}
                      </p>
                    </div>

                    <button
                      className="px-3 py-2 mt-2  bg-purple-700 !text-white text-center font-semibold outline-none w-full mx-auto flex items-center text-xs justify-center space-x-3 rounded-md auto-row"
                      onClick={() => window.open(certificate.urls.pdfURL)}
                    >
                      <GrCertificate className="text-xl" />
                      <p>View Certification</p>
                    </button>
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
                return (
                  <div
                    key={project.id}
                    className="home-content-section no-scrollbar rounded-lg flex flex-col justify-start"
                    onClick={() => window.open(project.githubURL)}
                  >
                    <Image
                      className="rounded-xl mb-2"
                      width={360}
                      height={200}
                      src={project.coverURL}
                      alt={project.name}
                      layout="responsive"
                      objectFit="contain"
                    />
                    <h1 className="capitalize my-2 mt-4 font-bold text-sm md:text-base dark:text-slate-300 text-slate-600 border-purple-600 truncate">
                      {project.name}
                    </h1>
                    <p className="text-xs sm:text-sm truncate-3 text-slate-400">
                      {project.description}
                    </p>
                  </div>
                );
              })}
              <ExploreMoreButton link="/projects" />
            </div>
          </section>

          <div className="w-full px-3 md:px-5 relative">
            <Image
              className="mx-auto rounded-lg"
              src="https://activity-graph.herokuapp.com/graph?username=j471n"
              alt=""
              width={1200}
              height={420}
            />
          </div>

          <FAQ faqs={faqs} />
          <Contact socialMedia={socialMedia} />
        </div>
      </div>
    </>
  );
}

export function HomeHeading({ title }) {
  return (
    <h1 className="w-full font-bold text-2xl text-center my-2">{title}</h1>
  );
}

export async function getStaticProps() {
  // fetching multiple requests by Promise.all
  const [blogs, skills, certificates, projects, socialMedia, faqs] =
    await Promise.all([
      fetch("https://dev.to/api/articles/me?per_page=10", {
        headers: {
          "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
        },
      }).then((res) => res.json()),
      getPinnedSkills(),
      getCertificates(),
      getPinnedProjects(),
      getSocialMedia(),
      getFAQs(),
    ]);
  return {
    props: {
      blogs,
      skills,
      certificates,
      projects,
      socialMedia,
      faqs,
    },
    // updates the page automatically after 1/2 an hour
    revalidate: 30 * 60,
  };
}
