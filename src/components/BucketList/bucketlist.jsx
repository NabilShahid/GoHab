import React from "react";
import TaskCard from "../TaskCard/taskcard";
import HabitCard from "../HabitCard/habitcard";
import "./bucketlist.css";
const BucketList = ({ items, lists, openDialog, markItem, card }) => {
  return (
    <div className="bLists">
      {lists.map(list => {
        return (
          <div className="bList">
            <div className="bListHeader" style={{borderTop:"4px solid "+list.bgColor}}>{list.name}</div>
            <div className="bListContent">
              {items
                .filter(item => item.parentGoal == list.id)
                .map(filteredItem => {
                  return (
                    <div
                      className="bListCard"
                      onClick={() => {
                        openDialog(filteredItem, false);
                      }}
                    >
                      {card == "task" && (
                        <TaskCard
                          name={filteredItem.name}
                          description={filteredItem.description}
                          dueDate={filteredItem.dueDate}
                          progress={filteredItem.progress}
                          importance={filteredItem.importance}
                          id={filteredItem.id}
                          bgColor={filteredItem.bgColor}
                          completed={filteredItem.completed}
                          markTask={markItem}
                        />
                      )}
                      {card == "habit" && (
                        <HabitCard
                          name={filteredItem.name}
                          description={filteredItem.description}
                          id={filteredItem.id}
                          bgColor={filteredItem.bgColor}
                          completed={filteredItem.completed}
                          category={filteredItem.category}
                          period={filteredItem.period}
                          frequency={filteredItem.frequency}
                          markHabit={markItem}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
            <div
              className="bListAddButton"
              onClick={() => {
                openDialog(false, list.id);
              }}
            >
              <i className="fa fa-plus" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BucketList;
