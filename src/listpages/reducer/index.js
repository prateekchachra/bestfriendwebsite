


const mainReducer = function (state = {
  name: '',
  answers: [],
  language: 'en',

}, action) {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      {
             return {...state, language: action.payload};
    }
    case "SAVE_NAME":
      {
             return {...state, name: action.payload};
    }
    default:
      return state;
  }
};

export default mainReducer;