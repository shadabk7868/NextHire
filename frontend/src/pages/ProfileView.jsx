import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileView() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://nexthire-i1hx.onrender.com/api/user/getprofile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        setUser(res.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <div className="bg-white p-6 rounded-xl shadow">

        {/* IMAGE */}
        {user.profileImage?.url && (
          <img
            src={user.profileImage.url}
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
        )}

        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.jobTitle}</p>

        <div className="mt-4 space-y-2 text-sm">
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phoneNumber}</p>
          <p><b>Experience:</b> {user.experience}</p>
          <p><b>Education:</b> {user.educationLevel}</p>
          <p><b>Salary:</b> {user.currentSalary} - {user.expectedSalary}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Languages:</b> {user.languages?.join(", ")}</p>
        </div>

        {user.resume?.url && (
          <a
            href={user.resume.url}
            target="_blank"
            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded"
          >
            View Resume
          </a>
        )}

      </div>
    </div>
  );
}