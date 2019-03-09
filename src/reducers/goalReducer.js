const goalReducer = (
  state = {
    Goals: []
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_GOALS": {
      let newState = { ...state };
      newState.Goals = action.payload;
      state = newState;
      break;
    }
    case "ADD_GOAL":{
      let newState={...state};
      newState.Goals.push(action.payload);
      state = newState;
      break;
    }

    case "UPDATE_GOAL": {
      let newState = { ...state };
      newState.Goals = newState.Goals.map(g => {
        if (g.id == action.payload.id) {
          return action.payload;
        } else return g;
      });
      state = newState;
      break;
    }
  }
  return state;
};

export default goalReducer;
