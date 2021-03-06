const loadingReducer = (
  state = {
    goalsLoading: true,
    tasksLoading: true,
    habitsLoading: true
  },
  action
) => {
  switch (action.type) {
    case "TOGGLE_ITEM_LOADING":
      {
        let newState = { ...state };
        newState[action.payload.item] = action.payload.loading;
        state = newState;
      }
      break;
    default: {
    }
  }
  return state;
};
export default loadingReducer;
