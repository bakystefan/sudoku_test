import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';
import * as _ from 'lodash';

const checkDuplicates = numbers => {
	const withoutZeros = numbers.filter(item => {if(item != 0) return item});
	return _.uniq(withoutZeros).length !== withoutZeros.length;
}

const checkRow = (grid) => {
	let duplicate = false;
	for(let i = 0; i <= 8; i++) {
		const row = grid[i];
		if(checkDuplicates(row)) {
			duplicate = true;
			break;
		}
	}
	return duplicate;
}

const checkColumn = (grid) => {
	let duplicate = false;
	for(let i = 0; i <= 8; i++) {
		const column = grid[i].filter(item => item[0]);
		if(checkDuplicates(column))
			duplicate = true;
			break;
	}
	return duplicate;
}

const checkBox = (grid) => {
	let counterRow = 0;
	let counterCol = 0;
	let duplicate = false;
	for(let i = 0; i <= 8; i++) {
		const box = [];
		for(let row = 0; row <= 2; row++) {
			for(let col = 0; col <= 2; col++) {
				box.push(grid[row+counterRow*3][col+counterCol*3]);
			}
		}
		if(counterCol == 2) {
			counterCol = 0;
			if(counterRow == 2) {
				counterRow = 0;
			} else {
				counterRow++;
			}
		} else {
			counterCol++;
		}
		if(checkDuplicates(box)) {
			duplicate = true;
			break;
		}
	}
	return duplicate;
}

export const solver2 = (grid) => {
	if(checkRow(grid)) {
		alert('Error: Row contains duplicate numbers');
		return true;
	}
	if(checkColumn(grid)) {
		alert('Error: Column contains duplicate numbers');
		return true;
	}
	if(checkBox(grid)) {
		alert('Error: One of the nine 3x3 subgrids that compose the grid contains duplicate numbers')
		return true;
	}
	return false;	
}

export const isSolvable = (grid) => {
	let clonedGrid = cloneDeep(grid);
	return solver2(clonedGrid);
}

/*
	If each of the numbers from 1 to 9 are repeated on the grid 9 times
	indicates the suduko is completed/solved
*/
export const isComplete = (grid) => {
	let values = flatten(grid);
	let list = {};
	values.map((val) => list[val] = list[val] ? list[val] + 1 : 1);
	delete list['0'];
	var total = Object.keys(list).reduce((total, key) => total + list[key], 0);
	return total === 81 ? true : false;
}
