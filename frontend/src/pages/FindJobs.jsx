import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function FindJobs() {

  function Toggle() {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 transition"></div>
        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
      </label>
    );
  }

  const jobs = [
  {
    id: "0",
    title: "Software Engineer (Android), Libraries",
    company: "Segment",
    location: "London, UK",
    time: "11 hours ago",
    salary: "$35k - $45k",
    type: "Full Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-1.webp"
  },
  {
    id: "1",
    title: "Recruiting Coordinator",
    company: "Catalyst",
    location: "London, UK",
    time: "10 hours ago",
    salary: "$30k - $40k",
    type: "Freelancer",
    level: "Private",
    urgency: "Urgent",
    image: "/1-2.webp"
  },
  {
    id: "2",
    title: "Senior Product Designer",
    company: "Upwork",
    location: "London, UK",
    time: "9 hours ago",
    salary: "$40k - $50k",
    type: "Temporary",
    level: "Private",
    urgency: "Urgent",
    image: "/1-3.webp"
  },
  {
    id: "3",
    title: "Senior Full Stack Engineer",
    company: "Medium",
    location: "London, UK",
    time: "8 hours ago",
    salary: "$45k - $60k",
    type: "Full Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-4.webp"
  },
  {
    id: "4",
    title: "Frontend Developer",
    company: "Google",
    location: "California, USA",
    time: "7 hours ago",
    salary: "$60k - $80k",
    type: "Full Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-5.webp"
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "Amazon",
    location: "Seattle, USA",
    time: "6 hours ago",
    salary: "$70k - $90k",
    type: "Full Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-6.webp"
  },
  {
    id: "6",
    title: "UI/UX Designer",
    company: "Dribbble",
    location: "Remote",
    time: "5 hours ago",
    salary: "$25k - $35k",
    type: "Part Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-1.webp"
  },
  {
    id: "7",
    title: "Data Analyst",
    company: "Microsoft",
    location: "New York, USA",
    time: "4 hours ago",
    salary: "$50k - $70k",
    type: "Full Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-2.webp"
  },
  {
    id: "8",
    title: "DevOps Engineer",
    company: "Netflix",
    location: "Los Angeles, USA",
    time: "3 hours ago",
    salary: "$80k - $100k",
    type: "Full Time",
    level: "Private",
    urgency: "Urgent",
    image: "/1-3.webp"
  },
  {
    id: "9",
    title: "Mobile App Developer",
    company: "Facebook",
    location: "Remote",
    time: "2 hours ago",
    salary: "$60k - $85k",
    type: "Freelancer",
    level: "Private",
    urgency: "Urgent",
    image: "/1-4.webp"
  }
];

  return (
    <div className="bg-[#f5f7fc] min-h-screen">

      <Navbar />

      {/* HEADER */}
      <div className="w-full h-[200px] bg-[#e6e8ee] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Find Jobs
        </h2>
        <p className="text-gray-500 mt-3 text-sm">
          Home / Jobs
        </p>
      </div>

      <div className="lg:px-[130px] md:px-10 px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* SIDEBAR*/}
         <div className="w-full lg:w-[400px] bg-white p-6 rounded-xl shadow-sm flex flex-col gap-8">

            {/* SEARCH */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Search by Keywords</h3>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 h-[50px]">
                <FaSearch className="text-gray-400 mr-2" />
                <input className="bg-transparent outline-none text-sm w-full"
                  placeholder="Job title, keywords, or company" />
              </div>
            </div>

            {/* LOCATION */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Location</h3>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 h-[50px]">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input className="bg-transparent outline-none text-sm w-full"
                  placeholder="City or postcode" />
              </div>

              <p className="text-xs text-gray-400">
                Radius around selected destination
              </p>

              <input type="range" className="w-full" />

              <div className="bg-blue-100 text-blue-600 text-center py-1 rounded-md text-sm">
                100km
              </div>
            </div>

            {/* JOB TYPE */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Job type</h3>

              <div className="space-y-3 mt-3">
                {["Freelancer","Full Time","Part Time","Temporary"].map((item,i)=>(
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <Toggle />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* DATE POSTED */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold">Date Posted</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <label className="flex items-center gap-2"><input type="radio" name="date" /> All</label>
              <label className="flex items-center gap-2"><input type="radio" name="date" /> Last Hour</label>
              <label className="flex items-center gap-2"><input type="radio" name="date" /> Last 24 Hour</label>
              <label className="flex items-center gap-2"><input type="radio" name="date" /> Last 7 Days</label>
              <label className="flex items-center gap-2"><input type="radio" name="date" /> Last 14 Days</label>
              <label className="flex items-center gap-2"><input type="radio" name="date" /> Last 30 Days</label>
            </div>
          </div>

            {/* EXPERIENCE */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Experience Level</h3>

              <div className="space-y-3 mt-2">
                {["Fresh","1 Year","2 Year","3 Year","4 Year"].map((item,i)=>(
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <Toggle />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>

              <p className="text-blue-600 text-sm cursor-pointer mt-2">
                + View More
              </p>
            </div>

            {/* SALARY */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Salary</h3>
              <input type="range" className="w-full" />
              <div className="bg-blue-100 text-blue-600 text-center py-1 rounded-md text-sm">
                $0 - $20000
              </div>
            </div>

            {/* TAGS */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2 text-sm">
                {["App","Administrative","Android","Wordpress","Design","React"].map((tag,i)=>(
                  <span key={i} className="bg-gray-100 px-3 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1">

            {/* JOB LIST */}
      <div className="flex-1 space-y-5">
        {jobs.map((job) => (
          <Link to={`/job/${job.id}`} key={job.id} className="block mb-5">
            <div className="border rounded-2xl p-6 flex gap-4 items-start hover:shadow-lg transition-all bg-white">

              <img src={job.image} alt="" className="w-14 h-14 rounded-xl object-cover" />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-gray-500 text-sm mt-2">
                  <span>{job.company}</span>
                  <span>{job.location}</span>
                  <span>{job.time}</span>
                  <span>{job.salary}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">{job.type}</span>
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">{job.level}</span>
                  <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-xs">{job.urgency}</span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}