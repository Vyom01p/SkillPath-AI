import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/layout/Layout";
const Dashboard = () => (
  <div className="p-8 text-2xl font-bold">Dashboard coming soon...</div>
);
const Generate = () => (
  <div className="p-8 text-2xl font-bold">Generate coming soon...</div>
);
const Roadmaps = () => (
  <div className="p-8 text-2xl font-bold">My Roadmaps coming soon...</div>
);
const Explore = () => (
  <div className="p-8 text-2xl font-bold">Explore coming soon...</div>
);
const Profile = () => (
  <div className="p-8 text-2xl font-bold">Profile coming soon...</div>
);
const Settings = () => (
  <div className="p-8 text-2xl font-bold">Settings coming soon...</div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/generate"
            element={
              <ProtectedRoute>
                <Layout>
                  <Generate />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/roadmaps"
            element={
              <ProtectedRoute>
                <Layout>
                  <Roadmaps />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Layout>
                  <Explore />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
