import React from "react";
import "./BlogList.css";

function BlogList({ type }) {
  const blogs =
    type === "latest"
      ? [
          { id: 1, title: "Latest Blog 1", date: "2024-11-24" },
          { id: 2, title: "Latest Blog 2", date: "2024-11-23" },
        ]
      : [
          { id: 1, title: "Blog 1", date: "2024-11-20" },
          { id: 2, title: "Blog 2", date: "2024-11-18" },
          { id: 3, title: "Blog 3", date: "2024-11-15" },
        ];

  return (
    <section className="blog-list">
      <h2>{type === "latest" ? "Latest Blogs" : "All Blogs"}</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>Posted on: {blog.date}</p>
          </li>
        ))}
      </ul>
      {type === "all" && <button>Show All</button>}
    </section>
  );
}

export default BlogList;
