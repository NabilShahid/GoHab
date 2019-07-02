const userReducer = (
  state = {
    User: { Email: "", Name: "" }
  },
  action
) => {
  switch (action.type) {
    case "SET_USER":
      let newState = Object.assign({}, { ...state });
      newState.User = action.payload;
      state = newState;
      break;    
    default: {
    }
  }
  return state;
};

export default userReducer;
