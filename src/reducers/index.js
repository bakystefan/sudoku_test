import { combineReducers } from 'redux';
import grid from './grid';
import status from './status';

export default combineReducers({
	grid,
	status
});
