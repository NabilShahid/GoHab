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

export function getOverdueItems(items) {
  return items.filter(
    item =>
      item.dueDate && !item.completed && new Date(item.dueDate) < new Date()
  );
}
