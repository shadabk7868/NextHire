import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Blog() {

  const blogs = [
    {
      id: "1",
      title: "Overworked Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      image: "/1.webp"
    },
    {
      id: "2",
      title: "Attract Sales And Profits",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      image: "/2.webp"
    },
    {
      id: "3",
      title: "An Overworked Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      image: "/3.webp"
    },
    {
      id: "4",
      title: "An Overworke Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      image: "/5.webp"
    },
    {
      id: "5",
      title: "The Best Account Providers",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      image: "/1.webp"
    },
    {
      id: "6",
      title: "An Overworked Newspaper Editor",
      date: "August 31, 2021",
      comments: "12 Comments",
      desc: "A job ravenously while Far much that one rank beheld after outside...",
      image: "/3.webp"
    }
  ];

  return (
    <div className="bg-[#f5f7fc] min-h-screen">

      <Navbar />

      {/* HEADER */}
      <div className="w-full h-[200px] bg-[#e6e8ee] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold">Blog</h2>
        <p className="text-gray-500 mt-2 text-sm">Home / Blog</p>
      </div>

      <div className="lg:px-[90px] md:px-10 px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDE BLOGS */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">

            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden">

                {/* IMAGE (FIXED SIZE SPACE) */}
                <div className="cursor-default w-full h-[220px] bg-gray-200">
                  <Link to={`/blog/${blog.id}`}>
                  <img
                    src={blog.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  </Link>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <div className="text-sm text-gray-400 flex gap-4">
                    <span>{blog.date}</span>
                    <span>{blog.comments}</span>
                  </div>

                  <h3 className="mt-2 font-semibold text-lg">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    {blog.desc}
                  </p>

                  <Link to={`/blog/${blog.id}`}>
                    <button className="text-blue-600 mt-3 text-sm">
                      Read More →
                    </button>
                  </Link>
                </div>

              </div>
            ))}

          </div>  
        </div>
      </div>

      <Footer />
    </div>
  );
}