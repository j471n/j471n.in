import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AiOutlineProject,
  AiOutlinePhone,
  AiFillProject,
  AiFillPhone,
  AiOutlineSafetyCertificate,
  AiFillSafetyCertificate,
} from "react-icons/ai";
import {
  BsBarChart,
  BsBarChartFill,
  BsInfoCircle,
  BsInfoCircleFill,
} from "react-icons/bs";
import { RiArticleLine, RiArticleFill } from "react-icons/ri";
import BottomNavLink from "./BottomNavLink";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";
import { fromBottomVariant } from "../content/FramerMotionVariants";
import { motion } from "framer-motion";
import { navigationRoutes } from "../utils/utils";
import Link from "next/link";
import { GrCertificate } from "react-icons/gr";
import { bottomNavVariant } from "../content/FramerMotionVariants";

// const initialRouteState = {
//   home: false,
//   skills: false,
//   blogs: false,
//   projects: false,
//   certificates: false,
// };

function BottomNavbar() {
  const router = useRouter();

  // const [routes, setRoutes] = useState(initialRouteState);

  // const currentRoute = router.pathname.slice(1);
  // useEffect(() => {
  //   // setRoutes(initialRouteState);
  //   for (let route in routes) {
  //     routes[route] = false;
  //   }
  //   if (currentRoute === "") {
  //     setRoutes({ ...routes, ...{ home: true } });
  //   } else if (routes.hasOwnProperty(currentRoute)) {
  //     let obj = {};
  //     obj[currentRoute] = true;
  //     setRoutes({ ...routes, ...obj });
  //   } else {
  //     console.error("404 NOT FOUND");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentRoute]);

  const normalIcons = [
    BsInfoCircle,
    BsBarChart,
    RiArticleLine,
    AiOutlineSafetyCertificate,
    AiOutlineProject,
  ];
  const activeIcons = [
    BsInfoCircleFill,
    BsBarChartFill,
    RiArticleFill,
    AiFillSafetyCertificate,
    AiFillProject,
  ];

  return (
    <div className="fixed bg-white dark:bg-darkPrimary sm:hidden ring-2 w-full ring-purple-400 bottom-0  rounded-tl-2xl rounded-tr-2xl z-40 print:hidden">
      {/* Bottom NavBar Links */}
      <div className="flex items-center px-8 py-1 justify-between transition-all duration-150 select-none">
        {/* Home Icon */}

        {navigationRoutes.map((link, index) => {
          return (
            <BottomNavItem
              key={index}
              href={`/${link}`}
              text={link}
              router={router}
              NormalIcon={normalIcons[index]}
              ActiveIcon={activeIcons[index]}
            />
          );
        })}
        {/* <BottomNavLink
          Icon={routes.home ? BsInfoCircleFill : BsInfoCircle}
          active={routes.home && true}
          title="About"
          href="/"
        />
        <BottomNavLink
          Icon={routes.skills ? BsBarChartFill : BsBarChart}
          active={routes.skills && true}
          title="Skills"
          href="/skills"
        />

        <BottomNavLink
          Icon={routes.blogs ? RiArticleFill : RiArticleLine}
          active={routes.blogs && true}
          title="Blogs"
          href="/blogs"
        />
        <BottomNavLink
          Icon={routes.projects ? AiFillProject : AiOutlineProject}
          active={routes.projects && true}
          title="Projects"
          href="/projects"
        />

        <BottomNavLink
          Icon={routes.certificates ? AiFillPhone : AiOutlinePhone}
          info={routes.certificates && true}
          title="Certificates"
          href="/certificates"
        /> */}
      </div>
    </div>
  );
}
export default BottomNavbar;

function BottomNavItem({ href, NormalIcon, ActiveIcon, text, router }) {
  const isActive = router.asPath === (href === "/home" ? "/" : href);
  return (
    <Link href={href} passHref>
      <div
        title={text}
        className={`relative flex flex-col flex-grow transition-all  ${
          isActive ? "dark:text-purple-400" : "dark:text-gray-400"
        } justify-center items-center ${isActive && "text-purple-600 w-auto"}`}
      >
        <motion.span
          initial="hidden"
          animate="visible"
          variants={bottomNavVariant}
          className="flex flex-col justify-center items-center my-2"
        >
          {/* <Icon className="bottom_nav_icon" /> */}

          {isActive ? (
            <ActiveIcon className="bottom_nav_icon" />
          ) : (
            <NormalIcon className="bottom_nav_icon" />
          )}
          {/* <p className="text-[10px] font-semibold text-center uppercase">
            {text}
          </p> */}
        </motion.span>
      </div>
    </Link>
  );
}
