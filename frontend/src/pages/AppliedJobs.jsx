import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAppliedJobs = async () => {
    try {
      let token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.get(
        "https://nexthire-i1hx.onrender.com/api/job/applied-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Error fetching applied jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  return (
    <div className="bg-[#f5f7fc] min-h-screen">

      {/* HEADER */}
      <div className="w-full h-[200px] bg-[#e6e8ee] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Applied Jobs
        </h2>
        <p className="text-gray-500 mt-3 text-sm">
          Home / Applied Jobs
        </p>
      </div>

      {/* MAIN */}
      <div className="lg:px-[0px] px-6 py-10">

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No applied jobs yet
          </p>
        ) : (
          <div className="space-y-5">

            {jobs.map((item, i) => {
              const job = item.appliedJobId;
              if (!job) return null; // safety

              return (
                <div
                  key={job._id || i}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-5"
                >
                  {/* LEFT */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {job.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {job.description?.slice(0, 100)}...
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-3">
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {job.address?.city || "N/A"}
                      </span>

                      <span>
                        ₹ {job.offeredSalary || "Not specified"}
                      </span>

                      <span>{job.jobType}</span>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                        {job.industryType}
                      </span>
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                        {job.careerLevel}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-600 px-4 py-2 rounded-lg text-sm">
                      Applied
                    </span>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}