import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";


const HabitWiseProgressLineChart = ({data}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        data={data}
          margin={{
          top:10,
          right: 60,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis domain={[0, 1]} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <ReferenceLine y={0} label="On Due Date" stroke="#00C49F" />

        <Line
          type="monotone"
          dataKey="followed"
          stroke="var(--habit-color)"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HabitWiseProgressLineChart;
