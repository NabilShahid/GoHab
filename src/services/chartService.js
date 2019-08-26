import { getOverduePendingGoalsOrTasks } from "./methods/ghtCommonMethods";
import { getSortedGoals } from "./methods/goalMethods";
import moment from "moment";

export function getOverdueAndPendingGoalsForChart(goals) {
  const data = getOverduePendingGoalsOrTasks(goals);
  return [
    { name: "Overdue", value: data.Overdue },
    { name: "Achieved", value: data.Completed },
    { name: "Not Due", value: data.NoDue },
    { name: "Due", value: data.Due }
  ];
}
export function getOverdueAndPendingTasksForChart(tasks) {
  const data = getOverduePendingGoalsOrTasks(tasks);
  return [
    { name: "Overdue", value: data.Overdue },
    { name: "Completed", value: data.Completed },
    { name: "Not Due", value: data.NoDue },
    { name: "Due", value: data.Due }
  ];
}

export function getGoalProgressArrayForChart(goals) {
  let sortedGoals = getSortedGoals(goals, "dueDate");
  return sortedGoals
    .filter(g => g.dateCompleted)
    .map(g => {
      return {
        name: g.name,
        days: moment(g.dueDate).diff(moment(g.dateCompleted), "day")
      };
    });
}
