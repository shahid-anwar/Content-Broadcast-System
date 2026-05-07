// src/pages/principal/AllContent.jsx

import { useEffect, useState } from "react";
import { getAllContent } from "../../services/content.service";
import StatusBadge from "../../components/common/StatusBadge";
import PageLoader from "../../components/common/PageLoader";

const AllContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getAllContent();
      setData(res);
    } catch (err) {
      console.error("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">
        No content uploaded yet
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Content</h1>
      </div>

      <table className="w-full min-w-[900px]">
        <thead className="border-b text-gray-700">
          <tr>
            <th className="text-left py-3">Preview</th>
            <th className="text-left py-3">Title</th>
            <th className="text-left py-3">Subject</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Schedule</th>
            <th className="text-left py-3">Reason</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
              {/* Preview */}
              <td className="py-4">
                <img
                  src={item.preview}
                  alt="preview"
                  className="h-16 w-16 rounded-lg object-cover border"
                />
              </td>

              {/* Title */}
              <td className="py-4 text-gray-800 font-medium">{item.title}</td>

              {/* Subject */}
              <td className="py-4 text-gray-700">{item.subject}</td>

              {/* Status */}
              <td className="py-4">
                <StatusBadge status={item.status} />
              </td>

              {/* Time */}
              <td className="py-4 text-sm text-gray-600">
                <div>{item.startTime || "-"}</div>

                <div>{item.endTime || "-"}</div>
              </td>

              {/* Reason */}
              <td className="py-4 text-red-500 text-sm">
                {item.rejectionReason || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllContent;
