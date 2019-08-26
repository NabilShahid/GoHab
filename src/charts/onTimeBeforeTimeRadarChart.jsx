import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

// const data = [
//   {
//     subject: "Partially Followed",
//     count: 20
    
//   },
//   {
//     subject: "Missed",
//     count: 60
    
//   },
//   {
//     subject: "Followed",
//     count: 40
    
//   }
// ];

const OnTimeBeforeTimeRadarChart = ({data=0,total=0}) => {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <RadarChart cx="50%" cy="65%" outerRadius={100} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis domain={[0, total]} />
        <Tooltip/>
        <Radar
          name=""
          dataKey="count"
          stroke="#00C49F"
          fill="#00C49F"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
export default OnTimeBeforeTimeRadarChart;
