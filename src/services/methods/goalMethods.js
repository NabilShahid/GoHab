export function getSortedGoalNamesAndIDs(goals) {
  let goalNameAndIDs = goals.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    else return 0;
  });
  goalNameAndIDs = goals.map(g => {
    return {
      name: g.name,
      id: g.id
    };
  });
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
