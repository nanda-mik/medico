export const SET_SATE = 'SET_STATE';

export const setState = (state) => {
  return {
    type: SET_SATE,
    state,
  };
};
