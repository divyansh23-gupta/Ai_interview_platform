import { Link } from "react-router-dom";

function Signup() {
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
              Create Your Account
            </h2>

            <p className="text-gray-400 text-sm">
              Start practicing smarter with AI-powered interviews.
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-[#080808] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-[#080808] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full bg-[#080808] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full bg-[#080808] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition shadow-lg shadow-red-600/20 mt-2"
            >
              Create Account
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

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?

            <Link
              to="/login"
              className="text-red-500 hover:text-red-400 ml-1 font-medium"
            >
              Login
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

export default Signup;