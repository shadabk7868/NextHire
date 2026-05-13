import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaHeart } from "react-icons/fa";

export default function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isApplied, setIsApplied] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [role, setRole] = useState(null);

    /* ========= FETCH JOB ======== */
    const getJobDetails = async () => {
        try {
            const res = await API.get("/job/getjob");
            const found = res.data.data.find((j) => j._id === id);
            setJob(found);
        } catch (err) {
            console.log(err);
        }
    };

    /* ====== CHECK APPLIED ======== */
    const getAppliedJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await API.get("/job/applied-jobs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const ids = res.data.data.map(
                (item) => item.appliedJobId?._id
            );

            if (ids.includes(id)) {
                setIsApplied(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    /* ========= APPLY ====== */
    const applyJob = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first");
                return;
            }

            const res = await API.post(
                `/job/apply/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(res.data.message);

            if (res.data.success) {
                setIsApplied(true);
            }
        } catch (err) {
            alert(err?.response?.data?.message || "Error");
        }
    };

    /* ======== SAVE JOB ========= */
    const toggleSave = () => {
        setIsSaved(!isSaved);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getJobDetails();
            await getAppliedJobs();

            const userRole = localStorage.getItem("role");
            setRole(userRole);

            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!job) return <p className="text-center mt-10">Job not found</p>;

    return (
        <div className="bg-[#f5f7fc] min-h-screen">
            <Navbar />

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-10 md:py-14 text-center text-white px-4">
                <h1 className="text-2xl md:text-4xl font-bold">
                    {job.title}
                </h1>
                <p className="mt-2 text-xs md:text-sm opacity-90">
                    {job?.address?.city} • {job?.jobType}
                </p>
            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-5 md:space-y-6">

                    {/* LOGO */}
                    <img
                        src={
                            job.companyLogo?.url
                                ? `https://nexthire-i1hx.onrender.com${job.companyLogo.url}`
                                : "/default-company.png"
                        }
                        alt="logo"
                        className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-full "
                    />

                    {/* DESCRIPTION */}
                    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm">
                        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                            Job Description
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {job.description}
                        </p>
                    </div>

                    {/* DETAILS */}
                    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm">
                        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                            Job Details
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-sm text-gray-600">
                            <div><b>Salary:</b> ₹ {job.offeredSalary}</div>
                            <div><b>Experience:</b> {job.experience} yrs</div>
                            <div><b>Type:</b> {job.jobType}</div>
                            <div><b>Career:</b> {job.careerLevel}</div>
                            <div><b>Industry:</b> {job.industryType}</div>
                            <div><b>Qualification:</b> {job.qualification}</div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-5 md:space-y-6">

                    {/* APPLY + SAVE */}
                    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm text-center">

                        {isApplied ? (
                            <span className="block w-full bg-green-100 text-green-600 py-2 md:py-3 rounded-lg text-sm md:text-base">
                                Applied
                            </span>
                        ) : (
                            <button
                                onClick={applyJob}
                                className="w-full bg-blue-600 text-white py-2 md:py-3 rounded-lg hover:bg-blue-700 text-sm md:text-base"
                            >
                                Apply Now
                            </button>
                        )}

                        {/* SAVE BUTTON (candidate only) */}
                        {role === "candidate" && (
                            <button
                                onClick={toggleSave}
                                className={`mt-3 md:mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm md:text-base ${isSaved
                                        ? "bg-red-100 text-red-500"
                                        : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                <FaHeart />
                                {isSaved ? "Saved" : "Save Job"}
                            </button>
                        )}

                    </div>

                    {/* OVERVIEW */}
                    <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm">
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                            Overview
                        </h3>

                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>📍 {job?.address?.city}</li>
                            <li>💼 {job?.jobType}</li>
                            <li>💰 ₹ {job?.offeredSalary}</li>
                            <li>🧑‍💻 {job?.experience} yrs</li>
                        </ul>
                    </div>

                </div>

            </div>

            <Footer />
        </div>
    );
}