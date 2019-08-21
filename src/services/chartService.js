import { getOverduePendingGoalsOrTasks } from "./methods/ghtCommonMethods";
export function getOverdueAndPendingGoalsForChart(goals) {
  const data = getOverduePendingGoalsOrTasks(goals);
  return [
    { name: "Pending", value: data.Pending },
    { name: "Achieved", value: data.Completed },
    { name: "Overdue", value: data.Overdue }
  ];
}
export function getOverdueAndPendingTasksForChart(tasks) {
  const data = getOverduePendingGoalsOrTasks(tasks);
  return [
    { name: "Pending", value: data.Pending },
    { name: "Completed", value: data.Completed },
    { name: "Overdue", value: data.Overdue }
  ];
}
