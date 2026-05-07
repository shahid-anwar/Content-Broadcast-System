// src/pages/principal/Approvals.jsx
import {
  getAllContent,
  updateContentStatus,
} from "../../services/content.service";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Approvals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch pending content
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getAllContent();

      const pending = res.filter((item) => item.status === "pending");

      setData(pending);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // approve
  const handleApprove = async (id) => {
    await updateContentStatus(id, "approved");

    toast.success("Approved");

    fetchData();
  };

  // reject
  const handleReject = async (id) => {
    await updateContentStatus(id, "rejected", "Rejected by principal");

    toast.success("Rejected");

    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center shadow-sm border">
        <h2 className="text-2xl font-bold text-gray-800">
          No Pending Approvals
        </h2>

        <p className="text-gray-500 mt-2">Uploaded content will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Pending Approvals
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-gray-600">
              <th className="pb-4">Preview</th>
              <th className="pb-4">Title</th>
              <th className="pb-4">Subject</th>
              <th className="pb-4">Start</th>
              <th className="pb-4">End</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* image */}
                <td className="py-5">
                  <img
                    src={item.preview || "https://picsum.photos/200"}
                    alt="preview"
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                </td>

                {/* title */}
                <td className="py-5 font-medium text-gray-800">{item.title}</td>

                {/* subject */}
                <td className="py-5 text-gray-600">{item.subject}</td>

                {/* start */}
                <td className="py-5 text-sm text-gray-500">
                  {new Date(item.startTime).toLocaleString()}
                </td>

                {/* end */}
                <td className="py-5 text-sm text-gray-500">
                  {new Date(item.endTime).toLocaleString()}
                </td>

                {/* actions */}
                <td className="py-5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Approvals;
