// this component handles the app template used on every page
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import CoursesPage from './course/CoursesPage';
import ManageCoursePage from './course/ManageCoursePage';

class App extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<Header />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/courses" component={CoursesPage} />
					<Route exact path="/course" component={ManageCoursePage} />
					<Route path="/course/:id" component={ManageCoursePage} />
					<Route path="/about" component={AboutPage} />
				</Switch>
			</div>
		);
	}
}

export default App;
