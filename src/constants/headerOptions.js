import PAGEKEYS from "./pageKeys";
const HEADEROPTIONS = {};
HEADEROPTIONS[PAGEKEYS["HOME"]] = {
  Icon: "Goal",
  Title: "Home",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["GOALS"]] = {
  Icon: "Goal",
  Title: "Goals",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["HABITS"]] = {
  Icon: "Habit",
  Title: "Habits",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["TASKS"]] = {
  Icon: "Goal",
  Title: "Tasks",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["HABIT_TRACKING"]] = {
  Icon: "Goal",
  Title: "Habit Tracking",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["HABIT_CALENDAR"]] = {
  Icon: "Goal",
  Title: "Habit Calendar",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["TASK_CALENDAR"]] = {
  Icon: "Goal",
  Title: "Task Calendar",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["GOAL_STATS"]] = {
  Icon: "Goal",
  Title: "Goal Stats",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["TASK_STATS"]] = {
  Icon: "Goal",
  Title: "Task Stats",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["HABIT_STATS"]] = {
  Icon: "Goal",
  Title: "Habit Stats",
  Search: false
};

export default HEADEROPTIONS;
