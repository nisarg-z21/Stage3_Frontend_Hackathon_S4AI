import React from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import DetailCard from "../components/DetailCard";

const KeywordDetailScreen = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" />;
  }

  const { keyword, samples } = state;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">
                Complaints with keyword:{" "}
                <span className="text-blue-600">"{keyword}"</span>
              </h2>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-white rounded transition"
                style={{ backgroundColor: "#0361ae" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#035191")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0361ae")
                }
              >
                ← Back
              </button>
            </div>
          </div>
          <p className="text-gray-600">
            Showing {samples.length} sample{samples.length !== 1 ? "s" : ""}{" "}
            containing this keyword.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {samples.map((sample, index) => (
          <div
            key={index}
            className="transform transition-transform duration-300 hover:-translate-y-1"
          >
            <DetailCard sample={sample} />
          </div>
        ))}
      </div>
    </>
  );
};

export default KeywordDetailScreen;
