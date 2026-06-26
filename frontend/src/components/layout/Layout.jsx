import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sideBarOpen} onClose={() => setSideBarOpen(false)} />
      <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
        <button
          onClick={() => setSideBarOpen(true)}
          className="p-1.5 text-gray-600"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-bold text-gray-900"> Skill Path AI</span>
      </div>
      <div className="lg:ml-64">{children}</div>
    </div>
  );
};
export default Layout;
