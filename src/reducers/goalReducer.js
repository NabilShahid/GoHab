import {
  getSortedGoalNamesAndIDs,
  getFilteredGoals,
  getSortedGoals
} from "../services/methods/goalMethods";
const goalReducer = (
  state = {
    Goals: [],
    FilteredGoals: [],
    CurrentFilterString: "",
    CurrentStatusFilter: "all",
    CurrentOrderBy: "alphabetical",
    SortedGoalNamesAndIDs: []
  },
  action
) => {
  switch (action.type) {
    case "INSERT_GOALS": {
      let newState = { ...state };
      newState.Goals = [...action.payload];
      newState.FilteredGoals = [...action.payload];
      newState.SortedGoalNamesAndIDs = getSortedGoalNamesAndIDs(action.payload);
      state = newState;
      break;
    }
    case "ADD_GOAL": {
      let newState = { ...state };
      newState.Goals.push(action.payload);
      newState.FilteredGoals = getFilteredGoals(
        newState.Goals,
        newState.CurrentFilterString,
        newState.CurrentStatusFilter
      );
      newState.SortedGoalNamesAndIDs = getSortedGoalNamesAndIDs(newState.Goals);
      state = newState;
      break;
    }

    case "UPDATE_GOAL": {
      let newState = { ...state };
      let goalIndex = newState.Goals.findIndex(g => {
        return g.id == action.payload.id;
      });
      newState.Goals[goalIndex] = action.payload;

      goalIndex = newState.FilteredGoals.findIndex(g => {
        return g.id == action.payload.id;
      });
      newState.FilteredGoals[goalIndex] = action.payload;
      newState.SortedGoalNamesAndIDs = getSortedGoalNamesAndIDs(newState.Goals);
      state = newState;
      break;
    }

    case "FILTER_GOALS": {
      let newState = { ...state };
      newState.FilteredGoals = getFilteredGoals(
        newState.Goals,
        action.payload,
        newState.CurrentStatusFilter
      );
      newState.CurrentFilterString = action.payload;
      state = newState;
      break;
    }
    case "FILTER_GOALS_BY_STATUS": {
      let newState = { ...state };
      newState.FilteredGoals = getFilteredGoals(
        newState.Goals,
        newState.CurrentFilterString,
        action.payload
      );
      newState.CurrentStatusFilter = action.payload;
      state = newState;
      break;
    }
    case "SORT_GOALS": {
      let newState = { ...state };
      const { orderBy } = action.payload;
      newState.Goals = getSortedGoals(newState.Goals, orderBy);
      newState.FilteredGoals = getFilteredGoals(
        newState.Goals,
        newState.CurrentFilterString,
        newState.CurrentStatusFilter
      );      
      newState.CurrentOrderBy = action.payload.orderBy;
      state = newState;
      break;
    }

    case "REMOVE_GOAL_FILTER": {
      let newState = { ...state };
      newState.FilteredGoals = JSON.parse(JSON.stringify(newState.Goals));
      state = newState;
      break;
    }

    default: {
    }
  }
  return state;
};

export default goalReducer;
