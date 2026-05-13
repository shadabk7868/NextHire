import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BlogDetail() {
  const { id } = useParams();

  const blogs = [
    {
      id: "1",
      title: "Overworked Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      content:
        "This is full blog content. Here you can write detailed article about Newspaper Editor and job stress, productivity, etc.",
      image: "/1.webp",
    },
    {
      id: "2",
      title: "Attract Sales And Profits",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      content:
        "Full guide on how to attract sales and increase profit using modern strategies...",
      image: "/2.webp",
    },
    {
      id: "3",
      title: "An Overworked Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      content:
        "Deep dive into newsroom pressure and journalism challenges...",
      image: "/3.webp",
    },
    {
      id: "4",
      title: "An Overworke Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      content: "Extended article about work overload and burnout...",
      image: "/5.webp",
    },
    {
      id: "5",
      title: "The Best Account Providers",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      content: "Detailed comparison of account providers and services...",
      image: "/1.webp",
    },
    {
      id: "6",
      title: "An Overworked Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      content: "Final blog about editor workload and modern journalism...",
      image: "/3.webp",
    },
  ];

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div>
        <Navbar />
        <div className="p-10 text-center">Blog not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      <Navbar />

      {/* HEADER IMAGE */}
      <div className="w-full h-[300px]">
        <img
          src={blog.image}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="lg:px-[120px] md:px-10 px-6 py-10 bg-white">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        <p className="text-gray-500 text-sm mt-2">
          {blog.date} • {blog.comments}
        </p>

        <p className="mt-6 text-gray-700 leading-7">
          {blog.desc}
        </p>

        <p className="mt-6 text-gray-600 leading-7">
          {blog.content}
        </p>

        <Link to="/blog">
          <button className="mt-8 text-blue-600">
            ← Back to Blog
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}