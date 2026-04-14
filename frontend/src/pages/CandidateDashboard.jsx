import MyProfile from "./MyProfile";
import MyResume from "./MyResume";
import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaFileUpload,
  FaBriefcase,
  FaBell,
  FaHeart,
  FaFileAlt,
  FaLock,
  FaSignOutAlt,
  FaTrash,
  FaClipboardList,
} from "react-icons/fa";


function DashboardHome() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        Howdy, Jerome!!
      </h1>
      <p className="text-gray-500 mt-2 mb-8">
        Ready to jump back in?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold text-blue-600">22</h2>
            <p className="text-gray-500 text-sm mt-1">Applied Jobs</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-xl">
            <FaBriefcase />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-500">93</h2>
            <p className="text-gray-500 text-sm mt-1">Job Alerts</p>
          </div>
          <div className="bg-red-100 p-4 rounded-xl text-red-500 text-xl">
            <FaFileAlt />
          </div>
        </div>

      </div>
    </>
  );
}


export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuClass = (tab) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
      activeTab === tab
        ? "bg-blue-100 text-blue-600"
        : "hover:text-blue-600"
    }`;

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      <Navbar />

      <div className="flex">

   
        <div className="w-[300px] bg-white min-h-screen px-8 py-8">

          <div className="flex flex-col gap-3 text-m">

            <div onClick={() => setActiveTab("dashboard")} className={menuClass("dashboard")}>
              <FaHome />
              <span>Dashboard</span>
            </div>

            <div onClick={() => setActiveTab("profile")} className={menuClass("profile")}>
              <FaUser />
              <span>My Profile</span>
            </div>

            <div onClick={() => setActiveTab("resume")} className={menuClass("resume")}>
           <FaFileUpload />
           <span>My Resume</span>
           </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaClipboardList />
              <span>Applied Jobs</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaBell />
              <span>Job Alert</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaHeart />
              <span>Shortlisted Jobs</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 hover:text-blue-600 cursor-pointer">
              <FaFileAlt />
              <span>Cv Manager</span>
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


        <div className="flex-1 px-10 py-8">

          {activeTab === "dashboard" && <DashboardHome />}
          {activeTab === "profile" && <MyProfile />}
          {activeTab === "resume" && <MyResume />}

        </div>

      </div>
    </div>
  );
}