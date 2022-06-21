import { useState, useEffect } from "react";

const useBookmarkBlogs = (key, defaultValue) => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || defaultValue);
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  function getValue() {
    var data = JSON.parse(localStorage.getItem("blogs"));
    if (data === null) {
      localStorage.setItem("blogs", JSON.stringify([]));
      return JSON.parse(localStorage.getItem("blogs"));
    }
    return data;
  }

  function addToBookmark(v) {
    var data = getValue();
    if (!data.includes(v)) {
      data.push(v);
      setBookmarkedBlogs(data);
    }
  }

  function removeFromBookmark(v) {
    var data = getValue();
    setBookmarkedBlogs(data.filter((slug) => slug != v));
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(bookmarkedBlogs));
  }, [bookmarkedBlogs]);

  return [bookmarkedBlogs, addToBookmark, removeFromBookmark];
};

export default useBookmarkBlogs;
