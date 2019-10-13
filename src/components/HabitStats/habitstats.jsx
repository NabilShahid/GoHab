import React from "react";
import { Popover } from "antd";
import HabitWiseProgressChartWrapper  from "../HabitWiseProgressChartWrapper/habitwiseprogresschartwrapper";
const HabitStats = () => {
  return (
    <div className="fullHeight" style={{ overflowY: "auto" }}>
      <div style={{ width: "100%" }}>
        <div className="fullWidthLineChartLabel">
          Habit Wise Progress Chart{" "}
          <Popover
            placement="bottomLeft"
            content={
              <div>
                Chart showing how early or late goal was completed in days.
                <ul>
                  <li>
                    Vertical axis shows number of days. Positive for days before
                    due date, and negative for days after due date
                  </li>
                  <li>Horizontal axis shows goals</li>
                </ul>{" "}
              </div>
            }
            trigger="hover"
          >
            <i className="fa fa-info-circle graphInfoIcon"></i>
          </Popover>
        </div>
        <HabitWiseProgressChartWrapper />
      </div>
    </div>
  );
};

export default HabitStats;
