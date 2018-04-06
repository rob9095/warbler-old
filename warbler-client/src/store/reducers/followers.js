import { ADD_FOLLOWER, LOAD_FOLLOWERS } from '../actionTypes';


const followers = (state = [], action) => {
  switch(action.type) {
    case LOAD_FOLLOWERS:
      return [...action.followers];
    case ADD_FOLLOWER:
      return [...action.follower];
    default:
      return state;
  }
}

export default followers;
