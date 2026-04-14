import { useState } from "react";
import axios from "axios";

export default function MyResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file); 

      const res = await axios.put(
        "/api/user/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        My Resume
      </h1>
      <p className="text-gray-500 mt-2 mb-6">
        Upload your resume to apply for jobs
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm">

        {/* UPLOAD BOX */}
        <div className="flex items-center gap-6 mb-8">

          <div className="w-[250px] h-[140px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">

            <input
              type="file"
              id="resumeUpload"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label
              htmlFor="resumeUpload"
              className="cursor-pointer text-gray-500 text-sm text-center"
            >
              ↑ <br /> Browse Resume
            </label>

          </div>

          <div className="text-gray-400 text-sm">
            Upload your CV / Resume <br />
            Allowed formats: PDF, DOC, DOCX <br />
            Max size: 2MB
          </div>

        </div>

        {/* FILE NAME */}
        {file && (
          <p className="text-sm text-green-600 mb-4">
            Selected: {file.name}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload Resume"}
        </button>

      </div>
    </>
  );
}   