import { useEffect, useState } from "react";
import API from "../utils/api";

export default function MyJobs({
  setActiveTab,
  setEditJobId,
  setSelectedApplicantsJobId,
}) {

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
        err?.response?.data?.message ||
        "Error fetching jobs";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  // DELETE JOB
  const deleteJob = async (jobId) => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.delete(
        `/job/delete-job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setJobs((prev) =>
        prev.filter((job) => job._id !== jobId)
      );

    } catch (err) {

      console.log(err);

      const message =
        err?.response?.data?.message ||
        "Error deleting job";

      alert(message);
    }
  };

  // EDIT JOB
  const editJob = (jobId) => {

    setEditJobId(jobId);

    setActiveTab("editjob");
  };

  // OPEN APPLICANTS PAGE
  const openApplicants = (jobId) => {

    setSelectedApplicantsJobId(jobId);

    setActiveTab("appliedCandidates");
  };

  useEffect(() => {
    getMyJobs();
  }, []);

  return (
    <div className="bg-[#f5f7fc] min-h-screen p-4 sm:p-6">

      <h2 className="text-2xl font-semibold mb-6">
        My Jobs
      </h2>

      {loading ? (

        <p className="text-center text-gray-500">
          Loading...
        </p>

      ) : jobs.length === 0 ? (

        <div className="bg-white p-10 rounded-xl shadow-sm text-center">

          <p className="text-gray-500 text-lg">
            You haven't posted any jobs yet
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-5 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between gap-5"
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

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-3">

                  {job?.industryType && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs">
                      {job.industryType}
                    </span>
                  )}

                  {job?.careerLevel && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                      {job.careerLevel}
                    </span>
                  )}

                  {/* APPLICANTS BUTTON */}
<span
  onClick={() => openApplicants(job._id)}
  className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs cursor-pointer hover:bg-purple-200"
>
  Applicants: {

    [
      ...new Set(
        (job?.applicants || []).map((item) => {

          if (typeof item === "object") {
            return (
              item?._id?.toString() ||
              item?.email
            );
          }

          return item?.toString();

        })
      ),
    ].filter(Boolean).length

  }
</span>

                </div>

                <p className="text-xs text-gray-400 mt-4">

                  Posted{" "}

                  {Math.floor(
                    (new Date() - new Date(job.createdAt)) /
                    (1000 * 60 * 60 * 24)
                  )}{" "}

                  days ago

                </p>

              </div>

              {/* RIGHT */}
              <div className="flex flex-row md:flex-col gap-3 justify-center">

                {/* EDIT BUTTON */}
                <button
                  onClick={() => editJob(job._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}