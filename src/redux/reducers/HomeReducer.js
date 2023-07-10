import { SET_GRUPPI_HOME, SET_VIDEOGIOCHI_HOME } from "../actions";

const defaultState = {
  videogiochi: [],
  gruppi: [],
};

const HomeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_VIDEOGIOCHI_HOME:
      return {
        ...state,
        videogiochi: action.payload,
      };
    case SET_GRUPPI_HOME:
      return {
        ...state,
        gruppi: action.payload,
      };
    default:
      return state;
  }
};
export default HomeReducer;
