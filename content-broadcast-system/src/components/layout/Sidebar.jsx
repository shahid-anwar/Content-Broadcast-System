import { LayoutDashboard, Upload, FileText } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ role, collapsed }) => {
  const { pathname } = useLocation();

  const teacherLinks = [
    {
      name: "Dashboard",
      path: "/teacher/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload",
      path: "/teacher/upload",
      icon: <Upload size={20} />,
    },
    {
      name: "My Content",
      path: "/teacher/my-content",
      icon: <FileText size={20} />,
    },
  ];

  const principalLinks = [
    {
      name: "Dashboard",
      path: "/principal/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Approvals",
      path: "/principal/approvals",
      icon: <Upload size={20} />,
    },
    {
      name: "All Content",
      path: "/principal/content",
      icon: <FileText size={20} />,
    },
  ];

  const links = role === "principal" ? principalLinks : teacherLinks;

  return (
    <div
      className={`bg-gray-950 text-white transition-all duration-300 flex flex-col
      ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <h2 className="font-bold text-2xl whitespace-nowrap">
          {collapsed ? "📚" : "📚 CMS"}
        </h2>
      </div>

      {/* Links */}
      <div className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const active = pathname.startsWith(link.path);

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${
                active
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {link.icon}

              {!collapsed && <span className="font-medium">{link.name}</span>}
            </Link>
          );
        })}
      </div>

      {/* Bottom User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
            T
          </div>

          {!collapsed && (
            <div>
              <p className="font-medium capitalize">{role}</p>
              <p className="text-xs text-gray-400">{role}@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
