import { ReactComponent as Goal } from "../assets/icons/target1.svg";
import { ReactComponent as Habit } from "../assets/icons/event.svg";
import { ReactComponent as Task } from "../assets/icons/task.svg";
import { ReactComponent as Home } from "../assets/icons/home.svg";
import { ReactComponent as Items } from "../assets/icons/items.svg";
import { ReactComponent as Analytics } from "../assets/icons/pchart.svg";
import { ReactComponent as HabitTracking } from "../assets/icons/to-do-list.svg";
import { ReactComponent as TrackHabits } from "../assets/icons/computer.svg";
import { ReactComponent as HabitsRecord } from "../assets/icons/sales.svg";
import { ReactComponent as Calendar } from "../assets/icons/calendar6.svg";
import { ReactComponent as Health } from "../assets/icons/heartbeat.svg";
import { ReactComponent as PersonalDevelopment } from "../assets/icons/gears-in-bald-head-side-view.svg";
import { ReactComponent as Social } from "../assets/icons/multiple-users-silhouette.svg";
import { ReactComponent as Relationship } from "../assets/icons//favorite-heart-button.svg";
import { ReactComponent as RoutineWork } from "../assets/icons/clock.svg";
import { ReactComponent as Other } from "../assets/icons/help-round-button.svg";
export { ReactComponent as FilterAndSort } from "../assets/icons/filter-and-sort-arrows.svg";

const ICONS = {
  Goal,
  Habit,
  Task,
  Home,
  Items,
  Analytics,
  HabitTracking,
  TrackHabits,
  HabitsRecord,
  Calendar
};
export const HEADER_ICONS_STYLES = {
  Home: { marginBottom: "8px" },
  Habit: { marginBottom: "4px" },
  Task: { marginBottom: "6px" },
  Analytics: { marginBottom: "4px" },
  TrackHabits: { marginBottom: "2px" },
  HabitsRecord: { marginBottom: "4px" }
};

export const CATEGORY_ICONS = {
  Health,
  PersonalDevelopment,
  Social,
  Relationship,
  RoutineWork,
  Other
};
export default ICONS;
