import { alphaSort, numericSort, dateSort } from "./ghtCommonMethods";

export function getFilteredTasks(tasks, filterString, currentStatus) {
  return tasks.filter(v => {
    const taskStatus = v.completed ? "completed" : "pending";
    return (
      (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
        filterString
      ) > -1 &&
      (currentStatus == "all" || taskStatus == currentStatus)
    );
  });
}

export function getSortedTasks(tasks, orderBy) {
  let newTasks = [];
  switch (orderBy) {
    case "alphabetical": {
      newTasks = alphaSort(tasks, "asc", "name");
      break;
    }
    case "dueDate": {
      newTasks = dateSort(tasks, "asc", "dueDate");
      break;
    }
    case "importance": {
      newTasks = numericSort(tasks, "desc", "importance");
      break;
    }
    default: {
    }
  }
  return newTasks;
}
