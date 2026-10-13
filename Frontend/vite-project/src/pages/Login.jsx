import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      // Read the response as text first, so both text and JSON work.
      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        setError(
          typeof data === "string"
            ? data
            : data.message || "Login failed. Please check your credentials."
        );
        return;
      }

      if (!data.token) {
        setError("Login response did not contain an authentication token.");
        return;
      }

      // Store the JWT for subsequent authenticated requests.
      localStorage.setItem("token", data.token);

      // Navigate after successful login.
      navigate("/profile");
    } catch (err) {
      console.error("Login request failed:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-xl font-bold shadow-lg shadow-red-600/30">
              AI
            </div>

            <h1 className="text-3xl font-bold">
              Interview<span className="text-red-500">AI</span>
            </h1>
          </div>

          <p className="text-gray-400 text-sm">
            Smart interviews. AI-powered evaluation.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl">

          <div className="mb-7">
            <h2 className="text-2xl font-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-400 text-sm">
              Login to continue your interview journey.
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-[#080808] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-300">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setError("Forgot password functionality is not implemented yet.")
                  }
                  className="text-xs text-red-500 hover:text-red-400"
                >
                  Forgot Password?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#080808] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm" role="alert">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-red-600/20"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-800 flex-1" />

            <span className="text-gray-500 text-xs">
              OR
            </span>

            <div className="h-px bg-gray-800 flex-1" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full border border-gray-700 hover:border-gray-500 bg-[#080808] py-3 rounded-lg flex items-center justify-center gap-3 transition"
          >
            <span className="font-bold text-lg">
              G
            </span>

            <span className="text-sm text-gray-300">
              Continue with Google
            </span>
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?

            <Link
              to="/signup"
              className="text-red-500 hover:text-red-400 ml-1 font-medium"
            >
              Sign Up
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © 2026 AI Interview Platform
        </p>

      </div>
    </div>
  );
}

export default Login;