import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("candidate");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Email aur Password required hai");
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      alert("Invalid email format");
      return;
    }

    if (!isLogin && !name.trim()) {
      alert("Name required hai");
      return;
    }

    if (password.length < 6) {
      alert("Password at least 6 characters ka hona chahiye");
      return;
    }

    try {
      let url;

      if (isLogin) {
        url =
          role === "employer"
            ? "https://nexthire-i1hx.onrender.com/api/employer/login"
            : "https://nexthire-i1hx.onrender.com/api/user/login";
      } else {
        url =
          role === "employer"
            ? "https://nexthire-i1hx.onrender.com/api/employer/register"
            : "https://nexthire-i1hx.onrender.com/api/user/register";
      }

      let payload = isLogin
        ? { email, password }
        : { name, email, password };

      const { data } = await axios.post(url, payload);

      if (data.success) {
        if (!isLogin) {
          alert("Registered successfully, please login");
          setIsLogin(true);
          setPassword("");
          return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", data?.data?.id || data?.data?._id);

        onClose();

        setTimeout(() => {
          if (role === "employer") {
            navigate("/employers-dashboard");
          } else {
            navigate("/candidate-dashboard");
          }
        }, 300);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">

      <div className="bg-white w-[400px] rounded-xl p-6 relative shadow-xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400"
        >
          <FaTimes />
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-6">
          {isLogin ? "Login to Superio" : "Create a Free Account"}
        </h2>

        {/* ROLE SWITCH */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => setRole("candidate")}
            className={`flex-1 py-2 rounded-lg ${role === "candidate"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
              }`}
          >
            Candidate
          </button>

          <button
            onClick={() => setRole("employer")}
            className={`flex-1 py-2 rounded-lg ${role === "employer"
              ? "bg-green-600 text-white"
              : "bg-gray-100"
              }`}
          >
            Employer
          </button>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-gray-100 p-3 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-gray-100 p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-100 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {isLogin ? "Log In" : "Register"}
          </button>
        </div>

        {/* SWITCH LOGIN/REGISTER */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 ml-1 cursor-pointer"
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}