import { useState, useEffect } from "react";
import axios from "axios";

export default function MyProfile() {
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    jobTitle: "",
    email: "",
    experience: "",
    educationLevel: "",
    currentSalary: "",
    expectedSalary: "",
    age: "",
    languages: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/getprofile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        const data = res?.data?.data;

        if (!data) return;

        if (data.name || data.phoneNumber) {
          setIsEdit(false);
        }

        setForm({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          jobTitle: data.jobTitle || "",
          email: data.email || "",
          experience: data.experience || "",
          educationLevel: data.educationLevel || "",
          currentSalary: data.currentSalary || "",
          expectedSalary: data.expectedSalary || "",
          age: data.age || "",
          languages: data.languages?.join(", ") || "",
          description: data.keywords?.join(", ") || ""
        });

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.set("languages", JSON.stringify(form.languages.split(",")));
      formData.set("keywords", JSON.stringify(form.description.split(",")));

      if (image) {
        formData.append("profileImage", image);
      }

      const res = await axios.put(
        "http://localhost:4000/api/user/update-personal-info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      alert(res.data.message);

      setIsEdit(false); 

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-semibold text-gray-800">
        My Profile
      </h1>

      <div className="bg-white p-8 rounded-2xl shadow-sm mt-6">


        {!isEdit ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* PERSONAL INFO */}
              <div className="bg-[#f5f7fc] p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4">Personal Info</h3>

                <div className="space-y-2 text-m">
                  <p><span className="text-gray-500 ">Name:</span> {form.name}</p>
                  <p><span className="text-gray-500">Phone:</span> {form.phoneNumber}</p>
                  <p><span className="text-gray-500">Email:</span> {form.email}</p>
                  <p><span className="text-gray-500">Age:</span> {form.age}</p>
                </div>
              </div>

              {/* PROFESSIONAL INFO */}
              <div className="bg-[#f5f7fc] p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4">Professional Info</h3>

                <div className="space-y-2 text-m">
                  <p><span className="text-gray-500">Job Title:</span> {form.jobTitle}</p>
                  <p><span className="text-gray-500">Experience:</span> {form.experience}</p>
                  <p><span className="text-gray-500">Education:</span> {form.educationLevel}</p>
                </div>
              </div>

              {/* SALARY INFO */}
              <div className="bg-[#f5f7fc] p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4">Salary Info</h3>

                <div className="space-y-2 text-m">
                  <p><span className="text-gray-500">Current Salary:</span> {form.currentSalary}</p>
                  <p><span className="text-gray-500">Expected Salary:</span> {form.expectedSalary}</p>
                </div>
              </div>

              {/* LANGUAGES */}
              <div className="bg-[#f5f7fc] p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-4">Languages</h3>

                <div className="flex flex-wrap gap-2">
                  {form.languages.split(",").map((lang, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="bg-[#f5f7fc] p-6 rounded-xl mt-6">
              <h3 className="font-semibold text-lg mb-4">About Me</h3>
              <p className="text-m text-gray-600 leading-relaxed">
                {form.description || "No description added"}
              </p>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setIsEdit(true)}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        ) : (


          <>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-[200px] h-[120px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  id="upload"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="upload" className="cursor-pointer text-sm text-gray-500">
                  Upload Image
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="Phone" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
              <Input label="Job Title" name="jobTitle" value={form.jobTitle} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Input label="Experience" name="experience" value={form.experience} onChange={handleChange} />
              <Input label="Education" name="educationLevel" value={form.educationLevel} onChange={handleChange} />
              <Input label="Current Salary" name="currentSalary" value={form.currentSalary} onChange={handleChange} />
              <Input label="Expected Salary" name="expectedSalary" value={form.expectedSalary} onChange={handleChange} />
              <Input label="Age" name="age" value={form.age} onChange={handleChange} />

            </div>

            <div className="mt-6">
              <label>Languages</label>
              <input
                name="languages"
                value={form.languages}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg"
              />
            </div>

            <div className="mt-6">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Save
            </button>
          </>
        )}

      </div>
    </>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg"
      />
    </div>
  );
}