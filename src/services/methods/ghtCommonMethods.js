export function alphaSort(items, order, key) {
  let newItems = [];
  newItems = items.sort((a, b) => {
    if (a[key].toLowerCase() < b[key].toLowerCase())
      return order == "asc" ? -1 : 1;
    else if (a[key].toLowerCase() > b[key].toLowerCase())
      return order == "desc" ? -1 : 1;
    return 0;
  });
  return newItems;
}
export function numericSort(items, order, key) {
  let newItems = [];
  newItems = items.sort((a, b) => {
    if (a[key] < b[key]) return order == "asc" ? -1 : 1;
    else if (a[key] > b[key]) return order == "desc" ? -1 : 1;
    return 0;
  });
  return newItems;
}

export function dateSort(items, order, key) {
  let newItems = [];
  newItems = items.sort((a, b) => {
    const aDate = new Date(a[key]);
    const bDate = new Date(b[key]);
    if (aDate == "Invalid Date") aDate = new Date(0);
    if (bDate == "Invalid Date") bDate = new Date(0);

    if (new Date(aDate) < new Date(bDate)) return order == "asc" ? -1 : 1;
    else if (new Date(aDate) > new Date(bDate)) return order == "desc" ? -1 : 1;
    return 0;
  });
  return newItems;
}

export function getDueItems(items, dueItems) {
  return items.filter(item => dueItems.indexOf(item.id) > -1);
}
export function getRandomInt(max) {
  return parseInt((Math.random() * 100) % max);
}
export function getNotificationText(notificationInfo) {
  let notificationString = "";
  if (notificationInfo[2] == "today")
    notificationString +=
      notificationInfo[0] +
      " " +
      (notificationInfo[0] == 1
        ? notificationInfo[1].substr(0, notificationInfo[1].length - 1)
        : notificationInfo[1]) +
      " due " +
      notificationInfo[2];
  else if (notificationInfo[2] == "week")
    notificationString +=
      notificationInfo[0] +
      " " +
      (notificationInfo[0] == 1
        ? notificationInfo[1].substr(0, notificationInfo[1].length - 1)
        : notificationInfo[1]) +
      " due this " +
      notificationInfo[2];
  else if (notificationInfo[2] == "overdue")
    notificationString +=
      notificationInfo[0] +
      " " +
      (notificationInfo[0] == 1
        ? notificationInfo[1].substr(0, notificationInfo[1].length - 1)
        : notificationInfo[1]) +
      " " +
      notificationInfo[2];
  else if (!notificationInfo[2] && notificationInfo[1] == "Habits")
    notificationString +=
      notificationInfo[0] +
      " " +
      (notificationInfo[0] == 1
        ? notificationInfo[1].substr(0, notificationInfo[1].length - 1)
        : notificationInfo[1]) +
      " " +
      "to track";
  return notificationString.toLowerCase();
}

export function getNotificationDialogText(nt) {
  if (nt[2] == "overdue") return "Overdue " + nt[1];
  else if (nt[2] == "week") return nt[1] + " due this week";
  else if (nt[2] == "today") return nt[1] + " due today";
  return "";
}

export function getOverduePendingGoalsOrTasks(items) {
  return items.reduce(
    (p, c, i) => {
      //completed logic
      if (c.progress == 100 || c.completed) {
        p.Completed++;
      }
      //pending logic
      else {
        if (c.dueDate) {
          if (
            new Date(c.dueDate).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0)
          )
            p.Overdue++;
          else p.Due++;
        } else {
          p.NoDue++;
        }
      }
      return p;
    },
    { Overdue: 0, Completed: 0, NoDue: 0, Due: 0 }
  );
}
export function getOnBeforeAfterDueDateGoalsOrTasks(items) {
  return items.reduce(
    (p, c, i) => {
      //completed logic
      if (c.progress == 100 || c.completed) {
        if (c.dueDate) {
          if (
            new Date(c.dueDate).setHours(0, 0, 0, 0) <
            new Date().setHours(0, 0, 0, 0)
          )
            p.BeforeDueDate++;
          else if (
            new Date(c.dueDate).setHours(0, 0, 0, 0) >
            new Date().setHours(0, 0, 0, 0)
          )
            p.AfterDueDate++;
          else p.OnDueDate++;
        }
      }
      //pending logic
      else {
        if (c.dueDate) {
          if (new Date(c.dueDate) < new Date()) p.Overdue++;
          else p.Due++;
        } else {
          p.NoDue++;
        }
      }
      return p;
    },
    { BeforeDueDate: 0, AfterDueDate: 0, OnDueDate: 0 }
  );
}
