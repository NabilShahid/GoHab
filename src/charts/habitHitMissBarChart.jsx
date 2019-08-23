import React, { Component } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Followed",
    Followed: 40
   
  },
  {
    name: "Missed",
    Missed: 30
   
  },
  {
    name: "Partially Followed",
    "Partially Followed": 20
   
  }
];

const HabitHitMissBarChart = () => {
  return (
    <ResponsiveContainer width={"90%"} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 75,
          right: 0,
          left: 0,
          bottom: 5
        }}
      >
        {/* <CartesianGrid strokeDasharray="1 1" /> */}
        {/* <XAxis dataKey="name" /> */}
        <YAxis />
        <Tooltip />
        <div style={{height:"10px"}}></div>
        <Legend />
        <Bar width={300} dataKey="Followed" fill="#0088FE" />
        <Bar width={300} dataKey="Missed" fill="#00C49F" />
        <Bar width={300} dataKey="Partially Followed" fill="#FFBB28" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HabitHitMissBarChart;
