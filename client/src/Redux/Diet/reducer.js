import { SET_SATE } from './action';

const initialState = {
  diet: null,
  language: 'english',
  state: 'odisha',
};

const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SATE:
      return Object.assign({}, state, { state: action.state });
    default:
      return state;
  }
};

export default dietReducer;
