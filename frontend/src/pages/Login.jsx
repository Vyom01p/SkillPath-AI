import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Sparkles, BookOpen, TrendingUp } from "lucide-react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      toast.success("Welcome Back");
      navigate("/dashboard");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        {/* Left Panel — Branding */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-600 to-teal-400 flex flex-col items-center justify-center p-8 sm:p-10 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">SkillPath AI</span>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white leading-snug">
              Your Personalized AI Learning Path
            </h2>
            <p className="text-blue-100 text-sm mt-2">
              Generate custom roadmaps powered by Google Gemini AI
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full mt-2">
            <Feature
              icon={<Sparkles className="w-4 h-4 text-white" />}
              text="AI-generated personalized roadmaps"
            />
            <Feature
              icon={<BookOpen className="w-4 h-4 text-white" />}
              text="Week by week structured learning"
            />
            <Feature
              icon={<TrendingUp className="w-4 h-4 text-white" />}
              text="Track your progress and streaks"
            />
          </div>
        </div>

        {/* Right Panel — Form */}
        <div className="flex-1 flex flex-col justify-center p-8 sm:p-10">
          <div className="mb-7">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-medium py-2.5 rounded-xl transition-all disabled:opacity-50 active:scale-[0.98] text-sm"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="text-sm text-blue-100">{text}</span>
    </div>
  );
};
export default Login;
