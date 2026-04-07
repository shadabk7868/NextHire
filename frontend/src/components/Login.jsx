import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const nav = useNavigate();

  let submitHandler = async (e) => {
  e.preventDefault();
  try {
    let { data } = await axios.post(
      "http://localhost:4000/api/user/login",
      { email, password }
    );

    if (data.success) {
      console.log("Login Successful");  

      localStorage.setItem("token", data.token);
      nav("/products"); 
    } else {
      console.log("Login Failed:", data.message);
    }

  } catch (error) {
    console.log("Error:", error?.response?.data?.message);
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4 text-primary fw-bold">
          Login Here
        </h3>

        <form onSubmit={submitHandler}>
          
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}