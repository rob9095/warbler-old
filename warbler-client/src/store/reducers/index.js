import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages'
import followers from './followers'

const rootReducer = combineReducers({
	currentUser,
	errors,
	messages,
	followers
});

export default rootReducer;
