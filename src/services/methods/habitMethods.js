import { alphaSort, numericSort, dateSort } from "./ghtCommonMethods";

export function getFilteredHabits(habits, filterString, currentStatus) {
  return habits.filter(v => {
    const habitStatus = v.completed ? "completed" : "pending";
    return (
      (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
        filterString
      ) > -1 &&
      (currentStatus == "all" || habitStatus == currentStatus)
    );
  });
}

export function getSortedHabits(habits, orderBy) {
  let newHabits = [];
  switch (orderBy) {
    case "alphabetical": {
      newHabits = alphaSort(habits, "asc", "name");
      break;
    }   
    default: {
    }
  }
  return newHabits;
}
