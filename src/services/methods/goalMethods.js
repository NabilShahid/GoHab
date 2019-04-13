import {alphaSort,numericSort,dateSort} from "./ghtCommonMethods";
export function getSortedGoalNamesAndIDs(goals) {
  let goalNameAndIDs = alphaSort(goals,"asc","name");
  goalNameAndIDs = goals.map(g => {
    return {
      name: g.name,
      id: g.id
    };
  });
  goalNameAndIDs.unshift({
    name:"Standalone Tasks",
    id:""
  })
  return goalNameAndIDs;
}

export function getFilteredGoals(goals, filterString, currentStatus) {
  return goals.filter(v => {
    const goalStatus = v.progress == 100 ? "completed" : "pending";
    return (
      (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
        filterString
      ) > -1 &&
      (currentStatus == "all" || goalStatus == currentStatus)
    );
  });
}


export function getSortedGoals(goals,orderBy){
  let newGoals=[];
  switch (orderBy) {
    case "alphabetical": {
      newGoals = alphaSort(goals,"asc","name");
      break;
    }
    case "progress": {
      newGoals = numericSort(goals,"asc","progress")
      break;
    }
    case "dueDate": {
      newGoals = dateSort(goals,"asc","dueDate")
      break;
    }
    case "importance": {
      newGoals = numericSort(goals,"desc","importance");
      break;
    }
    default: {
    }
  }
  return newGoals;
}
