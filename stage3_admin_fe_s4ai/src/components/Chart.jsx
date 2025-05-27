import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Chart = ({ data, maxCount }) => {
  const navigate = useNavigate();
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleYAxisLabelClick = (keyword) => {
    const keywordData = data.find((item) => item.keyword === keyword);
    if (keywordData) {
      navigate("/keywordDetailScreen", {
        state: {
          keyword: keywordData.keyword,
          samples: keywordData.samples,
        },
      });
    }
  };

  const CustomizedYAxisTick = (props) => {
    const { x, y, payload } = props;

    return (
      <g
        transform={`translate(${x},${y})`}
        className="cursor-pointer"
        onClick={() => handleYAxisLabelClick(payload.value)}
      >
        <text
          x={-5}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#666"
          className="text-xs md:text-sm hover:text-blue-600 hover:font-medium transition-colors duration-200"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const colors = [
    "#2563EB",
    "#0D9488",
    "#D97706",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 120,
            bottom: 5,
          }}
          barSize={20}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
          />
          <XAxis
            type="number"
            label={{
              value: "Count",
              position: "insideBottom",
              offset: -5,
            }}
            domain={[0, maxCount || "auto"]} // Fixed max, or fallback to auto
          />
          <YAxis
            dataKey="keyword"
            type="category"
            tick={<CustomizedYAxisTick />}
            width={110}
            interval={0} // Show all ticks
          />
          <Tooltip
            cursor={{ fill: "rgba(224, 231, 255, 0.4)" }}
            contentStyle={{
              borderRadius: "6px",
              border: "none",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              fontSize: "12px",
            }}
          />
          <Bar
            dataKey="count"
            radius={[0, 4, 4, 0]}
            onMouseOver={(data, index) => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  hoverIndex === index
                    ? colors[index % colors.length]
                    : `${colors[index % colors.length]}CC`
                }
                className="transition-colors duration-300"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
