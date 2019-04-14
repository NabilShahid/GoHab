import { alphaSort, numericSort, dateSort } from "./ghtCommonMethods";

export function getFilteredHabits(habits, filterString) {
  return habits.filter(v => {
    return (
      (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
        filterString
      ) > -1 
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
    case "dueDate": {
      newHabits = dateSort(habits, "asc", "dueDate");
      break;
    }
    case "importance": {
      newHabits = numericSort(habits, "desc", "importance");
      break;
    }
    default: {
    }
  }
  return newHabits;
}
