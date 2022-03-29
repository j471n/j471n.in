import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AiOutlineProject,
  AiOutlinePhone,
  AiFillProject,
  AiFillPhone,
} from "react-icons/ai";
import {
  BsBarChart,
  BsBarChartFill,
  BsInfoCircle,
  BsInfoCircleFill,
} from "react-icons/bs";
import { RiArticleLine, RiArticleFill } from "react-icons/ri";
import BottomNavLink from "./BottomNavLink";

const initialRouteState = {
  home: false,
  skills: false,
  blogs: false,
  projects: false,
  // contact: false,
};

function BottomNavbar() {
  const router = useRouter();
  const [routes, setRoutes] = useState(initialRouteState);

  const currentRoute = router.pathname.slice(1);
  useEffect(() => {
    // setRoutes(initialRouteState);
    for (let route in routes) {
      routes[route] = false;
    }
    if (currentRoute === "") {
      setRoutes({ ...routes, ...{ home: true } });
    } else if (routes.hasOwnProperty(currentRoute)) {
      let obj = {};
      obj[currentRoute] = true;
      setRoutes({ ...routes, ...obj });
    } else {
      console.error("404 NOT FOUND");
    }
  }, [currentRoute]);

  return (
    <div className="fixed bg-white dark:bg-darkPrimary sm:hidden ring-2 w-full ring-purple-400 bottom-0  rounded-tl-2xl rounded-tr-2xl z-40 print:hidden">
      {/* Bottom NavBar Links */}
      <div className="flex items-center px-8 py-2 justify-between transition-all duration-150 select-none">
        {/* Home Icon */}
        <BottomNavLink
          Icon={routes.home ? BsInfoCircleFill : BsInfoCircle}
          active={routes.home && true}
          title="About"
          href="/"
        />
        {/* Skill Icon */}
        <BottomNavLink
          Icon={routes.skills ? BsBarChartFill : BsBarChart}
          active={routes.skills && true}
          title="Skills"
          href="/skills"
        />

        {/* Blogs Icon */}
        <BottomNavLink
          Icon={routes.blogs ? RiArticleFill : RiArticleLine}
          active={routes.blogs && true}
          title="Blogs"
          href="/blogs"
        />
        {/* Projects Icon */}
        <BottomNavLink
          Icon={routes.projects ? AiFillProject : AiOutlineProject}
          active={routes.projects && true}
          title="Projects"
          href="/projects"
        />
        {/* Contact Icon */}
        {/* <BottomNavLink
          Icon={routes.contact ? AiFillPhone : AiOutlinePhone}
          info={routes.contact && { title: "contact", active: true }}
          href="/contact"
        /> */}
      </div>
    </div>
  );
}
export default BottomNavbar;
