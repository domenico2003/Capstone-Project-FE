import { SET_PROFILE } from "../actions";

const defaultState = {
  me: null,
};

const ProfiloReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        me: action.payload,
      };

    default:
      return state;
  }
};
export default ProfiloReducer;
