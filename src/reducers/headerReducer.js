const headerReducer = (
  state = {
    Icon: "",
    Title: "",
    Search: false,
    Filter:false,
    CurrentFilterString:"",
    SelectedMenuOption:""
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_HEADER_OPTIONS":{        
        let newState = { ...state };
        newState = Object.assign(newState,action.payload);
        state=newState;
        break;
    }
    case "UPDATE_HEADER_FITLER_STRING":{
      let newState = { ...state };
      newState.CurrentFilterString=action.payload;
      state = newState;
      break;
    }
 
    default:{}
  }
  return state;
};

export default headerReducer;
