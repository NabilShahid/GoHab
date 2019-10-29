import {
  getOverduePendingGoalsOrTasks,
  getOnBeforeAfterDueDateGoalsOrTasks
} from "./methods/ghtCommonMethods";
import { getSortedGoals } from "./methods/goalMethods";
import { getSortedTasks } from "./methods/taskMethods";
import {
  getHitMissCountForAllHabits,getHitMissCountForHabit,
  getHabitHitMissArrayForPeriod
} from "./methods/habitMethods";
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
export function getTaskProgressArrayForChart(tasks) {
  let sortedTasks = getSortedTasks(tasks, "dueDate");
  return sortedTasks
    .filter(g => g.dateCompleted)
    .map(g => {
      return {
        name: g.name,
        days: moment(g.dueDate).diff(moment(g.dateCompleted), "day")
      };
    });
}

export function getHabitHitMissDataForHomeRadarChart(habits) {
  const allCounts = getHitMissCountForAllHabits(habits);
  return [
    {
      subject: "Partially Followed",
      count: allCounts.PartiallyFollowed
    },
    {
      subject: "Missed",
      count: allCounts.Missed
    },
    {
      subject: "Followed",
      count: allCounts.Followed
    }
  ];
}

export function getHabitHitMissDataForSingleHabit(habit) {
  const data = getHitMissCountForHabit(habit);
  return [
    {
      name: "Counts",
      "Followed": data.Followed,
      "Partially Followed": data.PartiallyFollowed,
      "Missed": data.Missed
    }
  ];
}

export function getGoalTaskDueDateDataForBarChart(items) {
  const data = getOnBeforeAfterDueDateGoalsOrTasks(items);
  return [
    {
      name: "Completed",
      "On Due Date": data.OnDueDate,
      "Before Due Date": data.BeforeDueDate,
      "After Due Date": data.AfterDueDate
    }
  ];
}

export function getHabitWiseProgressDataForLineChart(
  tracking,
  period,
  startFrom
) {
  return getHabitHitMissArrayForPeriod(tracking, period, startFrom);
}
