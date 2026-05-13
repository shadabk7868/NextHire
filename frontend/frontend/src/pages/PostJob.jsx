import { useState } from "react";
import API from "../utils/api";

export default function Postjob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    email: "",
    jobType: "",
    specialization: "",
    offeredSalary: "",
    careerLevel: "",
    experience: "",
    industryType: "",
    qualification: "",
    deadlineData: "",
    city: "",
    state: "",
    country: "",
    fullAddress: "",
  });

  const [logo, setLogo] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("email", form.email);
      formData.append("jobType", form.jobType);
      formData.append("specialization", form.specialization);
      formData.append("offeredSalary", form.offeredSalary);
      formData.append("careerLevel", form.careerLevel);
      formData.append("experience", form.experience);
      formData.append("industryType", form.industryType);
      formData.append("qualification", form.qualification);
      formData.append("deadlineData", form.deadlineData);

      // address
      formData.append("address[city]", form.city);
      formData.append("address[state]", form.state);
      formData.append("address[country]", form.country);
      formData.append("address[fullAddress]", form.fullAddress);

      if (logo) {
        formData.append("companyLogo", logo);
      }

      const res = await API.post("/job/create-job", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);

      // reset form
      setForm({
        title: "",
        description: "",
        email: "",
        jobType: "",
        specialization: "",
        offeredSalary: "",
        careerLevel: "",
        experience: "",
        industryType: "",
        qualification: "",
        deadlineData: "",
        city: "",
        state: "",
        country: "",
        fullAddress: "",
      });

      setLogo(null);

    } catch (err) {
      alert(err?.response?.data?.message || "Error posting job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        Post a New Job
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        Fill all job details
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm space-y-5">

        {/*  */}
        <div>
          <label className="text-sm text-gray-600">Company Logo</label>
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            className="w-full mt-2 p-2 bg-[#f5f7fc] rounded-lg"
          />
        </div>

        <Input label="Job Title" name="title" value={form.title} onChange={handleChange} />

        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none h-32"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Email" name="email" value={form.email} onChange={handleChange} />
          <Input label="Job Type" name="jobType" value={form.jobType} onChange={handleChange} />
          <Input label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} />
          <Input label="Salary" name="offeredSalary" value={form.offeredSalary} onChange={handleChange} />
          <Input label="Career Level" name="careerLevel" value={form.careerLevel} onChange={handleChange} />
          <Input label="Experience (years)" name="experience" value={form.experience} onChange={handleChange} />
          <Input label="Industry Type" name="industryType" value={form.industryType} onChange={handleChange} />
          <Input label="Qualification" name="qualification" value={form.qualification} onChange={handleChange} />
          <Input label="Deadline Date" name="deadlineData" value={form.deadlineData} onChange={handleChange} />
        </div>

        {/* ADDRESS */}
        <h2 className="text-lg font-semibold mt-4">Job Location</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Country" name="country" value={form.country} onChange={handleChange} />
          <Input label="State" name="state" value={form.state} onChange={handleChange} />
          <Input label="City" name="city" value={form.city} onChange={handleChange} />
        </div>

        <div>
          <label className="text-sm text-gray-600">Full Address</label>
          <textarea
            name="fullAddress"
            value={form.fullAddress}
            onChange={handleChange}
            className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none h-24"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

      </div>
    </>
  );
}

/* INPUT COMPONENT */
function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none"
      />
    </div>
  );
}