import React from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How Businesses Can be More Productive By Using Websites.",
    summary: "Stop Wasting Time: How Your Website Can Be Your Most Productive Employee. In business, time is the one resource you can never get back.",
    date: "2024-05-01",
    author: "HAYMAN"
  },
  {
    id: 2,
    title: "How to Maximize Your Productivity",
    summary: "Tips and tricks to help you get the most out of your workday.",
    date: "2024-04-15",
    author: "Jane Doe"
  },
  {
    id: 3,
    title: "The Future of Web Development",
    summary: "Exploring upcoming trends and technologies in web development.",
    date: "2024-03-30",
    author: "John Smith"
  }
];

const Blog = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <div className="space-y-8">
        {blogPosts.map(post => (
          <article key={post.id} className="border-b border-gray-300 pb-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2">{post.summary}</p>
            <div className="text-sm text-gray-500">
              <span>By {post.author}</span> | <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
