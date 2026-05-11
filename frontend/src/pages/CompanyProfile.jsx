import { useState } from "react";

export default function CompanyProfile() {
  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        Company Profile
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-sm mt-6">


        <div className="mb-8">
          <label className="text-sm text-gray-600">Company Logo</label>

          <div className="mt-2 w-[250px] h-[140px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">

            <input
              type="file"
              id="logoUpload"
              className="hidden"
              onChange={(e) => setLogo(e.target.files[0])}
            />

            <label htmlFor="logoUpload" className="cursor-pointer text-gray-500 text-sm text-center">
              ↑ <br /> Browse Logo
            </label>

          </div>

          {logo && (
            <p className="text-green-600 text-sm mt-2">
              Selected: {logo.name}
            </p>
          )}
        </div>


        <div className="mb-8">
          <label className="text-sm text-gray-600">Cover Image</label>

          <div className="mt-2 w-[250px] h-[140px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">

            <input
              type="file"
              id="coverUpload"
              className="hidden"
              onChange={(e) => setCover(e.target.files[0])}
            />

            <label htmlFor="coverUpload" className="cursor-pointer text-gray-500 text-sm text-center">
              ↑ <br /> Browse Cover
            </label>

          </div>

          {cover && (
            <p className="text-green-600 text-sm mt-2">
              Selected: {cover.name}
            </p>
          )}
        </div>

        {/* BASIC */}
        <div className="grid grid-cols-2 gap-6">
          <Input label="Company Name" />
          <Input label="Email" />
          <Input label="Phone Number" />
          <Input label="Website" />
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <Input label="Category" />
          <Input label="Industry Type" />
          <Input label="Founded In" type="date" />
          <Input label="Team Size" />
        </div>

        {/* ADDRESS */}
        <div className="mt-6 grid grid-cols-2 gap-6">
          <Input label="Country" />
          <Input label="State" />
          <Input label="City" />
          <Input label="Area" />
        </div>

        <div className="mt-6">
          <Input label="Full Address" />
        </div>

        {/* ABOUT */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">About Company</label>
          <textarea className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg h-32 outline-none" />
        </div>

        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Save Profile
        </button>

      </div>
    </>
  );
}

/* INPUT */
function Input({ label, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg outline-none"
      />
    </div>
  );
}