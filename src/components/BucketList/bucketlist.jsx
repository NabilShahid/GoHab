import React from "react";
import TaskCard from "../TaskCard/taskcard";
import "./bucketlist.css";
const BucketList = ({ items, lists }) => {
  console.log(lists);
  return (
    <div className="bLists">
      {lists.map(list => {
        return (
          <div className="bList">
            <div className="bListHeader">{list.name}</div>
            <div className="bListContent">
              {items
                .filter(item => item.parentGoal == list.id)
                .map(filteredItem => {
                  return (
                    <div className="bListCard">
                      <TaskCard
                        name={filteredItem.name}
                        description={filteredItem.description}
                        dueDate={filteredItem.dueDate}
                        progress={filteredItem.progress}
                        importance={filteredItem.importance}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BucketList;
