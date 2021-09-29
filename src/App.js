import React from 'react';
import { useSelector } from 'react-redux';
import Grid from './components/Grid';
import { isSolvable, isComplete } from './utils/sudoku';


const App = () => {
	const grid = useSelector(({ grid }) => grid)
	const status = useSelector(({ status }) => status);
	const { isSolved } = status;
	return (
		<div>
			<Grid grid={grid} status={status} />
			<button
				className='check'
				disabled={isSolved}
				onClick={() => {
					if (isComplete(grid)) {
						if (!isSolvable(grid)) {
							return alert('Completed!');
						}
					} else {
						isSolvable(grid);
					}
				}}
			>
				Check
			</button>
		</div>

	);
}


export default App;
