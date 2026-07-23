// import { useEffect, useState } from "react";
// import API from "../utils/api";

// export default function AppliedCandidates({ jobId }) {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [analyzing, setAnalyzing] = useState(false);
// const [analysis, setAnalysis] = useState(null);

//   const fetchAppliedCandidates = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await API.get("/job/my-jobs-applicants", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const jobsData = res.data.data || [];

//       setJobs(jobsData);

//       // auto select job OR filtered jobId
//       if (jobId) {
//         const found = jobsData.find((j) => j._id?.toString() === jobId);
//         setSelectedJob(found || jobsData[0] || null);
//       } else {
//         setSelectedJob(jobsData[0] || null);
//       }

//     } catch (err) {
//       console.log(err);
//       alert("Error fetching applicants");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppliedCandidates();
//   }, [jobId]);

//   useEffect(() => {
//     if (!jobs.length) return;

//     let jobToSelect = jobs[0];

//     if (jobId) {
//       const found = jobs.find((j) => j._id === jobId);
//       if (found) jobToSelect = found;
//     }

//     setSelectedJob(jobToSelect);
//   }, [jobs, jobId]);

//   const uniqueApplicants = [
//     ...new Map(
//       (selectedJob?.applicants || []).map((item) => {

//         const key =
//           item?._id?.toString() ||
//           item?.email;

//         return [key, item];

//       })
//     ).values(),
//   ];

//   const applicantsCount = uniqueApplicants.length;

//   // SAFE IMAGE HANDLER (no backend change needed)
//   const getImage = (img) => {
//     if (!img) {
//       return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
//     }

//     // if image is string
//     if (typeof img === "string") {

//       // already full url
//       if (img.startsWith("http")) {
//         return img.replace(
//           "http://localhost:4000",
//           "https://nexthire-i1hx.onrender.com"
//         );
//       }

//       // uploads filename
//       return `https://nexthire-i1hx.onrender.com/uploads/${img}`;
//     }

//     // if object contains url
//     if (img.url) {
//       return img.url.replace(
//         "http://localhost:4000",
//         "https://nexthire-i1hx.onrender.com"
//       );
//     }

//     // if object contains filename
//     if (img.filename) {
//       return `https://nexthire-i1hx.onrender.com/uploads/${img.filename}`;
//     }

//     return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
//   };

//   const analyzeResume = async (candidate) => {
//   try {
//     setAnalyzing(true);

//     const token = localStorage.getItem("token");

//     const res = await API.post(
//       "/ai/analyze",
//       {
//         resumeUrl: candidate.resume.url,
//         jobDescription: selectedJob.description,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setAnalysis(res.data.data);

//   } catch (err) {
//     console.log(err);
//     alert("AI Analysis Failed");
//   } finally {
//     setAnalyzing(false);
//   }
// };

//   return (
//     <div className="bg-[#f5f7fc] min-h-screen p-4 md:p-6">

//       <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
//         Applied Candidates
//       </h1>

//       <p className="text-gray-500 mt-2 mb-6">
//         Select a job to view applicants
//       </p>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading...</p>
//       ) : jobs.length === 0 ? (
//         <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
//           <p className="text-gray-500">No applicants yet</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

//           {/* LEFT - JOB LIST */}
//           <div className="bg-white rounded-2xl shadow-sm p-4 h-fit">

//             <h2 className="text-xl font-bold mb-4">
//               Your Jobs
//             </h2>

//             <div className="space-y-3">

//               {jobs.map((job) => (
//                 <div
//                   key={job._id}
//                   onClick={() => setSelectedJob(job)}
//                   className={`p-4 rounded-xl cursor-pointer transition border
//                     ${selectedJob?._id === job._id
//                       ? "bg-blue-100 border-blue-400"
//                       : "hover:bg-gray-50"
//                     }`}
//                 >
//                   <h3 className="font-semibold text-sm">
//                     {job.title}
//                   </h3>

//                   <p className="text-xs text-gray-500 mt-1">
//                     {
//                       [
//                         ...new Set(
//                           (job?.applicants || []).map((item) => {

//                             if (typeof item === "object") {
//                               return (
//                                 item?._id?.toString() ||
//                                 item?.email
//                               );
//                             }

//                             return item?.toString();

//                           })
//                         ),
//                       ].filter(Boolean).length
//                     } Applicants
//                   </p>
//                 </div>
//               ))}

//             </div>
//           </div>

//           {/* RIGHT - CANDIDATES */}
//           <div className="lg:col-span-3">

//             <div className="mb-6">
//               <h2 className="text-xl md:text-2xl font-bold text-gray-800">
//                 {selectedJob?.title || "Select Job"}
//               </h2>

//               <p className="text-gray-500 text-sm mt-1">
//                 {applicantsCount} Applicants
//               </p>
//             </div>

