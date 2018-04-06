import { LOAD_FOLLOWING } from '../actionTypes';

const following = (state = [], action) => {
  switch(action.type) {
    case LOAD_FOLLOWING:
      return [...action.following];
    default:
      return state;
  }
}

export default following;
