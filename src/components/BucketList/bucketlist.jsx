import React from "react";
import TaskCard from "../TaskCard/taskcard";
import "./bucketlist.css";
const BucketList = ({ items, lists, openDialog, markItem }) => {
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
                    <div className="bListCard" onClick={()=>{openDialog(filteredItem,false)}}>
                      <TaskCard
                        name={filteredItem.name}
                        description={filteredItem.description}
                        dueDate={filteredItem.dueDate}
                        progress={filteredItem.progress}
                        importance={filteredItem.importance}
                        id={filteredItem.id}
                        completed={filteredItem.completed}
                        markTask={markItem}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="bListAddButton" onClick={()=>{openDialog(false,list.id)}}><i className="fa fa-plus"></i></div>

          </div>
        );
      })}
    </div>
  );
};

export default BucketList;
