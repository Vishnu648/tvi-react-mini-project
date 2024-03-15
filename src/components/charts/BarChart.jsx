import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import barChart from "../../data/barData.json";

export default function App() {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/barData.json")
      .then((res) => setBarChartData(res.data))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="border md:w-[500px] flex flex-col items-center">
      <h2 className="p-3 border w-full text-center mb-3 bg-[#f7f7f7]">
        Bar Chart
      </h2>
      <BarChart
        width={450}
        height={320}
        data={barChartData}
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
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />

        <Bar dataKey="uv" fill="#007bff" />
      </BarChart>
    </div>
  );
}
