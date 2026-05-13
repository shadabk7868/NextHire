import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaMailBulk } from "react-icons/fa";

export default function Candidate() {

  function Toggle() {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition"></div>
        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
      </label>
    );
  }

  const candidates = [
    {
      id: "1",
      name: "Darlene Robertson",
      role: "UI Designer",
      location: "London, UK",
      salary: "$99 / hour",
      skills: ["App", "Design", "Digital"],
      image: "/team-1.jpg"
    },
    {
      id: "2",
      name: "Wade Warren",
      role: "Developer",
      location: "London, UK",
      salary: "$94 / hour",
      skills: ["App", "Design", "Digital"],
      image: "/team-2.jpg"
    },
    {
      id: "3",
      name: "Leslie Alexander",
      role: "Marketing Expert",
      location: "London, UK",
      salary: "$99 / hour",
      skills: ["App", "Design", "Digital"],
      image: "/team-3.jpg"
    },
    {
      id: "4",
      name: "Floyd Miles",
      role: "Chartered Accountant",
      location: "London, UK",
      salary: "$88 / hour",
      skills: ["App", "Design", "Digital"],
      image: "/team-4.jpg"
    }
  ];

  return (
    <div className="bg-[#f5f7fc] min-h-screen">

      <Navbar />

      {/* HEADER */}
      <div className="w-full h-[200px] bg-[#e6e8ee] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-gray-900">Candidates</h2>
        <p className="text-gray-500 mt-3 text-sm">Home / Candidates</p>
      </div>

      <div className="lg:px-[130px] md:px-10 px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* SIDEBAR */}
          <div className=" w-full lg:w-[400px] bg-white p-6 rounded-xl shadow-sm flex flex-col gap-8">

            {/* SEARCH */}
            <div>
              <h3 className="font-semibold mb-3">Search by Keywords</h3>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 h-[50px]">
                <FaSearch className="text-gray-400 mr-2" />
                <input className="bg-transparent outline-none text-sm w-full"
                  placeholder="Job title, keywords, or company" />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <h3 className="font-semibold mb-2">Location</h3>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 h-[50px]">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input className="bg-transparent outline-none text-sm w-full"
                  placeholder="City or postcode" />
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Radius around selected destination
              </p>

              <input type="range" className="w-full mt-2" />

              <div className="bg-blue-100 text-blue-600 text-center py-1 rounded-md text-sm mt-2">
                100km
              </div>
            </div>

            {/* CATEGORY */}
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 h-[45px]">
                <FaMailBulk className="text-gray-400 mr-2" />
                <input className="bg-transparent outline-none text-sm w-full"
                  placeholder="Choose a category" />
              </div>
            </div>

            {/* EXPERIENCE */}
            <div>
              <h3 className="font-semibold mb-3">Experience</h3>
              {["Fresh","1 Year","2 Year","3 Year","4 Year"].map((item,i)=>(
                <label key={i} className="flex items-center gap-3 mb-3">
                  <Toggle />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>

            {/* QUALIFICATION */}
            <div>
              <h3 className="font-semibold mb-3">Qualification</h3>
              {["Certificate","Associate Degree","Bachelor Degree","Master’s Degree","Doctorate Degree"].map((item,i)=>(
                <label key={i} className="flex items-center gap-3 mb-3">
                  <Toggle />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">

            {/* TOP BAR */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{candidates.length} Candidates</h3>
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Sort by (default)</option>
              </select>
            </div>

            {/* LIST */}
            <div className="space-y-5">
              {candidates.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm flex gap-4 items-center hover:shadow-md transition">

                  <img src={item.image} className="w-16 h-16 rounded-full object-cover" />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.role}</p>

                    <div className="flex gap-4 text-sm text-gray-500 mt-2">
                      <span>{item.location}</span>
                      <span>{item.salary}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      {item.skills.map((skill,i)=>(
                        <span key={i} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link to={`/candidate/${item.id}`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                      View Profile
                    </button>
                  </Link>

                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}