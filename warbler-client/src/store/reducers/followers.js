import { ADD_FOLLOWER, LOAD_FOLLOWERS } from '../actionTypes';


const follower = (state = [], action) => {
  switch(action.type) {
    case LOAD_FOLLOWERS:
      return [...action.followers];	  
    case ADD_FOLLOWER:
      return [...action.follower];
    default:
      return state;
  }
}

export default follower;
