import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Sparkles, ArrowRight } from "lucide-react";
const Dashboard = () => {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [stats, setStats] = useState({
    skills_completed: 0,
    roadmaps_finished: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setRoadmaps(res.data.data.roadmaps);
      setStats(res.data.data.stats);
    } catch (error) {
      console.error("Failed to load dashboard", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboard();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here's an overview of your learning journey
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Active Roadmaps
        </h2>

        {roadmaps.length === 0 ? (
          <EmptyRoadmapsState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roadmaps.map((roadmap) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Overall Progress Stats
        </h2>
        <div className="grid grid-cols-3 gap-6 justify-items-center">
          <StatCircle
            value={stats.skills_completed}
            label="Skills Completed"
            color="#3b82f6"
          />
          <StatCircle
            value={stats.roadmaps_finished}
            label="Roadmaps Finished"
            color="#14b8a6"
          />
          <StatCircle
            value={stats.streak}
            label="Day Streak"
            color="#3b82f6"
            suffix=""
          />
        </div>
      </div>
    </div>
  );
};

const RoadmapCard = ({ roadmap }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5">
    <h3 className="font-semibold text-gray-900 mb-3">{roadmap.skill_name}</h3>
    <div className="mb-1 flex justify-between text-xs text-gray-500">
      <span>Progress</span>
      <span>{roadmap.percentage}%</span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"
        style={{ width: `${roadmap.percentage}%` }}
      />
    </div>
    <Link
      to={`/roadmap/${roadmap.id}`}
      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium py-2 rounded-xl"
    >
      Continue <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

const StatCircle = ({ value, label, color }) => (
  <div className="flex flex-col items-center">
    <div className="w-24 h-24">
      <CircularProgressbar
        value={value}
        maxValue={value > 100 ? value : 100}
        text={`${value}`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#111827",
          trailColor: "#f1f5f9",
          textSize: "28px",
        })}
      />
    </div>
    <p className="text-sm text-gray-500 mt-3 text-center">{label}</p>
  </div>
);

const EmptyRoadmapsState = () => (
  <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 flex flex-col items-center text-center">
    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
      <Sparkles className="w-7 h-7 text-blue-500" />
    </div>
    <h3 className="font-semibold text-gray-900 mb-1">No active roadmaps yet</h3>
    <p className="text-sm text-gray-500 mb-4">
      Generate your first AI-powered learning roadmap
    </p>
    <Link
      to="/generate"
      className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium px-5 py-2.5 rounded-xl"
    >
      Generate Roadmap
    </Link>
  </div>
);
export default Dashboard;
