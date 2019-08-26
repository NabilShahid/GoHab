import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const OverDuePendingChart = ({data}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <PieChart>
        <Legend />
        <Tooltip/>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* <Pie
        data={data}
        cx={420}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie> */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OverDuePendingChart;
