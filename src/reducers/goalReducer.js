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
      newState.Goals = [...action.payload];
      newState.FilteredGoals = [...action.payload];
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
      let goalIndex= newState.Goals.findIndex(g => {
        return g.id == action.payload.id
      });
      newState.Goals[goalIndex]=action.payload;
      
      goalIndex = newState.FilteredGoals.findIndex(g => {
        return g.id == action.payload.id
      });
      newState.FilteredGoals[goalIndex]=action.payload;
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
    case "FILTER_BY_STATUS": {
      let newState = { ...state };
       if(action.payload=="completed") newState.FilteredGoals = newState.Goals.filter(v =>v.progress==100);
      else if(action.payload=="pending") newState.FilteredGoals = newState.Goals.filter(v =>v.progress<100);
      else newState.FilteredGoals=newState.Goals
      // else if(status=="all") newState.FilteredGoals = newState.FilteredGoals.filter(v =>v.progress==0);
      state = newState;
      break;
    }
    case "SORT_GOALS": {
      let newState = { ...state };
      const { order, orderBy } = action.payload;
      console.log(newState)
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
      console.log(newState)
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
