import cloneDeep from 'lodash/cloneDeep';
import { default as extend } from 'lodash/assignIn';
import { solver } from '../utils/sudoku';

const initialState = [
	[0, 0, 0, 2, 6, 0, 7, 0, 1],
	[6, 8, 0, 0, 7, 0, 0, 9, 0],
	[1, 9, 0, 0, 0, 4, 5, 0, 0],
	[8, 2, 0, 1, 0, 0, 0, 4, 0],
	[0, 0, 4, 6, 0, 2, 9, 0, 0],
	[0, 5, 0, 0, 0, 3, 0, 2, 8],
	[0, 0, 9, 3, 0, 0, 0, 7, 4],
	[0, 4, 0, 0, 5, 0, 0, 3, 6],
	[7, 0, 3, 0, 1, 8, 0, 0, 0]
];


export function grid(state = cloneDeep(initialState), action) {
	switch (action.type) {
		case 'INPUT_VALUE':
			let { row, col, val } = action;
			let changedRow = [
				...state[row].slice(0, col),
				val,
				...state[row].slice(col + 1)
			];
			return [
				...state.slice(0, row),
				changedRow,
				...state.slice(row + 1)
			];
		case 'SOLVE':
			let originalClone = cloneDeep(initialState); // originalClone will be mutated by solver()
			solver(originalClone);
			return originalClone;
		default:
			return state;
	}
}
