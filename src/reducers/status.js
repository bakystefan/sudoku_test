import cloneDeep from 'lodash/cloneDeep';
import { default as extend } from 'lodash/assignIn';

const initialState = {
	isSolved: false,
	isEdited: false
};

export function status(state = cloneDeep(initialState), action) {
	switch (action.type) {
		case 'INPUT_VALUE':
			return extend({}, state, {isEdited: true});
		case 'SOLVE':
			return extend({}, state, {isSolved: true, isEdited: true});
		case 'CLEAR':
			return extend({}, state, {isSolved: false, isEdited: false});
		default:
			return state;
	}
}
