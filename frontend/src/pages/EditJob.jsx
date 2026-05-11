import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";

export default function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    jobType: "",
    offeredSalary: "",
    industryType: "",
    careerLevel: "",
    city: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // FETCH JOB
  const getSingleJob = async () => {
    try {

      const res = await API.get("/job/getjob");

      const foundJob = res.data.data.find(
        (job) => job._id === id
      );

      if (!foundJob) {
        alert("Job not found");
        return;
      }

      setForm({
        title: foundJob.title || "",
        description: foundJob.description || "",
        jobType: foundJob.jobType || "",
        offeredSalary: foundJob.offeredSalary || "",
        industryType: foundJob.industryType || "",
        careerLevel: foundJob.careerLevel || "",
        city: foundJob?.address?.city || "",
      });

    } catch (err) {
      console.log(err);
      alert("Error fetching job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleJob();
  }, []);

  // UPDATE JOB
  const updateJob = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await API.put(
        `/job/update-job/${id}`,
        {
          title: form.title,
          description: form.description,
          jobType: form.jobType,
          offeredSalary: form.offeredSalary,
          industryType: form.industryType,
          careerLevel: form.careerLevel,

          address: {
            city: form.city,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      navigate("/employers-dashboard");

    } catch (err) {
      console.log(err);

      const message =
        err?.response?.data?.message ||
        "Error updating job";

      alert(message);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-10">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#f5f7fc] min-h-screen p-4 sm:p-6">

        <h1 className="text-3xl font-semibold text-gray-800">
          Edit Job
        </h1>

        <p className="text-gray-500 mt-2 mb-6">
          Update your job details
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-5">

          <Input
            label="Job Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-gray-600">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input
              label="Job Type"
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
            />

            <Input
              label="Salary"
              name="offeredSalary"
              value={form.offeredSalary}
              onChange={handleChange}
            />

            <Input
              label="Industry Type"
              name="industryType"
              value={form.industryType}
              onChange={handleChange}
            />

            <Input
              label="Career Level"
              name="careerLevel"
              value={form.careerLevel}
              onChange={handleChange}
            />

            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={updateJob}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Update Job
          </button>

        </div>
      </div>
    </>
  );
}

/* INPUT COMPONENT */
function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none"
      />
    </div>
  );
}