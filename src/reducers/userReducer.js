const userReducer = (
  state = {
    User: { UserEmail: "", DisplayName: "" }
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_USER":
      let newState = Object.assign({},{...state});
      newState.User=action.payload;     
      state = newState
      break;
    case "RESET_COUNTERS":
      state = {
        Counters: [0, 0, 0, 0, 0]
      };
      break;
  }
  return state;
};

export default userReducer;
