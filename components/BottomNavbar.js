import React, { useEffect, useState } from "react";

import {
  AiOutlineHome,
  AiOutlineProject,
  AiOutlinePhone,
  AiFillProject,
  AiFillHome,
  AiFillPhone,
} from "react-icons/ai";
import { RiArticleLine, RiArticleFill } from "react-icons/ri";
import { BsBarChart, BsBarChartFill } from "react-icons/bs";
import { useRouter } from "next/router";

function BottomNavbar() {
  const router = useRouter();
  const [routes, setRoutes] = useState({
    "/": false,
    "/skills": false,
    "/blogs": false,
    "/projects": false,
    "/contact": false,
  });

  useEffect(() => {
    const currentRoute = location.pathname;
    for (let route in routes) {
      routes[route] = false;
    }
    if (routes.hasOwnProperty(currentRoute)) {
      let obj = {};
      obj[currentRoute] = true;
      setRoutes({ ...routes, ...obj });
    }
  }, []);
  return (
    <div className="fixed sm:hidden bottom-0 w-screen rounded-tl-sm rounded-tr-sm shadow z-50">
      <div className="flex items-center p-4 justify-between transition-all duration-150">
        {routes["/"] ? (
          <AiFillHome
            className="bottom_nav_icon"
            onClick={() => router.push("/name")}
          />
        ) : (
          <AiOutlineHome
            className="bottom_nav_icon"
            onClick={() => router.push("/name")}
          />
        )}
        {routes["/skills"] ? (
          <BsBarChartFill
            className="bottom_nav_icon"
            onClick={() => router.push("/skills")}
          />
        ) : (
          <BsBarChart
            className="bottom_nav_icon"
            onClick={() => router.push("/skills")}
          />
        )}
        {routes["/blogs"] ? (
          <RiArticleFill
            className="bottom_nav_icon"
            onClick={() => router.push("/blogs")}
          />
        ) : (
          <RiArticleLine
            className="bottom_nav_icon"
            onClick={() => router.push("/blogs")}
          />
        )}
        {routes["/projects"] ? (
          <AiFillProject
            className="bottom_nav_icon"
            onClick={() => router.push("/projects")}
          />
        ) : (
          <AiOutlineProject
            className="bottom_nav_icon"
            onClick={() => router.push("/projects")}
          />
        )}
        {routes["/contact"] ? (
          <AiFillPhone
            className="bottom_nav_icon"
            onClick={() => router.push("/contact")}
          />
        ) : (
          <AiOutlinePhone
            className="bottom_nav_icon"
            onClick={() => router.push("/contact")}
          />
        )}
      </div>
    </div>
  );
}
export default BottomNavbar;
