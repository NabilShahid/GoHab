const loadingReducer = (
  state = {
    goalsLoading: false
  },
  action
) => {
  switch (action.type) {
    case "TOGGLE_GOALS_LOADING":
      {
        let newState = { ...state };
        newState.goalsLoading = action.payload;
        state = newState;
      }
      break;
    default: {
    }
  }
  return state;
};
export default loadingReducer;
