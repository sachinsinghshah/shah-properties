"use client";

import { blogsPostsInterface } from "@/types";
import React from "react";

export default function Categories({
  originalPosts,
  onUpdateCategories,
  selected,
  setSelected,
}: {
  originalPosts: blogsPostsInterface[];
  onUpdateCategories: React.Dispatch<
    React.SetStateAction<blogsPostsInterface[]>
  >;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  const onUpdate = (category: string) => {
    setSelected(category);
    const updateOriginalPosts =
      category === "all"
        ? originalPosts
        : originalPosts.filter((post) => post.category === category);
    onUpdateCategories(updateOriginalPosts);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-12 justify-center">
      <button
        onClick={() => onUpdate("all")}
        className={`px-6 py-2 rounded-full font-medium transition-colors ${
          selected === "all"
            ? "bg-emerald-600 text-white"
            : "bg-white text-gray-700 border border-gray-200"
        }`}
      >
        All posts
      </button>
      {originalPosts
        .filter(
          (post, index, array) =>
            array.findIndex((p) => p.category === post.category) === index
        )
        .map((category: blogsPostsInterface) => {
          return (
            <button
              key={category.id}
              onClick={() => onUpdate(category.category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                category.category === selected
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {category.category}
            </button>
          );
        })}
    </div>
  );
}
