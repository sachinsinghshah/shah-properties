"use client";
import { blogsPostsInterface } from "@/types";
import React, { useState } from "react";

export default function Search({
  filteredPosts,
  setFilteredPosts,
}: {
  filteredPosts: blogsPostsInterface[];
  setFilteredPosts: React.Dispatch<React.SetStateAction<blogsPostsInterface[]>>;
}) {
  const [originalPosts] = useState(filteredPosts);
  const handlerFilter = (text: string) => {
    if (text.length === 0) {
      setFilteredPosts(originalPosts);
      return;
    }
    const filterPosts = originalPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(text.toLocaleLowerCase()) ||
        post.author.toLocaleLowerCase().includes(text.toLocaleLowerCase()) ||
        post.title.toLocaleLowerCase().includes(text.toLocaleLowerCase())
    );
    setFilteredPosts(filterPosts);
  };
  return (
    <div className="flex w-full mb-10">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-emerald-400"
        style={{ background: "#009966 !important" }}
        onChange={(e) => {
          handlerFilter(e.target.value);
        }}
      />
    </div>
  );
}
