import { useState } from "react";

export default function MyProfile() {
  const [image, setImage] = useState(null);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        My Profile!
      </h1>
      <p className="text-gray-500 mt-2 mb-6">
        Ready to jump back in?
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm">

        {/* IMAGE */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-[200px] h-[120px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
            <input
              type="file"
              className="hidden"
              id="upload"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="upload" className="cursor-pointer text-gray-500 text-sm">
              ↑<br />Browse Logo
            </label>
          </div>

          <p className="text-gray-400 text-sm">
            Max file size is 1MB, Minimum dimension: 330x300 <br />
            Suitable files are .jpg & .png
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-5">
            <Input label="Full Name" />
            <Input label="Phone" />
            <Input label="Website" />
            <Select label="Experience" />
            <Select label="Education Levels" />
          </div>

          <div className="flex flex-col gap-5">
            <Input label="Job Title" />
            <Input label="Email address" />
            <Select label="Current Salary($)" />
            <Select label="Expected Salary($)" />
            <Select label="Age" />
          </div>

        </div>

        {/* LANGUAGES */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Languages</label>
          <input className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none" />
        </div>

        {/* CATEGORIES */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Categories</label>
          <div className="mt-2 bg-[#f5f7fc] p-3 rounded-lg"></div>
        </div>

        {/* ALLOW SEARCH */}
        <div className="mt-6">
          <Select label="Allow In Search & Listing" />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Description</label>
          <textarea className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg h-32 outline-none" />
        </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
          Save
        </button>

      </div>
    </>
  );
}

/* COMPONENTS */

function Input({ label }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none" />
    </div>
  );
}

function Select({ label }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <select className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none">
        <option value="">Select</option>
      </select>
    </div>
  );
}