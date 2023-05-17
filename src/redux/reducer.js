import { GET_SERVICES } from "./types";

const initialState = {
  allServices: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_SERVICES:
        return {
          ...state, 
          allServices: action.payload
        }
        default:
          return {...state};
  }
};

export default rootReducer;
