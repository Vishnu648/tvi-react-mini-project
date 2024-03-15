import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import areaChart from '../../data/areaData.json'


export default function App() {
  const [areaChartData, setAreaChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/areaData.json")
      .then((res) => setAreaChartData(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="border md:w-[500px] flex flex-col items-center">
      <h2 className="p-3 border w-full text-center mb-3 bg-[#f7f7f7]">
        Area Chart
      </h2>
      <AreaChart
        width={450}
        height={320}
        data={areaChartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#8884d8"
          fill="#007bff"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#82ca9d"
          fill="gray"
        />
      </AreaChart>
    </div>
  );
}
