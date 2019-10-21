import PAGEKEYS from "./pageKeys";
const HEADEROPTIONS = {};
HEADEROPTIONS[PAGEKEYS["HOME"]] = {
  Icon: "Home",
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
  Icon: "Task",
  Title: "Tasks",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["HABIT_TRACKING"]] = {
  Icon: "TrackHabits",
  Title: "Track Habits",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["HABIT_CALENDAR"]] = {
  Icon: "HabitsRecord",
  Title: "Habits Record",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["TASK_CALENDAR"]] = {
  Icon: "Calendar",
  Title: "Task Calendar",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["GOAL_STATS"]] = {
  Icon: "Analytics",
  Title: "Goal Stats",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["TASK_STATS"]] = {
  Icon: "Analytics",
  Title: "Task Stats",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["HABIT_STATS"]] = {
  Icon: "Analytics",
  Title: "Habit Stats",
  Search: false
};

export default HEADEROPTIONS;
