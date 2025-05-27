import React, { useEffect } from "react";
import Chart from "../components/Chart";
// import { mockData } from "../data/mockData";
import { useLocation } from "react-router-dom";
import useAxios from "../api/useAxios";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const KeywordGraphScreen = () => {
  const [mockData, setMockData] = React.useState({});
  const location = useLocation();
  const state = location.state;

  const { dataPath } = state;

  useEffect(() => {
    if (dataPath) {
      fetchReportData(dataPath);
    } else {
      console.error("No data path provided in state");
    }
  }, [dataPath]);

  const fetchReportData = async (dataPath) => {
    try {
      const response = await useAxios.get("/reports/get_report_graph_data", {
        params: { path: dataPath },
      });
      setMockData(response.data); // Use the returned JSON data in chart
    } catch (error) {
      console.error("Failed to fetch report data", error);
    }
  };

  // 1. Get the highest count across all months
  const maxCountAcrossAll = Math.max(
    ...Object.values(mockData)
      .flat() // merge all month arrays
      .map((item) => item.count) // extract counts
  );

  return (
    // <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
        {Object.keys(mockData).map((month, index) => (
          <div key={month} className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {months[parseInt(month) - 1]} 2024
            </h3>
            <Chart
              data={mockData[month]
                .sort((a, b) => b.count - a.count) // sort descending by count
                .slice(0, 10)} // take top 10
              maxCount={maxCountAcrossAll} // use the fixed max count
            />
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default KeywordGraphScreen;
