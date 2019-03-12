const goalReducer = (
  state = {
    Goals: [],
    FilteredGoals:[]
  },
  action
) => {
  switch (action.type) {
    case "INSERT_GOALS": {
      let newState = { ...state };
      newState.Goals = action.payload;
      newState.FilteredGoals=action.payload;
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

    case "FILTER_GOALS":{
      let newState = { ...state };
      newState.FilteredGoals=newState.Goals.filter(v=>{
        return (v.name.toLowerCase()+"\t"+v.description.toLowerCase()).indexOf(action.payload)>-1
      });
      state=newState;
      break;
    }
    case "SORT_GOALS":{
      let newState = { ...state };
      newState.FilteredGoals=newState.FilteredGoals.sort((a,b)=>{
        if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
        else if(a.name.toLowerCase()>b.name.toLowerCase())return 1;
        return 0;
      });
      state=newState;
      break;
    }

    case "REMOVE_GOAL_FILTER":{
      let newState = { ...state };
      newState.FilteredGoals=newState.Goals;
      state=newState;
    }
  }
  return state;
};

export default goalReducer;
