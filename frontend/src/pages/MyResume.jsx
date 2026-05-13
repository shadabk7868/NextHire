import { useState, useEffect } from "react";
import axios from "axios";

export default function MyResume() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          "https://nexthire-i1hx.onrender.com/api/user/getprofile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const url = res.data.data?.resume?.url;

        if (url) {
          setResumeUrl(url);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();

  }, []);

  const handleUpload = async () => {

    if (!file) {
      alert("Please select a file");
      return;
    }

    /* FILE TYPE CHECK */

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, DOC, DOCX files allowed");
      return;
    }

    /* FILE SIZE CHECK */

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const res = await axios.put(
        "https://nexthire-i1hx.onrender.com/api/user/update-resume",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.message);

      setResumeUrl(
        res.data?.data?.resume?.url || null
      );

      setFile(null);

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

        <div className="flex items-center gap-6 mb-8 flex-wrap">

          <div className="w-[250px] h-[140px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition bg-[#f9fafb]">

            <input
              key={file ? file.name : "empty"}
              type="file"
              id="resumeUpload"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label
              htmlFor="resumeUpload"
              className="cursor-pointer text-gray-500 text-sm text-center px-3"
            >
              {file
                ? file.name
                : "↑ Browse Resume"}
            </label>

          </div>

          <div className="text-gray-400 text-sm leading-7">

            Upload your CV / Resume <br />

            Allowed formats:
            PDF, DOC, DOCX <br />

            Max size: 2MB

          </div>

        </div>

        {/* SELECTED FILE */}

        {file && (
          <p className="text-sm text-green-600 mb-4">
            Selected: {file.name}
          </p>
        )}

        {/* BUTTONS */}

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Uploading..."
              : resumeUrl
                ? "Update Resume"
                : "Upload Resume"}
          </button>

          {/* VIEW RESUME */}

          {resumeUrl && (
            <a
              href={resumeUrl.replace(
                "http://localhost:4000",
                "https://nexthire-i1hx.onrender.com"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              View Resume
            </a>
          )}

        </div>

      </div>
    </>
  );
}