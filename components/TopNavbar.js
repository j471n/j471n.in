import React, { useEffect } from "react";

export default function TopNavbar() {
  const routes = ["/", "/skills", "/blogs", "/projects", "/contact"];

  useEffect(() => {
    // Gathering all the top-nav-links
    const currentRoute = location.pathname;
    const navLinks = document.querySelectorAll(".top-nav-link");

    // Checking if the current route is valid
    if (routes.includes(currentRoute)) {
      // this checks the currentRoute index the return it the navLinks
      // then we change the style according to the index e.g. navLinks[0].style.color ="black";
      navLinks[routes.indexOf(currentRoute)].style.borderBottom =
        "4px solid black";
    }
  }, []);

  return (
    <div className="flex items-center justify-between shadow p-4">
      {/* Name*/}
      <div className="w-full text-center sm:text-left text-2xl font-bold">
        <a href="/">Jatin Sharma</a>
      </div>

      {/* Top Nav list */}
      <nav className="hidden sm:flex">
        <ul className="flex items-center flex-1">
          <li className="top-nav-link">
            <a href="/">Home</a>
          </li>
          <li className="top-nav-link">
            <a href="/skills">Skills</a>
          </li>
          <li className="top-nav-link">
            <a href="/blogs">Blogs</a>
          </li>
          <li className="top-nav-link">
            <a href="/projects">Projects</a>
          </li>
          <li className="top-nav-link">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
