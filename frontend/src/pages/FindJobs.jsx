import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import API from "../../../backend/utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [showAuth, setShowAuth] = useState(false);

  const getJobs = async () => {
    try {
      const res = await API.get("/job/getjob");
      setJobs(res.data.data || []);
    } catch (err) {
      console.log(err);
      alert("Error fetching jobs");
    }
  };

  const getAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/job/applied-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const ids = res.data.data
        .map((item) => item.appliedJobId?._id)
        .filter(Boolean);

      setAppliedJobs(ids);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getJobs(), getAppliedJobs()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setShowAuth(true);
        return;
      }

      const res = await API.post(
        `/job/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      if (res.data.success) {
        setAppliedJobs((prev) =>
          prev.includes(jobId) ? prev : [...prev, jobId]
        );
      }
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Error applying job";
      alert(message);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title?.toLowerCase().includes(search.toLowerCase()) &&
      (location === "" ||
        job?.address?.city?.toLowerCase().includes(location.toLowerCase())) &&
      (salary === "" || job?.offeredSalary >= Number(salary))
    );
  });

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      <Navbar />

      {/* HEADER */}
      <div className="w-full h-[160px] sm:h-[180px] md:h-[200px] bg-[#e6e8ee] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Find Jobs
        </h2>
        <p className="text-gray-500 mt-2 text-xs sm:text-sm">
          Home / Jobs
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-col md:flex-row gap-3 md:gap-4">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:flex-1 border p-2 sm:p-3 rounded-lg outline-none text-sm"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full md:flex-1 border p-2 sm:p-3 rounded-lg outline-none text-sm"
          />

          <select
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full md:flex-1 border p-2 sm:p-3 rounded-lg outline-none text-sm"
          >
            <option value="">Salary</option>
            <option value="10000">10k+</option>
            <option value="20000">20k+</option>
            <option value="50000">50k+</option>
          </select>

        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {loading ? (
          <p className="text-center text-gray-500 text-sm">Loading...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No jobs found
          </p>
        ) : (
          <div className="space-y-4 sm:space-y-5">

            {filteredJobs.map((job) => {
              const isApplied = appliedJobs.includes(job._id);

              return (
                <Link
                  to={`/job/${job._id}`}
                  key={job._id}
                  className="block"
                >
                  <div className="bg-white p-4 sm:p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-4 sm:gap-5">

                    {/* LEFT */}
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold">
                        {job.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {job.description?.slice(0, 100)}...
                      </p>

                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-3">
                        <span>📍 {job?.address?.city || "N/A"}</span>
                        <span>₹ {job?.offeredSalary || "0"}</span>
                        <span>{job?.jobType || "N/A"}</span>
                      </div>

                      <div className="flex gap-2 mt-3 flex-wrap">
                        {job?.industryType && (
                          <span className="bg-blue-100 text-blue-600 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs">
                            {job.industryType}
                          </span>
                        )}

                        {job?.careerLevel && (
                          <span className="bg-green-100 text-green-600 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs">
                            {job.careerLevel}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* RIGHT */}
                    <div
                      className="flex items-center justify-start md:justify-center"
                      onClick={(e) => e.preventDefault()}
                    >
                      {isApplied ? (
                        <span className="bg-green-100 text-green-600 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm">
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => applyJob(job._id)}
                          className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>

                  </div>
                </Link>
              );
            })}

          </div>
        )}
      </div>

      <Footer />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}