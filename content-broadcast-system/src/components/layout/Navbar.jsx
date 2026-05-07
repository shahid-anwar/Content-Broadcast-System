import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          <Menu size={18} />
        </button>

        <h1 className="text-2xl font-semibold text-gray-800">
          Content Broadcasting System
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
