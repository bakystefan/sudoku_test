import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { inputValue } from '../actions/grid';

const pallet = {
	'0': '#FFF', // Box 1
	'30': '#FFF', // Box 2
	'60': '#FFF', // Box 3
	'3': '#FFF', // Box 4
	'33': '#FFF', // Box 5
	'63': '#FFF', // Box 6
	'6': '#FFF', // Box 7
	'36': '#FFF', // Box 8
	'66': '#FFF', // Box 9
};

const getBoxColor = (row, col) => {
	let rowGroup = row - (row % 3);
	let colGroup = (col - (col % 3)) * 10;
	return pallet[rowGroup + colGroup];
};

/* Box Component */

const Box = ({row, col, val, isSolved}) => {
	const dispatch = useDispatch()
	const [isFixed, setIsFixed] = useState(false);
	const inputRef = useRef(null);
	useEffect(() => {
		setIsFixed(val ? true : false)
	}, [])

	const handleChange = (e) => {
		const range = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const val = parseInt(e.target.value);
		const isDeleted = e.target.value === '';

		if (range.indexOf(val) > -1 || isDeleted) {
			dispatch(inputValue(row, col, isDeleted ? 0 : val));
		}
	}

	const input = (
		<input
			ref={inputRef}
			style={{backgroundColor: getBoxColor(row, col)}}
			className={isFixed ? 'fixed' : isSolved ? 'result' : ''}
			disabled={isFixed || isSolved}
			value={val ? val : ''}
			onChange={handleChange}
		/>
	);

	return (
		<td>
			{
				isSolved ?
				(
					<CSSTransitionGroup
						transitionName='solved'
						transitionAppear={true}
						transitionEnterTimeout={200}
						transitionLeaveTimeout={200}							
						transitionAppearTimeout={200}
					>
						{input}
					</CSSTransitionGroup>
				) :
				input
			}
		</td>
	);
}

export default Box;
