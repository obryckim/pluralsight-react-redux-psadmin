// this component handles the app template used on every page
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<p>Header here...</p>
				{/* {this.props.children} */}
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/about" component={AboutPage} />
				</Switch>
			</div>
		);
	}
}

// App.propTypes = {
// 	children: PropTypes.object.isRequired
// };

export default App;
