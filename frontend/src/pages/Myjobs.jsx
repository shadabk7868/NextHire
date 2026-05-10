import { useEffect, useState } from "react";
import API from "../utils/api";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await API.get("/job/my-jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data.data || []);
    } catch (err) {
      console.log(err);

      const message =
        err?.response?.data?.message || "Error fetching jobs";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await API.delete(`/job/delete-job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      // UI update instantly
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.log(err);

      const message =
        err?.response?.data?.message || "Error deleting job";

      alert(message);
    }
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        My Jobs
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500">No jobs posted</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {job.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {job.description?.slice(0, 80)}...
                </p>

                <div className="flex gap-4 text-sm text-gray-500 mt-3 flex-wrap">
                  <span>
                    📍 {job?.address?.city || "N/A"}
                  </span>

                  <span>
                    ₹ {job?.offeredSalary || "Not specified"}
                  </span>

                  <span>
                    {job?.jobType || "N/A"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}