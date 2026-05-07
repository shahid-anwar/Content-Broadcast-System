// src/pages/principal/PrincipalDashboard.jsx

import { useEffect, useState } from "react";
import { getAllContent } from "../../services/content.service";
import StatCard from "../../components/common/StatCard";
import PageLoader from "../../components/common/PageLoader";

const PrincipalDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getAllContent();
      setData(res);
    } catch (err) {
      console.error("Error fetching content", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
  }, []);

  const total = data.length;
  const pending = data.filter((d) => d.status === "pending").length;
  const approved = data.filter((d) => d.status === "approved").length;
  const rejected = data.filter((d) => d.status === "rejected").length;

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-xl font-semibold">Principal Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Content" value={total} />
        <StatCard title="Pending" value={pending} />
        <StatCard title="Approved" value={approved} />
        <StatCard title="Rejected" value={rejected} />
      </div>
    </div>
  );
};

export default PrincipalDashboard;
