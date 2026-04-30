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
} from "react-icons/fa";

function DashboardHome() {
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
          "https://nexthire-i1hx.onrender.com/api/user/applied-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const profileRes = await axios.get(
          "https://nexthire-i1hx.onrender.com/api/user/getprofile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const user = profileRes.data?.data;

        setStats({
          appliedJobs: appliedRes.data?.data?.length || 0,
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
      <h1 className="text-3xl font-semibold text-gray-800">
        Welcome Back ...
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        Track your job activity here
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              {stats.appliedJobs}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Applied Jobs</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl text-blue-600 text-2xl">
            <FaBriefcase />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${stats.profileComplete ? "text-green-600" : "text-yellow-500"}`}>
              {stats.profileComplete ? "Complete" : "Incomplete"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Profile Status</p>
          </div>
          <div className="p-4 rounded-xl text-2xl">
            <FaUser />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${stats.hasResume ? "text-green-600" : "text-red-500"}`}>
              {stats.hasResume ? "Uploaded" : "Missing"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Resume</p>
          </div>
          <div className="p-4 rounded-xl text-2xl">
            <FaFileUpload />
          </div>
        </div>

      </div>
    </>
  );
}

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
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
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
      activeTab === tab ? "bg-blue-100 text-blue-600" : "hover:text-blue-600"
    }`;

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      <Navbar />

      <div className="flex">

        <div className="w-[300px] bg-white min-h-screen px-8 py-8">
          <div className="flex flex-col gap-3 text-m">

            <div onClick={() => setActiveTab("dashboard")} className={menuClass("dashboard")}>
              <FaHome /><span>Dashboard</span>
            </div>

            <div onClick={() => setActiveTab("profile")} className={menuClass("profile")}>
              <FaUser /><span>My Profile</span>
            </div>

            <div onClick={() => setActiveTab("resume")} className={menuClass("resume")}>
              <FaFileUpload /><span>My Resume</span>
            </div>

            <div onClick={() => setActiveTab("appliedJobs")} className={menuClass("appliedJobs")}>
              <FaClipboardList /><span>Applied Jobs</span>
            </div>

            <div onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 hover:text-red-500 cursor-pointer">
              <FaSignOutAlt /><span>Logout</span>
            </div>

          </div>
        </div>

        <div className="flex-1 px-10 py-8">
          {activeTab === "dashboard" && <DashboardHome />}
          {activeTab === "profile" && <MyProfile />}
          {activeTab === "resume" && <MyResume />}
          {activeTab === "appliedJobs" && <AppliedJobs />}
        </div>

      </div>
    </div>
  );
}