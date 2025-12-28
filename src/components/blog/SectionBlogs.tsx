"use client";
import { blogsPostsInterface } from "@/types";
import Categories from "./Categories";
import Posts from "./Posts";
import { useState } from "react";
import Search from "./Search";

export default function SectionBlogs({
  posts,
}: {
  posts: blogsPostsInterface[];
}) {
  const [filteredPosts, setFilteredPosts] =
    useState<blogsPostsInterface[]>(posts);
  const [selected, setSelected] = useState<string>("all");

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seaching*/}
        <Search
          filteredPosts={filteredPosts}
          setFilteredPosts={setFilteredPosts}
        />
        {/* Categories Filter */}
        <Categories
          onUpdateCategories={setFilteredPosts}
          originalPosts={posts}
          selected={selected}
          setSelected={setSelected}
        />

        {/* Blog Posts */}
        <Posts posts={filteredPosts} />
      </div>
    </section>
  );
}
