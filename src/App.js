import React from 'react';
import Grid from './components/Grid';
import { isSolvable, isComplete } from './utils/sudoku';

/* Application Container Component */
const App = React.createClass({
	componentDidMount(){
		this.unsubscribe = this.props.store.subscribe(() => {
			this.forceUpdate();
		})
	},
	componentWillUnmount() {
		this.unsubscribe();
	},
	render() {
		const { store } = this.props;
		const { grid, status } = store.getState();
		const { isSolved } = status;
		return (
			<div>
				<Grid grid={grid} status={status} {...this.props}/>

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
});

export default App;
