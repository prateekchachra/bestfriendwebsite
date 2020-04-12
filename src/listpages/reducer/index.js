


const languageReducer = function (state = 0, action) {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      {
            const {language} = action.payload
             return {...state, language};
    }
    default:
      return state;
  }
};

export default languageReducer;