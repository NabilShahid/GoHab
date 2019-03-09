const headerReducer = (
  state = {
    Icon: "",
    Title: "",
    Search: false
  },
  action
) => {
  switch (action.type) {
    case "UPDATE_HEADER":{        
        let newState = { ...action.payload };
        state = newState;
        break;
    }
  }
  return state;
};

export default headerReducer;
