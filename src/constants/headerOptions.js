import PAGEKEYS from "./pageKeys";
const HEADEROPTIONS = {};
HEADEROPTIONS[PAGEKEYS["HOME"]] = {
  Icon: "fa fa-home",
  Title: "Home",
  Search: false
};
HEADEROPTIONS[PAGEKEYS["GOALS"]] = {
  Icon: "fa fa-home",
  Title: "Goals",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["HABITS"]] = {
  Icon: "fa fa-home",
  Title: "Habits",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["TASKS"]] = {
  Icon: "fa fa-home",
  Title: "Tasks",
  Search: true
};
HEADEROPTIONS[PAGEKEYS["HABIT_TRACKING"]] = {
  Icon: "fa fa-home",
  Title: "Habit Tracking",
  Search: false
};

export default HEADEROPTIONS;
