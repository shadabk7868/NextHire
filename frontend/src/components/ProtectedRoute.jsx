import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ Comp }) {
  let [loading, setLoading] = useState(true);
  let [isLogin, setIsLogin] = useState(false);

  let getprofile = async () => {
    try {
      let token = localStorage.getItem("token");

      let { data } = await axios.get(
        "http://localhost:4000/api/user/getprofile",
        {
          headers: {
            Authorization: `Bearer ${token}` // ✅ FIXED
          }
        }
      );

      if (data.success) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

    } catch (error) {
      setIsLogin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getprofile();
  }, []);

  if (loading) {
    return (
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return isLogin ? Comp : <Navigate to="/login" />;
}