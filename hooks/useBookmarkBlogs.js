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
    var data = JSON.parse(localStorage.getItem(key));
    if (data === null) {
      localStorage.setItem(key, JSON.stringify([]));
      return JSON.parse(localStorage.getItem(key));
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
    setBookmarkedBlogs(data.filter((blog) => blog.slug != v));
  }

  function isAlreadyBookmarked(searchBySlug) {
    return bookmarkedBlogs
      .map((bookmarkedBlog) => bookmarkedBlog.slug === searchBySlug)
      .includes(true);
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(bookmarkedBlogs));
  }, [bookmarkedBlogs]);

  return {
    bookmarkedBlogs,
    addToBookmark,
    removeFromBookmark,
    isAlreadyBookmarked,
  };
};

export default useBookmarkBlogs;
