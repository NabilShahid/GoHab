const taskReducer = (
  state = {
    Tasks: [],
    FilteredTasks: [],
    CurrentFilterString: "",
    CurrentStatusFilter: "all",
    CurrentOrder: "asc",
    CurrentOrderBy: "alphabetical"
  },
  action
) => {
  switch (action.type) {
    case "INSERT_TASKS": {
      let newState = { ...state };
      newState.Tasks = [...action.payload];
      newState.FilteredTasks = [...action.payload];
      state = newState;
      break;
    }
    case "ADD_TASK": {
      let newState = { ...state };
      newState.Tasks.push(action.payload);
      newState.FilteredTasks = getFilteredTasks(
        newState.Tasks,
        newState.CurrentFilterString,
        newState.CurrentStatusFilter
      );
      state = newState;
      break;
    }

    case "UPDATE_TASK": {
      let newState = { ...state };
      let taskIndex = newState.Tasks.findIndex(g => {
        return g.id == action.payload.id;
      });
      newState.Tasks[taskIndex] = action.payload;

      taskIndex = newState.FilteredTasks.findIndex(g => {
        return g.id == action.payload.id;
      });
      newState.FilteredTasks[taskIndex] = action.payload;
      state = newState;
      break;
    }

    case "FILTER_TASKS": {
      let newState = { ...state };
      newState.FilteredTasks = getFilteredTasks(
        newState.Tasks,
        action.payload,
        newState.CurrentStatusFilter
      );
      newState.CurrentFilterString = action.payload;
      state = newState;
      break;
    }
    case "FILTER_TASKS_BY_STATUS": {
      let newState = { ...state };
      newState.FilteredTasks = getFilteredTasks(
        newState.Tasks,
        newState.CurrentFilterString,
        action.payload
      );
      newState.CurrentStatusFilter = action.payload;
      state = newState;
      break;
    }
    case "SORT_TASKS": {
      let newState = { ...state };
      const { order, orderBy } = action.payload;
      switch (orderBy) {
        case "alphabetical": {
          newState.Tasks = newState.Tasks.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase())
              return order == "asc" ? -1 : 1;
            else if (a.name.toLowerCase() > b.name.toLowerCase())
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        case "progress": {
          newState.Tasks = newState.Tasks.sort((a, b) => {
            if (a.progress < b.progress) return order == "asc" ? -1 : 1;
            else if (a.progress > b.progress) return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        case "dueDate": {
          newState.Tasks = newState.Tasks.sort((a, b) => {
            const aDate = new Date(a.dueDate);
            const bDate = new Date(b.dueDate);
            if (aDate == "Invalid Date") aDate = new Date(0);
            if (bDate == "Invalid Date") bDate = new Date(0);

            if (new Date(aDate) < new Date(bDate))
              return order == "asc" ? -1 : 1;
            else if (new Date(aDate) > new Date(bDate))
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        case "importance": {
          newState.Tasks = newState.Tasks.sort((a, b) => {
            if (a.importance < b.importance) return order == "asc" ? -1 : 1;
            else if (a.importance > b.importance)
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        default: {
        }
      }
      newState.FilteredTasks = getFilteredTasks(
        newState.Tasks,
        newState.CurrentFilterString,
        newState.CurrentStatusFilter
      );
      newState.CurrentOrder=action.payload.order;
      newState.CurrentOrderBy=action.payload.orderBy;
      state = newState;
      break;
    }

    case "REMOVE_TASK_FILTER": {
      let newState = { ...state };
      newState.FilteredTasks = newState.Tasks;
      state = newState;
    }
  }
  return state;
};

function getFilteredTasks(tasks, filterString, currentStatus) {
  return tasks.filter(v => {
    const taskStatus=v.completed?"completed":"pending";
    return (
      (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
        filterString
      ) > -1 &&
      (currentStatus == "all" || taskStatus==currentStatus)
    );
  });
}
export default taskReducer;
