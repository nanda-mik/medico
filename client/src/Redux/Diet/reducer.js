import { SET_SATE, SET_POSITION } from './action';

const initialState = {
  diet: null,
  language: 'english',
  state: 'odisha',
  position: null,
};

const dietReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSITION:
      return Object.assign({}, state, { position: action.position });
    case SET_SATE:
      return Object.assign({}, state, { state: action.state });
    default:
      return state;
  }
};

export default dietReducer;
