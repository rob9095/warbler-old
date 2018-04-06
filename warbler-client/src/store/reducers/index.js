import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import messages from './messages'
import followers from './followers'
import following from './following'

const rootReducer = combineReducers({
	currentUser,
	errors,
	messages,
	followers,
	following
});

export default rootReducer;
