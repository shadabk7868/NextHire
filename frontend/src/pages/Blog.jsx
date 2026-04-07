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

      <div className="lg:px-[130px] md:px-10 px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT SIDE BLOGS */}
          <div className="flex-1 grid md:grid-cols-2 gap-6">

            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl shadow-sm overflow-hidden">

                {/* IMAGE (FIXED SIZE SPACE) */}
                <div className="w-full h-[220px] bg-gray-200">
                  <img
                    src={blog.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
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

          {/* SIDEBAR */}
          <div className="w-full lg:w-[350px] bg-white p-6 rounded-xl shadow-sm h-fit">

            {/* SEARCH */}
            <div>
              <h3 className="font-semibold text-m mb-3">Search by Keywords</h3>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 h-[50px]">
                <FaSearch className="text-gray-400 mr-2" />
                <input
                  className="bg-transparent outline-none w-full text-sm"
                  placeholder="keywords"
                />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="mt-8">
              <h3 className="font-semibold text-m mb-3">Categories</h3>
              <ul className="space-y-3 text-m text-gray-600">
                {["Education","Information","Interview","Job Seeking","Jobs","Learn","Skill","Travel"].map((cat,i)=>(
                  <li key={i} className="hover:text-blue-600 cursor-pointer">
                    • {cat}
                  </li>
                ))}
              </ul>
            </div>

            {/* TAGS */}
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["App","Administrative","Android","Wordpress","Design","React"].map((tag,i)=>(
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}