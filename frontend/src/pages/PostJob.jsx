import { useState } from "react";

export default function Postjob() {
  const [image, setImage] = useState(null);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        Post a New Job!
      </h1>
      <p className="text-gray-500 mt-2 mb-6">
        Ready to jump back in?
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm">


          {/* JOb title */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Job Title</label>
          <input className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none" />
        </div>

        
        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Description</label>
          <textarea className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg h-32 outline-none" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-5">
            <Input label="Full Name" />
            <Input label="Phone" />
            <Input label="Website" />
            <Input label="Experience" />
            <Input label="Education Levels" />
          </div>

          <div className="flex flex-col gap-5">
            <Input label="Job Title" />
            <Input label="Email address" />
            <Input label="Current Salary($)" />
            <Input label="Expected Salary($)" />
            <Input label="Age" />
          </div>

        </div>

      
        {/* CATEGORIES */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Categories   </label>
          <input className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none" />
        </div>

        {/* ALLOW SEARCH */}
        <div className="mt-6">
          <Select label="Allow In Search & Listing" />
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