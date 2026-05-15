import MyProfile from "./MyProfile";
import MyResume from "./MyResume";
import AppliedJobs from "./AppliedJobs";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaFileUpload,
  FaBriefcase,
  FaSignOutAlt,
  FaClipboardList,
  FaBars,
} from "react-icons/fa";

function DashboardHome({ setActiveTab }) {


  const [stats, setStats] = useState({
    appliedJobs: 0,
    hasResume: false,
    profileComplete: false,
  });

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) return;

        const appliedRes = await axios.get(
          "https://nexthire-i1hx.onrender.com/api/job/applied-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileRes = await axios.get(
          "https://nexthire-i1hx.onrender.com/api/user/getprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = profileRes.data?.data;

        const appliedJobs = appliedRes.data?.data || [];

        const validAppliedJobs = appliedJobs.filter(
          (item) =>
            item?.appliedJobId &&
            item?.appliedJobId?._id // ensure job exists
        );

        setStats({
          appliedJobs: validAppliedJobs.length,
          hasResume: !!user?.resume?.url,
          profileComplete: !!user?.name && !!user?.phoneNumber,
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

  }, []);

  return (
    <>
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Welcome Back ...
      </h1>

      <p className="text-gray-500 mt-2 mb-8 text-sm md:text-base">
        Track your job activity here
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* APPLIED JOBS */}
        <div
          onClick={() => setActiveTab("appliedJobs")}
          className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition cursor-pointer"
        >

          <div>

            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              {stats.appliedJobs}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Applied Jobs
            </p>

          </div>

          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
            <FaBriefcase />
          </div>

        </div>

        {/* PROFILE STATUS */}
        <div
          onClick={() => setActiveTab("profile")}
          className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition cursor-pointer"
        >

          <div>

            <h2
              className={`text-2xl md:text-3xl font-bold ${stats.profileComplete
                ? "text-green-600"
                : "text-yellow-500"
                }`}
            >
              {stats.profileComplete
                ? "Complete"
                : "Incomplete"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Profile Status
            </p>

          </div>

          <div className="bg-green-100 p-4 rounded-xl text-green-600 text-2xl">
            <FaUser />
          </div>

        </div>

        {/* RESUME */}
        <div
          onClick={() => setActiveTab("resume")}
          className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition cursor-pointer"
        >

          <div>

            <h2
              className={`text-2xl md:text-3xl font-bold ${stats.hasResume
                ? "text-green-600"
                : "text-red-500"
                }`}
            >
              {stats.hasResume
                ? "Uploaded"
                : "Missing"}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Resume
            </p>

          </div>

          <div className="bg-purple-100 p-4 rounded-xl text-purple-600 text-2xl">
            <FaFileUpload />
          </div>

        </div>

      </div>
    </>
  );
}

export default function CandidateDashboard() {

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.clear();

    navigate("/");
  };

  const menuClass = (tab) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${activeTab === tab
      ? "bg-blue-100 text-blue-600"
      : "hover:bg-gray-100"
    }`;

  return (
    <div className="bg-[#f5f7fc] min-h-screen overflow-x-hidden">

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="flex pt-[80px] h-screen overflow-hidden">

        {/* SIDEBAR */}
        <div
          className={`bg-white min-h-screen fixed lg:static top-[80px] left-0 z-40 w-[270px] px-6 py-8 transition-all duration-300 shadow-md lg:shadow-none
          
${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
            }`}
        >

          <div className="flex flex-col gap-3 text-[15px] pt-10">

            {/* DASHBOARD */}
            <div
              onClick={() => {
                setActiveTab("dashboard");
                setSidebarOpen(false);
              }}
              className={menuClass("dashboard")}
            >
              <FaHome />
              <span>Dashboard</span>
            </div>

            {/* PROFILE */}
            <div
              onClick={() => {
                setActiveTab("profile");
                setSidebarOpen(false);
              }}
              className={menuClass("profile")}
            >
              <FaUser />
              <span>My Profile</span>
            </div>

            {/* RESUME */}
            <div
              onClick={() => {
                setActiveTab("resume");
                setSidebarOpen(false);
              }}
              className={menuClass("resume")}
            >
              <FaFileUpload />
              <span>My Resume</span>
            </div>

            {/* APPLIED JOBS */}
            <div
              onClick={() => {
                setActiveTab("appliedJobs");
                setSidebarOpen(false);
              }}
              className={menuClass("appliedJobs")}
            >
              <FaClipboardList />
              <span>Applied Jobs</span>
            </div>

            {/* LOGOUT */}
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-500 cursor-pointer transition"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </div>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 w-full lg:ml-0 px-4 sm:px-6 md:px-8 lg:px-10 pt-[80px] overflow-y-auto h-full">

          {/* MOBILE HAMBURGER */}
          <div className="lg:hidden fixed top-[90px] left-4 z-50">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white p-3 rounded-xl shadow-md text-xl"
            >
              <FaBars />
            </button>
          </div>

          {activeTab === "dashboard" && (
            <DashboardHome setActiveTab={setActiveTab} />
          )}
          {activeTab === "profile" && <MyProfile />}
          {activeTab === "resume" && <MyResume />}
          {activeTab === "appliedJobs" && <AppliedJobs />}

        </div>

      </div>
    </div>
  );
}