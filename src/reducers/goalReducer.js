const goalReducer = (
  state = {
    Goals: [],
    FilteredGoals: []
  },
  action
) => {
  switch (action.type) {
    case "INSERT_GOALS": {
      let newState = { ...state };
      newState.Goals = action.payload;
      newState.FilteredGoals = action.payload;
      state = newState;
      break;
    }
    case "ADD_GOAL": {
      let newState = { ...state };
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

    case "FILTER_GOALS": {
      let newState = { ...state };
      newState.FilteredGoals = newState.Goals.filter(v => {
        return (
          (v.name.toLowerCase() + "\t" + v.description.toLowerCase()).indexOf(
            action.payload
          ) > -1
        );
      });
      state = newState;
      break;
    }
    case "SORT_GOALS": {
      let newState = { ...state };
      const { order, orderBy } = action.payload;
      switch (orderBy) {
        case "alphabetical": {
          newState.FilteredGoals = newState.FilteredGoals.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase())
              return order == "asc" ? -1 : 1;
            else if (a.name.toLowerCase() > b.name.toLowerCase())
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        case "progress": {
          newState.FilteredGoals = newState.FilteredGoals.sort((a, b) => {
            if (a.progress < b.progress)
              return order == "asc" ? -1 : 1;
            else if (a.progress > b.progress)
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        case "dueDate": {
          newState.FilteredGoals = newState.FilteredGoals.sort((a, b) => {
            const aDate=new Date(a.dueDate);
            const bDate=new Date(b.dueDate);
            if (aDate=="Invalid Date") aDate=new Date(0);
            if (bDate=="Invalid Date") bDate=new Date(0);
            
            if (new Date(aDate)< new Date(bDate))
              return order == "asc" ? -1 : 1;
            else if (new Date(aDate) > new Date(bDate))
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        case "importance": {
          newState.FilteredGoals = newState.FilteredGoals.sort((a, b) => {
            if (a.importance < b.importance)
              return order == "asc" ? -1 : 1;
            else if (a.importance > b.importance)
              return order == "desc" ? -1 : 1;
            return 0;
          });
          break;
        }
        default:{
          
        }
      }
      state = newState;
      break;
    }

    case "REMOVE_GOAL_FILTER": {
      let newState = { ...state };
      newState.FilteredGoals = newState.Goals;
      state = newState;
    }
  }
  return state;
};

export default goalReducer;
