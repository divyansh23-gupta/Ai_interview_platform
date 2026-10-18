import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile-test", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await response.text();

        let data;

        try {
          data = JSON.parse(text);
        } catch {
          data = { message: text };
        }

        if (!response.ok) {
          throw new Error(
            typeof data === "string"
              ? data
              : data.message || "Unable to load profile"
          );
        }

        setUser(data.user);
      } catch (err) {
        console.error("Profile request failed:", err);
        setError(err.message || "Something went wrong");

        if (
          err.message === "Invalid token" ||
          err.message === "Please login first"
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 px-4">
        <h1 className="text-2xl font-bold">Unable to Load Profile</h1>

        <p className="text-red-400 text-center" role="alert">
          {error}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg transition"
        >
          Back to Login
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center text-2xl font-bold mb-6">
          AI
        </div>

        <h1 className="text-2xl font-bold mb-6">
          Welcome to InterviewAI!
        </h1>

        <p className="text-gray-300 mb-3 break-all">
          <span className="text-gray-500">Email: </span>
          {user.email}
        </p>

        <p className="text-gray-300 mb-6 break-all">
          <span className="text-gray-500">User ID: </span>
          {user.userId}
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;