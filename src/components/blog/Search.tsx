"use client";
import { blogsPostsInterface } from "@/types";
import React from "react";

export default function Search({
  posts,
  setFilteredPosts,
  selected,
}: {
  posts: blogsPostsInterface[];
  setFilteredPosts: React.Dispatch<React.SetStateAction<blogsPostsInterface[]>>;
  selected: string;
}) {
  const handlerFilter = (text: string) => {
    const filteredPosts = posts.filter((p) => p.category === selected);
    const isAllPosts = selected === "all" ? posts : filteredPosts;
    if (text.length === 0) {
      setFilteredPosts(isAllPosts);
      return;
    }
    const filterPostsSearch = isAllPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(text.toLowerCase()) ||
        post.author.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filterPostsSearch);
  };
  return (
    <div className="flex w-full mb-10">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 px-6 py-4 rounded-xl text-gray-900 !bg-[#009966] focus:outline-none focus:ring-4 focus:ring-emerald-400"
        onChange={(e) => {
          handlerFilter(e.target.value);
        }}
      />
    </div>
  );
}
