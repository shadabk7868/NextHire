import Navbar from "../components/Navbar";
import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaLock,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";

export default function CandidateDashboard() {
  return (
    <div className="bg-[#f5f7fc] min-h-screen">

      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-[300px] bg-white min-h-screen px-8 py-8">

          <div className="flex flex-col gap-3 text-m">

            {/* ACTIVE */}
            <div className="flex items-center gap-3 bg-blue-100 text-blue-600 px-4 py-3 rounded-lg cursor-pointer">
              <FaHome />
              <span>Dashboard</span>
            </div>

            {/* MENU ITEMS */}
            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaUser />
              <span>Company Profile</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaPlusCircle />
              <span>Post A New Job</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaBriefcase />
              <span>Manage Jobs</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaUsers />
              <span>All Applicants</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaFileAlt />
              <span>Shortlisted Resumes</span>
            </div>


            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaLock />
              <span>Change Password</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaSignOutAlt />
              <span>Logout</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 text-red-500 cursor-pointer">
              <FaTrash />
              <span>Delete Profile</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 px-10 py-8">

          {/* HEADING */}
          <h1 className="text-3xl font-semibold text-gray-800">
            Howdy, Jerome!!
          </h1>
          <p className="text-gray-500 mt-2 mb-8">
            Ready to jump back in?
          </p>

          {/* CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* POSTED JOBS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
              
              <div>
                <h2 className="text-3xl font-bold text-blue-600">22</h2>
                <p className="text-gray-500 text-sm mt-1">Posted Jobs</p>
              </div>

              <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-xl">
                <FaBriefcase />
              </div>

            </div>

            {/* APPLICATIONS */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
              
              <div>
                <h2 className="text-3xl font-bold text-red-500">9382</h2>
                <p className="text-gray-500 text-sm mt-1">Applications</p>
              </div>

              <div className="bg-red-100 p-4 rounded-xl text-red-500 text-xl">
                <FaFileAlt />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}