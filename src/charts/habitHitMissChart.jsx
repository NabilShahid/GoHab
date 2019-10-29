import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
const COLORS = ["red", "green"];

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 300 }
];
const HabitHitMissChart = () => {
  return (
    <PieChart width={200} height={200} onMouseEnter={this.onPieEnter}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        startAngle={180}
        endAngle={0}
        innerRadius={40}
        outerRadius={50}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

// export default HabitHitMissChart;
// const HabitHitMissChart = () => {
//   return (

//   );
// };

export default HabitHitMissChart;