//             {!selectedJob || selectedJob?.applicants?.length === 0 ? (
//               <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
//                 <p className="text-gray-500">
//                   No candidates applied yet
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 {uniqueApplicants.map((candidate) => (
//                   <div
//                     key={candidate._id}
//                     className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
//                   >

//                     {/* TOP */}
//                     <div className="flex items-center gap-4">

//                       <img
//                         src={getImage(candidate.profileImage)}
//                         alt="profile"
//                         className="w-14 h-14 rounded-full object-cover"
//                       />

//                       <div>
//                         <h3 className="text-lg font-semibold">
//                           {candidate?.name || "No Name"}
//                         </h3>

//                         <p className="text-sm text-gray-500">
//                           {candidate?.jobTitle || "Candidate"}
//                         </p>
//                       </div>

//                     </div>

//                     {/* DETAILS */}
//                     <div className="mt-4 text-sm text-gray-600 space-y-2">

//                       <div className="grid grid-cols-2 gap-2">

//                         <p className="truncate">
//                           <span className="font-medium">Email:</span><br />
//                           {candidate?.email || "N/A"}
//                         </p>

//                         <p>
//                           <span className="font-medium">Phone:</span><br />
//                           {candidate?.phoneNumber || "N/A"}
//                         </p>

//                         <p>
//                           <span className="font-medium">Experience:</span><br />
//                           {candidate?.experience || "N/A"} yrs
//                         </p>

//                         <p>
//                           <span className="font-medium">Education:</span><br />
//                           {candidate?.educationLevel || "N/A"}
//                         </p>

//                       </div>

//                     </div>

//                     {/* SKILLS */}
//                     {/* SKILLS */}
//                     {Array.isArray(candidate?.skills) &&
//                       candidate.skills.length > 0 && (
//                         <div className="flex flex-wrap gap-2 mt-4">
//                           {candidate.skills.map((skill, i) => (
//                             <span
//                               key={i}
//                               className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs"
//                             >
//                               {skill}
//                             </span>
//                           ))}
//                         </div>
//                       )}

//                     {/* RESUME */}
//                     {candidate?.resume?.url && (
//                       <a
//                         href={candidate.resume.url.replace(
//                           "http://localhost:4000",
//                           "https://nexthire-i1hx.onrender.com"
//                         )}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
//                       >
//                         View Resume
//                       </a>
//                     )}

//                     <button
//   onClick={() => analyzeResume(candidate)}
//   disabled={analyzing}
//   className="inline-block mt-3 ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
// >
//   {analyzing ? "Analyzing..." : "Analyze Resume"}
// </button>

// {analysis && (
//   <div className="mt-4 p-4 rounded-lg bg-gray-100">
//     <h3 className="font-bold text-lg">
//       ATS Score: {analysis.score}%
//     </h3>

//     <p className="mt-2">
//       <b>Summary:</b> {analysis.summary}
//     </p>

//     <p className="mt-2">
//       <b>Recommendation:</b> {analysis.recommendation}
//     </p>

//     <p className="mt-2">
//       <b>Matched Skills:</b>{" "}
//       {analysis.matchedSkills.join(", ")}
//     </p>

//     <p className="mt-2">
//       <b>Missing Skills:</b>{" "}
//       {analysis.missingSkills.join(", ")}
//     </p>
//   </div>
// )}

//                   </div>
//                 ))}

//               </div>
//             )}

//           </div>

//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import API from "../utils/api";

export default function AppliedCandidates({ jobId }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analysisResults, setAnalysisResults] = useState({});
  const [loadingCandidate, setLoadingCandidate] = useState(null);

  const fetchAppliedCandidates = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/job/my-jobs-applicants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const jobsData = res.data.data || [];

      setJobs(jobsData);

      // auto select job OR filtered jobId
      if (jobId) {
        const found = jobsData.find((j) => j._id?.toString() === jobId);
        setSelectedJob(found || jobsData[0] || null);
      } else {
        setSelectedJob(jobsData[0] || null);
      }

    } catch (err) {
      console.log(err);
      alert("Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedCandidates();
  }, [jobId]);

  useEffect(() => {
    if (!jobs.length) return;

    let jobToSelect = jobs[0];

    if (jobId) {
      const found = jobs.find((j) => j._id === jobId);
      if (found) jobToSelect = found;
    }

    setSelectedJob(jobToSelect);
  }, [jobs, jobId]);

  const uniqueApplicants = [
    ...new Map(
      (selectedJob?.applicants || []).map((item) => {

        const key =
          item?._id?.toString() ||
          item?.email;

        return [key, item];

      })
    ).values(),
  ];

  const applicantsCount = uniqueApplicants.length;

  // SAFE IMAGE HANDLER (no backend change needed)
  const getImage = (img) => {
    if (!img) {
      return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    }

    // if image is string
    if (typeof img === "string") {

      // already full url
      if (img.startsWith("http")) {
        return img.replace(
          "http://localhost:4000",
          "https://nexthire-i1hx.onrender.com"
        );
      }

      // uploads filename
      return `https://nexthire-i1hx.onrender.com/uploads/${img}`;
    }

    // if object contains url
    if (img.url) {
      return img.url.replace(
        "http://localhost:4000",
        "https://nexthire-i1hx.onrender.com"
      );
    }

    // if object contains filename
    if (img.filename) {
      return `https://nexthire-i1hx.onrender.com/uploads/${img.filename}`;
    }

    return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  };

  const analyzeResume = async (candidate) => {
    const analysisKey = `${selectedJob?._id}-${candidate._id}`;
    try {
      if (!candidate?.resume?.url) {
        alert("Resume not uploaded");
        return;
      }

      setLoadingCandidate(candidate._id);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/analyze",
        {
          resumeUrl: candidate.resume.url,
          jobDescription:
            selectedJob?.description ||
            selectedJob?.title ||
            "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysisResults((prev) => ({
        ...prev,
        [analysisKey]: res.data.data,
      }));
    } catch (err) {
      console.log(err);
      alert("Analysis Failed");
    } finally {
      setLoadingCandidate(null);
    }
  };


  return (
    <div className="bg-[#f5f7fc] min-h-screen p-4 md:p-6">

      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Applied Candidates
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        Select a job to view applicants
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
          <p className="text-gray-500">No applicants yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* LEFT - JOB LIST */}
          <div className="bg-white rounded-2xl shadow-sm p-4 h-fit">

            <h2 className="text-xl font-bold mb-4">
              Your Jobs
            </h2>

            <div className="space-y-3">

              {jobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 rounded-xl cursor-pointer transition border
                    ${selectedJob?._id === job._id
                      ? "bg-blue-100 border-blue-400"
                      : "hover:bg-gray-50"
                    }`}
                >
                  <h3 className="font-semibold text-sm">
                    {job.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {
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
                    } Applicants
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* RIGHT - CANDIDATES */}
          <div className="lg:col-span-3">

            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {selectedJob?.title || "Select Job"}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {applicantsCount} Applicants
              </p>
            </div>

            {!selectedJob || selectedJob?.applicants?.length === 0 ? (
              <div className="bg-white p-10 rounded-2xl shadow-sm text-center">
                <p className="text-gray-500">
                  No candidates applied yet
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {uniqueApplicants.map((candidate) => {

  const analysisKey = `${selectedJob?._id}-${candidate._id}`;

  return (
                  <div
                    key={candidate._id}
                    className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                  >

                    {/* TOP */}
                    <div className="flex items-center gap-4">

                      <img
                        src={getImage(candidate.profileImage)}
                        alt="profile"
                        className="w-14 h-14 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="text-lg font-semibold">
                          {candidate?.name || "No Name"}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {candidate?.jobTitle || "Candidate"}
                        </p>
                      </div>

                    </div>

                    {/* DETAILS */}
                    <div className="mt-4 text-sm text-gray-600 space-y-2">

                      <div className="grid grid-cols-2 gap-2">

                        <p className="truncate">
                          <span className="font-medium">Email:</span><br />
                          {candidate?.email || "N/A"}
                        </p>

                        <p>
                          <span className="font-medium">Phone:</span><br />
                          {candidate?.phoneNumber || "N/A"}
                        </p>

                        <p>
                          <span className="font-medium">Experience:</span><br />
                          {candidate?.experience || "N/A"} yrs
                        </p>

                        <p>
                          <span className="font-medium">Education:</span><br />
                          {candidate?.educationLevel || "N/A"}
                        </p>

                      </div>

                    </div>

                    {/* SKILLS */}
                    {Array.isArray(candidate?.skills) &&
                      candidate.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {candidate.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                    {/* RESUME */}
                    <div className="flex justify-between items-center mt-4">
  {candidate?.resume?.url ? (
    <a
      href={candidate.resume.url.replace(
        "http://localhost:4000",
        "https://nexthire-i1hx.onrender.com"
      )}
      target="_blank"
      rel="noreferrer"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
    >
      View Resume
    </a>
  ) : (
    <div></div>
  )}

  <button
    onClick={() => analyzeResume(candidate)}
    disabled={loadingCandidate === candidate._id}
    className="bg-purple-600 text-white mr-13 px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition disabled:opacity-50"
  >
    {loadingCandidate === candidate._id
      ? "Analyzing..."
      : "Analyze Resume"}
  </button>
</div>
                    {analysisResults[analysisKey] && (
                      <div className="mt-4 p-4 rounded-lg bg-gray-100">
                        <h3 className="font-bold text-lg">
                          ATS Score: {analysisResults[analysisKey].score}%
                        </h3>

                        <p className="mt-2">
                          <b>Summary:</b> {analysisResults[analysisKey].summary}
                        </p>

                        <p className="mt-2">
                          <b>Recommendation:</b> {analysisResults[analysisKey].recommendation}
                        </p>

                        <p className="mt-2">
  <b>Matched Skills:</b>{" "}
  {Array.isArray(analysisResults[analysisKey].matchedSkills) &&
  analysisResults[analysisKey].matchedSkills.length > 0
    ? analysisResults[analysisKey].matchedSkills.join(", ")
    : "No matched skills found"}
</p>

                        <p className="mt-2">
  <b>Missing Skills:</b>{" "}
  {Array.isArray(analysisResults[analysisKey].missingSkills) &&
  analysisResults[analysisKey].missingSkills.length > 0
    ? analysisResults[analysisKey].missingSkills.join(", ")
    : "No major skills missing"}
</p>
                      </div>
                    )}

                  </div>
)
})}

              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}