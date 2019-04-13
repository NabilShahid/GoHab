import {  
  getFilteredTasks,
  getSortedTasks
} from "../services/methods/taskMethods";
const taskReducer = (
  state = {
    Tasks: [],
    FilteredTasks: [],
    CurrentFilterString: "",
    CurrentStatusFilter: "all",
    CurrentOrderBy: "alphabetical",
    CurrentViewType:"bucket"
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
      let taskIndex = newState.Tasks.findIndex(t => {
        return t.id == action.payload.id;
      });
      newState.Tasks[taskIndex] = action.payload;

      taskIndex = newState.FilteredTasks.findIndex(t => {
        return t.id == action.payload.id;
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
      const {  orderBy } = action.payload;
      newState.Tasks=getSortedTasks(newState.Tasks,orderBy);
      newState.FilteredTasks = getFilteredTasks(
        newState.Tasks,
        newState.CurrentFilterString,
        newState.CurrentStatusFilter
      );
      newState.CurrentOrderBy=action.payload.orderBy;
      state = newState;
      break;
    }

    case "UPDATE_TASKS_VIEW_TYPE": {
      let newState = { ...state };
      newState.CurrentViewType=newState.CurrentViewType ==="bucket" ? "grid" : "bucket";
      state = newState;
      break;
    }
    case "REMOVE_TASK_FILTER": {
      let newState = { ...state };
      newState.FilteredTasks = newState.Tasks;
      state = newState;
      break;
    }
    default:{

    }
  }
  return state;
};


export default taskReducer;
