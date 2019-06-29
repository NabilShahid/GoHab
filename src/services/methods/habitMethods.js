import { alphaSort, numericSort, dateSort } from "./ghtCommonMethods";
import { START_DATE_FOR_INDEX } from "../../constants/commonConsts";
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
/**
 * checks if a habit has on ongoing period
 */
export function checkIfPendingTracking(index, period) {
  if (period === "Daily") {
    if (index == moment().diff(moment(START_DATE_FOR_INDEX), "day")) {
      return true;
    }
  } else if (period === "Weekly") {
    if (index == moment().diff(moment(START_DATE_FOR_INDEX), "week")) {
      return true;
    }
  } else if (period === "Monthly") {
    if (index == moment().diff(moment(START_DATE_FOR_INDEX), "month")) {
      return true;
    }
  } else if (period === "Yearly") {
    if (index == moment().diff(moment(START_DATE_FOR_INDEX), "year")) {
      return true;
    }
  }
  return false;
}

export function getCurrentTrackIndex(period) {
  if (period == "Daily")
    return moment().diff(moment(START_DATE_FOR_INDEX), "day");
  if (period == "Weekly")
    return moment().diff(moment(START_DATE_FOR_INDEX), "week");
  if (period == "Monthly")
    return moment().diff(moment(START_DATE_FOR_INDEX), "month");
  if (period == "Yearly")
    return moment().diff(moment(START_DATE_FOR_INDEX), "year");
}

export function getTrackIndexForDate(period, forDate) {
  forDate = moment(forDate);
  if (period == "Daily")
    return forDate.diff(moment(START_DATE_FOR_INDEX), "day");
  if (period == "Weekly")
    return forDate.diff(moment(START_DATE_FOR_INDEX), "week");
  if (period == "Monthly")
    return forDate.diff(moment(START_DATE_FOR_INDEX), "month");
  if (period == "Yearly")
    return forDate.diff(moment(START_DATE_FOR_INDEX), "year");
}

export function getTrackDateFromIndex(period, index) {
  if (period == "Daily")
    return moment(START_DATE_FOR_INDEX)
      .add("days", index)
      .toDate();
  if (period == "Weekly")
    return moment(START_DATE_FOR_INDEX)
      .add("weeks", index)
      .toDate();
  if (period == "Monthly")
    return moment(START_DATE_FOR_INDEX)
      .add("months", index)
      .toDate();
  if (period == "Yearly")
    return moment(START_DATE_FOR_INDEX)
      .add("years", index)
      .toDate();
}

export function getWeekStartAndEndDate(date){
  // let newDate=moment(date).add(1,"days");
  return {
    start:moment(date).subtract(moment(date).isoWeekday()-1,"days").toDate(),
    end:moment(date).add(7-moment(date).isoWeekday()+1,"days").toDate()
  }
}

export function getTrackPeriodString(period, frequency) {
  let trackString = "Following ";
  if (frequency == 1) trackString += " once a ";
  else trackString += frequency + " times a ";
  if (period == "Daily") trackString += "day";
  else trackString += period.substring(0, period.length - 2).toLowerCase();
  return trackString;
}
