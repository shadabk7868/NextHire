import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaBriefcase,
  FaUsers,
  FaBars,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import AppliedCandidates from "./AppliedCandidates";
import CompanyProfile from "../pages/CompanyProfile";
import PostJob from "../pages/PostJob";
import MyJobs from "./Myjobs";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const [stats, setStats] = useState({
    postedJobs: 0,
    totalApplicants: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://nexthire-i1hx.onrender.com/api/job/getjob",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jobs = res.data?.data || [];

        // TOTAL APPLICANTS CALCULATION
        const totalApplicants = jobs.reduce((acc, job) => {
          return acc + (job?.applicants?.length || 0);
        }, 0);

        setStats({
          postedJobs: jobs.length,
          totalApplicants,
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
        Manage your hiring activity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* POSTED JOBS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
              {stats.postedJobs}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Posted Jobs
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
            <FaBriefcase />
          </div>

        </div>

        {/* TOTAL APPLICANTS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-green-600">
              {stats.totalApplicants}
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Total Applicants
            </p>
          </div>

          <div className="bg-green-100 p-4 rounded-xl text-green-600 text-2xl">
            <FaUsers />
          </div>

        </div>

      </div>
    </>
  );
}

export default function EmployerDashboard() {

  const [searchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "dashboard"
  );

  useEffect(() => {
    setActiveTab(searchParams.get("tab") || "dashboard");
  }, [searchParams]);

  const selectedJobId = searchParams.get("jobId");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, []);

  const menuClass = (tab) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${activeTab === tab
      ? "bg-blue-100 text-blue-600"
      : "hover:bg-gray-100"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.clear();

    navigate("/");
  };

  return (
    <div className="bg-[#f5f7fc] min-h-screen overflow-x-hidden">

      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* MAIN */}
      <div className="flex pt-[80px]">

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

            {/* POST JOB */}
            <div
              onClick={() => {
                setActiveTab("post");
                setSidebarOpen(false);
              }}
              className={menuClass("post")}
            >
              <FaPlusCircle />
              <span>Post A New Job</span>
            </div>

            {/* MY JOBS */}
            <div
              onClick={() => {
                setActiveTab("myjobs");
                setSidebarOpen(false);
              }}
              className={menuClass("myjobs")}
            >
              <FaBriefcase />
              <span>My Jobs</span>
            </div>

            {/* APPLIED CANDIDATES */}
            <div
              onClick={() => {
                setActiveTab("appliedCandidates");
                setSidebarOpen(false);
              }}
              className={menuClass("appliedCandidates")}
            >
              <FaUsers />
              <span>Applicants</span>
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
        <div className="flex-1 w-full lg:ml-0 px-4 sm:px-6 md:px-8 lg:px-10 pt-[80px]">

          {/* MOBILE HAMBURGER */}
          <div className="lg:hidden fixed top-[90px] left-4 z-50">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white p-3 rounded-xl shadow-md text-xl"
            >
              <FaBars />
            </button>
          </div>


          {activeTab === "dashboard" && <DashboardHome />}
          {activeTab === "post" && <PostJob />}
          {activeTab === "profile" && <CompanyProfile />}
          {activeTab === "myjobs" && <MyJobs />}
          {activeTab === "appliedCandidates" && (<AppliedCandidates jobId={selectedJobId} />)}

        </div>

      </div>
    </div>
  );
}