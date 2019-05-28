import {  
    getFilteredHabits,
    getSortedHabits
  } from "../services/methods/habitMethods";
  const habitReducer = (
    state = {
      Habits: [],
      FilteredHabits: [],
      CurrentFilterString: "",
      CurrentStatusFilter: "all",
      CurrentOrderBy: "alphabetical",
      CurrentViewType:"bucket",
      HabitIdsToTrack:["wRYdewEdz1yGwr9cYqKb","rpHvgK1HdBH1WYxEE1La","JFQiskeK8RxDPm31teAV"]
    },
    action
  ) => {
    switch (action.type) {
      case "INSERT_HABITS": {
        let newState = { ...state };
        newState.Habits = [...action.payload];
        newState.FilteredHabits = [...action.payload];
        state = newState;
        break;
      }
      case "ADD_HABIT": {
        let newState = { ...state };
        newState.Habits.push(action.payload);
        newState.FilteredHabits = getFilteredHabits(
          newState.Habits,
          newState.CurrentFilterString,
          newState.CurrentStatusFilter
        );
        state = newState;
        break;
      }
  
      case "UPDATE_HABIT": {
        let newState = { ...state };
        let habitIndex = newState.Habits.findIndex(t => {
          return t.id == action.payload.id;
        });
        newState.Habits[habitIndex] = action.payload;
  
        habitIndex = newState.FilteredHabits.findIndex(t => {
          return t.id == action.payload.id;
        });
        newState.FilteredHabits[habitIndex] = action.payload;
        state = newState;
        break;
      }
  
      case "FILTER_HABITS": {
        let newState = { ...state };
        newState.FilteredHabits = getFilteredHabits(
          newState.Habits,
          action.payload,
          newState.CurrentStatusFilter
        );
        newState.CurrentFilterString = action.payload;
        state = newState;
        break;
      }
      case "FILTER_HABITS_BY_STATUS": {
        let newState = { ...state };
        newState.FilteredHabits = getFilteredHabits(
          newState.Habits,
          newState.CurrentFilterString,
          action.payload
        );
        newState.CurrentStatusFilter = action.payload;
        state = newState;
        break;
      }
      case "SORT_HABITS": {
        let newState = { ...state };
        const {  orderBy } = action.payload;
        newState.Habits=getSortedHabits(newState.Habits,orderBy);
        newState.FilteredHabits = getFilteredHabits(
          newState.Habits,
          newState.CurrentFilterString,
          newState.CurrentStatusFilter
        );
        newState.CurrentOrderBy=action.payload.orderBy;
        state = newState;
        break;
      }
  
      case "UPDATE_HABITS_VIEW_TYPE": {
        let newState = { ...state };
        newState.CurrentViewType=newState.CurrentViewType ==="bucket" ? "grid" : "bucket";
        state = newState;
        break;
      }
      case "REMOVE_HABIT_FILTER": {
        let newState = { ...state };
        newState.FilteredHabits = newState.Habits;
        state = newState;
        break;
      }
      default:{
  
      }
    }
    return state;
  };
  
  
  export default habitReducer;
  