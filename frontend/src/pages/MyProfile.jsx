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
      description: "",
      profileImage: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchProfile();
    }, []);

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

        const data = res?.data?.data;

        if (!data) return;

        const profileExists =
          !!data?.name &&
          !!data?.phoneNumber;

        setIsEdit(!profileExists);


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
          languages: data.languages || "",
          description: data.description || "",
          profileImage: data.profileImage?.url || "",
        });

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    const handleSave = async () => {

      try {

        const formData = new FormData();

  formData.append("name", form.name);
  formData.append("phoneNumber", form.phoneNumber);
  formData.append("jobTitle", form.jobTitle);
  formData.append("email", form.email);
  formData.append("experience", form.experience);
  formData.append("educationLevel", form.educationLevel);
  formData.append("currentSalary", form.currentSalary);
  formData.append("expectedSalary", form.expectedSalary);
  formData.append("age", form.age);
  formData.append("languages", form.languages);
  formData.append("description", form.description);

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

        await fetchProfile();

        setIsEdit(false);

      } catch (err) {
        console.log(err);
        alert("Update failed");
      }
    };

    if (loading) {
      return (
        <p className="text-gray-500">
          Loading...
        </p>
      );
    }

    return (
      <>
        <h1 className="text-3xl font-semibold text-gray-800">
          My Profile
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-sm mt-6">

          {/* PROFILE VIEW*/}

          {!isEdit ? (

            <>
              {/* TOP PROFILE CARD */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white">

                <div className="flex flex-col md:flex-row items-center gap-8">

                  <img
                    src={
                      form.profileImage ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />

                  <div className="flex-1">

                    <h2 className="text-4xl font-bold">
                      {form.name}
                    </h2>

                    <p className="text-blue-100 mt-2 text-lg">
                      {form.jobTitle}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-5">

                      <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                        {form.experience} yrs
                      </span>

                      <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                        {form.educationLevel}
                      </span>

                    </div>

                  </div>

                </div>
              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                <ProfileCard title="Personal Info">
                  <p>Email: {form.email}</p>
                  <p>Phone: {form.phoneNumber}</p>
                  <p>Age: {form.age}</p>
                </ProfileCard>

                <ProfileCard title="Salary Info">
                  <p>Current Salary per month: ₹{form.currentSalary}</p>
                  <p>Expected Salary per month: ₹{form.expectedSalary}</p>
                </ProfileCard>

                <ProfileCard title="Languages">

                  <div className="flex flex-wrap gap-2">

                    <p>{form.languages || "No languages added"}</p>

                  </div>

                </ProfileCard>

                <ProfileCard title="About Me">
                  <p className="leading-relaxed">
                    {form.description || "No description added"}
                  </p>
                </ProfileCard>

              </div>

              {/* UPDATE BUTTON */}

              <button
                onClick={() => setIsEdit(true)}
                className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
              >
                Update Profile
              </button>
            </>

          ) : (

            /* =========================
                PROFILE FORM
            ========================== */

            <>
              {/* IMAGE */}

              <div className="flex items-center gap-6 mb-8">

                <div className="w-[200px] h-[120px] border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer bg-[#f5f7fc]">

                  <input
                    type="file"
                    className="hidden"
                    id="upload"
                    onChange={(e) => setImage(e.target.files[0])}
                  />

                  <label
                    htmlFor="upload"
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    {image ? image.name : "Upload Image"}
                  </label>

                </div>

              </div>

              {/* INPUTS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />

                <Input label="Phone" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />

                <Input label="Job Title" name="jobTitle" value={form.jobTitle} onChange={handleChange} />

                <Input label="Email" name="email" value={form.email} onChange={handleChange} />

                <Input label="Experience" name="experience" value={form.experience} onChange={handleChange} />

                <Input label="Education" name="educationLevel" value={form.educationLevel} onChange={handleChange} />

                <Input label="Current Salary per month" name="currentSalary" value={form.currentSalary} onChange={handleChange} />

                <Input label="Expected Salary per month" name="expectedSalary" value={form.expectedSalary} onChange={handleChange} />

                <Input label="Age" name="age" value={form.age} onChange={handleChange} />

              </div>

              {/* LANGUAGES */}

              <div className="mt-6">

                <label className="text-sm text-gray-600">
                  Languages
                </label>

                <input
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg"
                />

              </div>

              {/* DESCRIPTION */}

              <div className="mt-6">

                <label className="text-sm text-gray-600">
                  About Me
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg min-h-[120px]"
                />

              </div>

              {/* SAVE BUTTON */}

              <button
                onClick={handleSave}
                className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700"
              >
                Save Profile
              </button>
            </>
          )}

        </div>
      </>
    );
  }

  function ProfileCard({ title, children }) {
    return (
      <div className="bg-[#f5f7fc] p-6 rounded-2xl">

        <h3 className="font-semibold text-lg mb-4">
          {title}
        </h3>

        <div className="space-y-3 text-gray-700">
          {children}
        </div>

      </div>
    );
  }

  function Input({ label, name, value, onChange }) {
    return (
      <div>

        <label className="text-sm text-gray-600">
          {label}
        </label>

        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full mt-2 p-3 bg-[#f5f7fc] rounded-lg"
        />

      </div>
    );
  }