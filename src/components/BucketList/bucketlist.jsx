import React from "react";
import TaskCard from "../TaskCard/taskcard";
import "./bucketlist.css";
const BucketList = ({ items }) => {
  console.log(items);
  return (
    <div>      
      <div className="bList">
        <div className="bListHeader">Under Goals: My Fucking Shit</div>
        <div className="bListContent">
          {items.map(item => {
            return (
              <div className="bListCard">
                <TaskCard
                  name={item.name}
                  description={item.description}
                  dueDate={item.dueDate}
                  progress={item.progress}
                  importance={item.importance}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BucketList;
