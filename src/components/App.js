// this component handles the app template used on every page
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage'; // eslint-disable-line import/no-named-as-default

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="container-fluid">
					<Header loading={this.props.loading} />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/courses" component={CoursesPage} />
						<Route exact path="/course" component={ManageCoursePage} />
						<Route path="/course/:id" component={ManageCoursePage} />
						<Route path="/about" component={AboutPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

App.propTypes = {
	loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
	return {
		loading: state.ajaxCallsInProgress > 0
	};
}

export default connect(mapStateToProps)(App);
