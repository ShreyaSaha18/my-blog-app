import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState(""); // ADD

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {/* SEARCH INPUT - same style as category row */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-[400px] px-4 py-2 border border-black shadow-[-4px_4px_0px_#000000] outline-none"
        />
      </div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Java")}
          className={
            menu === "Java" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          Java
        </button>
        <button
          onClick={() => setMenu("React")}
          className={
            menu === "React" ? "bg-black text-white py-1 px-4 rounded-sm" : ""
          }
        >
          React
        </button>
        <button
          onClick={() => setMenu("Interview Questions")}
          className={
            menu === "Interview Questions"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : ""
          }
        >
          Interview Questions
        </button>
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .filter(
            (item) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.description.toLowerCase().includes(search.toLowerCase()),
          )
          .map((item, index) => (
            <BlogItem
              key={index}
              id={item._id}
              title={item.title}
              description={item.description}
              category={item.category}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
