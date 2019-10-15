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

// const data = [
//   {
//     name: "DueDate",
//     Followed: 40,
//     Missed:40,
//     "Partially Followed":43
   
//   }
// ];

const HabitWiseHitMissBarChart = ({data}) => {
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar width={50} dataKey="Followed" fill="var(--goal-color)" />
        <Bar width={50} dataKey="Partially Followed" fill="var(--task-color)" />
        <Bar width={50} dataKey="Missed" fill="var(--habit-color)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HabitWiseHitMissBarChart;
