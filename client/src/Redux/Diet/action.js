export const SET_SATE = 'SET_STATE';
export const SET_POSITION = 'SET_POSITION';

export const setState = (state) => {
  return {
    type: SET_SATE,
    state,
  };
};

export const setPosition = (position) => {
  return {
    type: SET_POSITION,
    position,
  };
};
