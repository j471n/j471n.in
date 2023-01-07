import { FrontMatter } from "@lib/types";
import { useState, useEffect } from "react";

const useBookmarkBlogs = (key: string, defaultValue: []) => {
  const [bookmarkedBlogs, setBookmarkedBlogs] = useState((): FrontMatter[] => {
    let currentValue: FrontMatter[] = [];

    try {
      currentValue = JSON.parse(localStorage.getItem(key)!);
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  function getValue() {
    var data = JSON.parse(localStorage.getItem(key)!);
    if (data === null) {
      localStorage.setItem(key, JSON.stringify([]));
      return JSON.parse(localStorage.getItem(key)!);
    }
    return data;
  }

  function addToBookmark(blogToBookmark: FrontMatter) {
    var data = getValue();
    if (!data.includes(blogToBookmark)) {
      data.unshift(blogToBookmark); // add blog to the starting of the array
      setBookmarkedBlogs(data);
    }
  }

  function removeFromBookmark(blogToRemove: string) {
    var data = getValue();
    setBookmarkedBlogs(
      data.filter((blog: FrontMatter) => blog.slug != blogToRemove)
    );
  }

  function isAlreadyBookmarked(searchBySlug: string) {
    return bookmarkedBlogs
      ?.map((bookmarkedBlog: FrontMatter) => bookmarkedBlog.slug === searchBySlug)
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
