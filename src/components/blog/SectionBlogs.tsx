"use client";
import { blogsPostsInterface } from "@/types";
import { useEffect, useState } from "react";
import Categories from "./Categories";
import Posts from "./Posts";
import Search from "./Search";

export default function SectionBlogs({
  blogPosts,
}: {
  blogPosts: blogsPostsInterface[];
}) {
  const [filteredPosts, setFilteredPosts] =
    useState<blogsPostsInterface[]>(blogPosts);
  const [selected, setSelected] = useState<string>("all");

  useEffect(() => {
    if (selected === "all") {
      setFilteredPosts(blogPosts);
      return;
    }
    setFilteredPosts((prev) => prev.filter((p) => p.category === selected));
  }, [selected, blogPosts]);

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seaching*/}
        <Search
          posts={blogPosts}
          setFilteredPosts={setFilteredPosts}
          selected={selected}
        />
        {/* Categories Filter */}
        <Categories
          onUpdateCategories={setFilteredPosts}
          originalPosts={blogPosts}
          selected={selected}
          setSelected={setSelected}
        />

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="w-full text-center text-2xl text-black">
            No posts found.
          </div>
        ) : (
          <Posts posts={filteredPosts} />
        )}
      </div>
    </section>
  );
}
