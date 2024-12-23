import React, { createContext, useEffect, useState } from "react";

// Import toàn bộ dữ liệu JSON
import blogs from "../data/blogs.json";
import blogTags from "../data/blogTags.json";
import enums from "../data/enums.json";
import follows from "../data/follows.json";
import likes from "../data/likes.json";
import tags from "../data/tags.json";
import users from "../data/users.json";

// Tạo Context
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    blogs: [],
    blogTags: [],
    enums: [],
    follows: [],
    likes: [],
    tags: [],
    users: [],
  });

  useEffect(() => {
    // Kiểm tra và lưu dữ liệu vào localStorage nếu chưa có
    const initializeData = (key, defaultData) => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(defaultData));
      }
      return JSON.parse(localStorage.getItem(key));
    };

    setData({
      blogs: initializeData("blogs", blogs),
      blogTags: initializeData("blogTags", blogTags),
      enums: initializeData("enums", enums),
      follows: initializeData("follows", follows),
      likes: initializeData("likes", likes),
      tags: initializeData("tags", tags),
      users: initializeData("users", users),
    });
    
    // localStorage.setItem("blogs", JSON.stringify(blogs));
    // localStorage.setItem("blogTags", JSON.stringify(blogTags));
    // localStorage.setItem("enums", JSON.stringify(enums));
    // localStorage.setItem("follows", JSON.stringify(follows));
    // localStorage.setItem("likes", JSON.stringify(likes));
    // localStorage.setItem("tags", JSON.stringify(tags));
    // localStorage.setItem("users", JSON.stringify(users));
  }, []);

  // Hàm cập nhật dữ liệu và đồng bộ localStorage
  const updateData = (key, updatedData) => {
    setData((prevData) => ({
      ...prevData,
      [key]: updatedData,
    }));
    localStorage.setItem(key, JSON.stringify(updatedData));
  };

  return (
    <DataContext.Provider value={{ data, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
