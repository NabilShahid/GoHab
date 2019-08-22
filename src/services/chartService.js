import { getOverduePendingGoalsOrTasks } from "./methods/ghtCommonMethods";
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
