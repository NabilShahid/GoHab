import { alphaSort, numericSort, dateSort } from "./ghtCommonMethods";
import moment from "moment";

export function getFilteredHabits(habits, filterString, currentStatus) {
  return habits.filter(v => {
    const habitStatus = v.completed ? "completed" : "pending";
    return (
      (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
        filterString
      ) > -1 &&
      (currentStatus == "all" || habitStatus == currentStatus)
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
    default: {
    }
  }
  return newHabits;
}

export function checkIfPendingTracking(index, period) {
  if (period === "Weekly") {
    if (index == moment().isoWeek()) {
      return true;
    }
  }
  return false;
}

export function getCurrentTrackIndex(period) {
  if (period == "Weekly") return moment().isoWeek();
}

export function getTrackPeriodString(period, frequency) {
  let trackString = "Following ";
  if (frequency == 1) trackString += " once a ";
  else trackString += frequency + " times a ";
  if (period == "Daily") trackString = "day";
  else trackString += period.substring(0, period.length - 2).toLowerCase();
  return trackString;
}
