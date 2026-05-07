import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getUserRole } from "../../utils/auth";

const DashboardLayout = ({ children }) => {
  const role = getUserRole();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
