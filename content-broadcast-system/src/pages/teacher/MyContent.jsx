// src/pages/teacher/MyContent.jsx

import { useEffect, useState } from "react";
import { getAllContent } from "../../services/content.service";
import StatusBadge from "../../components/common/StatusBadge";
import PageLoader from "../../components/common/PageLoader";

const MyContent = () => {
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

  if (loading) {
    return <PageLoader />;
  }

  if (!data.length) {
    return <div>No content found</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">My Content</h2>

      <table className="w-full min-w-[900px] border-separate border-spacing-y-2">
        <thead className="text-gray-700">
          <tr className="bg-gray-50 hover:bg-gray-100 transition rounded-xl">
            <th className="p-2">Preview</th>
            <th className="p-2">Title</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Status</th>
            <th className="p-2">Time</th>
            <th className="p-2">Reason</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              className="bg-gray-50 hover:bg-gray-100 transition text-gray-800"
              key={item.id}
            >
              {/* Preview */}
              <td className="p-2">
                <img
                  src={item.preview || "https://picsum.photos/200"}
                  alt="preview"
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/200";
                  }}
                  className="h-14 w-14 rounded-lg object-cover border"
                />
              </td>

              {/* Title */}
              <td className="p-2">{item.title}</td>

              {/* Subject */}
              <td className="p-2">{item.subject}</td>

              {/* Status */}
              <td className="p-2">
                <StatusBadge status={item.status} />
              </td>

              {/* Time */}
              <td className="p-2 text-sm">
                {item.startTime} <br /> {item.endTime}
              </td>

              {/* Rejection Reason */}
              <td className="p-2 text-red-500 text-sm">
                {item.status === "rejected" ? item.rejectionReason : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContent;
