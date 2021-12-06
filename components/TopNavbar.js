import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useDarkmode from "../hooks/useDarkmode"

export default function TopNavbar() {
  const routes = ["/", "/skills", "/blogs", "/projects", "/contact"];
  const router = useRouter();
  const currentRoute = router.pathname;

  const { darkMode, changeDarkMode } = useDarkmode();
  

  useEffect(() => {
    // Gathering all the top-nav-links it returns an object
    var navLinks = document.querySelectorAll(".top-nav-link");

    // iterating through object and removing the border if exist
    Object.entries(navLinks).forEach(
      // link is an array of id and the item, changing the item
      (link) => (link[1].style.borderBottom = "none")
    );

    // Checking if the current route is valid
    if (routes.includes(currentRoute)) {
      // navLinks.map((link) => console.log(link));
      // this checks the currentRoute index the return it the navLinks
      // then we change the style according to the index e.g. navLinks[0].style.color ="black";
      navLinks[routes.indexOf(currentRoute)].style.borderBottom =
        "4px solid";
    }
  }, [currentRoute]);

  return (
    <div className="md:sticky w-full bg-white dark:bg-darkPrimary  dark:text-white top-0 flex items-center justify-between shadow p-4 z-40">
      {/* Name*/}
      <div className="w-full text-center sm:text-left text-2xl font-bold">
        <Link href="/">Jatin Sharma</Link>
        <button
          className=" bg-gray-500 mx-2 px-2 text-base"
          onClick={() => changeDarkMode(!darkMode)}
        >
          Toggle
        </button>
      </div>

      {/* Top Nav list */}
      <nav className="hidden sm:flex">
        <ul className="flex items-center flex-1">
          <li className="top-nav-link">
            <Link href="/">Home</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/skills">Skills</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/blogs">Blogs</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/projects">Projects</Link>
          </li>
          <li className="top-nav-link">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
