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
    <ResponsiveContainer width={"70%"} height={300}>
      <BarChart
        data={data}
        margin={{
          top: 75,
          right: 0,
          left: -20,
          bottom: 5
        }}
      >
        {/* <CartesianGrid strokeDasharray="1 1" /> */}
        {/* <XAxis dataKey="name" /> */}
        <YAxis />
        <Tooltip />
        <div style={{height:"10px"}}></div>
        <Legend />
        <Bar dataKey="Followed" fill="#8884d8" />
        <Bar dataKey="Missed" fill="#82ca9d" />
        <Bar dataKey="Partially Followed" fill="#84c49d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HabitHitMissBarChart;
