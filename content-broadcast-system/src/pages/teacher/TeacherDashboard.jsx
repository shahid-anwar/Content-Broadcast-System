// src/pages/teacher/TeacherDashboard.jsx

import { useEffect, useState } from "react";
import { getAllContent } from "../../services/content.service";
import StatCard from "../../components/common/StatCard";
import PageLoader from "../../components/common/PageLoader";

const TeacherDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await getAllContent();
      setData(res);
    } catch (err) {
      console.error("Error fetching content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchContent();
  }, []);

  // 🧠 Derived stats
  const total = data.length;
  const pending = data.filter((d) => d.status === "pending").length;
  const approved = data.filter((d) => d.status === "approved").length;
  const rejected = data.filter((d) => d.status === "rejected").length;

  if (loading) {
    return <PageLoader />;
  }

  if (!data.length) {
    return <div>No content uploaded yet</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Teacher Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total" value={total} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Approved" value={approved} />
        <StatCard title="Rejected" value={rejected} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
