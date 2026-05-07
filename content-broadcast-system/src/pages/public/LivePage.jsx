// src/pages/public/LivePage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLiveContent } from "../../services/content.service";
const LivePage = () => {
  const { teacherId } = useParams();

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Combined fetch + filtering logic
  const fetchData = async () => {
    try {
      setLoading(true);

      // fake API delay

      // get uploaded content

      // filter approved + currently live content
      const res = await getLiveContent();

      setData(res);
    } catch (err) {
      console.error("Error fetching live content", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // auto refresh every 10 sec
    const interval = setInterval(fetchData, 600000);

    return () => clearInterval(interval);
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-full shadow-lg">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // Empty State
  if (!data.length) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-blue-600 text-white py-5 shadow-md">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Live Classes</h1>

              <p className="text-blue-100 mt-1">Teacher ID: {teacherId}</p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-5 py-2 rounded-xl font-medium hover:bg-blue-50 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Empty */}
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-gray-500 text-2xl font-medium">
            No Live Content Available
          </p>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-5 shadow-md">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Live Classes</h1>

            <p className="text-blue-100 mt-1">Teacher ID: {teacherId}</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-5 py-2 rounded-xl font-medium hover:bg-blue-50 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-xl transition duration-300"
            >
              {/* Preview */}
              <div className="h-56 overflow-hidden bg-gray-200">
                <img
                  src={item.preview}
                  alt="preview"
                  onError={(e) => {
                    e.target.src = "https://picsum.photos/500/300";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-2">{item.subject}</p>

                {/* Time */}
                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>Start: {new Date(item.startTime).toLocaleString()}</p>

                  <p>End: {new Date(item.endTime).toLocaleString()}</p>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition">
                    Join Live Class
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivePage;
