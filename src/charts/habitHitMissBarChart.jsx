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
    Followed: 40,
    Missed:40,
    "Partially Followed":43
   
  }
];

const HabitHitMissBarChart = () => {
  return (
    <ResponsiveContainer width={"80%"} height={250}>
      <BarChart
        data={data}
        margin={{
          top: 75,
          right: 0,
          left: 30,
          bottom: 0
        }}
      >
        {/* <CartesianGrid strokeDasharray="1 1" /> */}
        {/* <XAxis dataKey="name" /> */}
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar width={50} dataKey="Followed" fill="#0088FE" />
        <Bar width={50} dataKey="Missed" fill="#00C49F" />
        <Bar width={50} dataKey="Partially Followed" fill="#FFBB28" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HabitHitMissBarChart;
