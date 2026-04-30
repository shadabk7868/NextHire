import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaBriefcase,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import CompanyProfile from "../pages/CompanyProfile";
import PostJob from "../pages/PostJob";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
  const [stats, setStats] = useState({
    postedJobs: 0,
    activeJobs: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "https://nexthire-i1hx.onrender.com/api/job/getjob",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const jobs = res.data?.data || [];

        const activeJobs = jobs.filter(
          (job) => job.status !== "closed"
        ).length;

        setStats({
          postedJobs: jobs.length,
          activeJobs: activeJobs,
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome Back ...
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Manage your hiring activity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* POSTED JOBS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              {stats.postedJobs}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Posted Jobs</p>
          </div>

          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
            <FaBriefcase />
          </div>
        </div>

        {/* ACTIVE JOBS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <h2 className="text-4xl font-bold text-purple-600">
              {stats.activeJobs}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Active Jobs</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-xl text-purple-600 text-2xl">
            <FaBriefcase />
          </div>
        </div>

      </div>
    </>
  );
}

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  const menuClass = (tab) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
      activeTab === tab
        ? "bg-blue-100 text-blue-600"
        : "hover:text-blue-600"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <div className="w-[300px] bg-white min-h-screen px-8 py-8">
          <div className="flex flex-col gap-3 text-m">

            <div
              onClick={() => setActiveTab("dashboard")}
              className={menuClass("dashboard")}
            >
              <FaHome />
              <span>Dashboard</span>
            </div>

            <div
              onClick={() => setActiveTab("post")}
              className={menuClass("post")}
            >
              <FaPlusCircle />
              <span>Post A New Job</span>
            </div>

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 hover:text-red-500 cursor-pointer"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 px-10 py-8">
          {activeTab === "dashboard" && <DashboardHome />}
          {activeTab === "post" && <PostJob />}
          {activeTab === "profile" && <CompanyProfile />}
        </div>

      </div>
    </div>
  );
}