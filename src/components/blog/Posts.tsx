"use client";
import Link from "next/link";
import { blogsPostsInterface, iconMap } from "@/types";
import { FaArrowRight, FaCalendar, FaClock, FaUser } from "react-icons/fa";
import { formatDate } from "@/lib/formatDate";

export default function Posts({ posts }: { posts: blogsPostsInterface[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {posts.map((post) => {
        const Icon = iconMap[post.icon];
        return (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
          >
            {/* Image */}
            <div className="relative h-64 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center overflow-hidden">
              <Icon className="text-8xl text-emerald-600/20 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <FaUser className="text-emerald-600" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar className="text-emerald-600" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock className="text-emerald-600" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Read More Link */}
              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors group"
              >
                Read Full Article
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
