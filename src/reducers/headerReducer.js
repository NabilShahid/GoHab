const headerReducer = (
  state = {
    Icon: "",
    Title: "",
    Search: false,
    CurrentFilterString:""
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_HEADER":{        
        let newState = { ...action.payload };
        state = newState;
        break;
    }
    case "UPDATE_FITLER_STRING":{
      let newState = { ...state };
      newState.CurrentFilterString=action.payload;
      state = newState;
    }
  }
  return state;
};

export default headerReducer;
