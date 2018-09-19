import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
	constructor(props, context) {
		super(props, context);

		// mutable state for this component
		this.state = {
			course: Object.assign({}, props.course),
			errors: {},
			saving: false
		};

		this.updateCourseState = this.updateCourseState.bind(this);
		this.saveCourse = this.saveCourse.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.course.id !== prevState.course.id) {
			return { course: Object.assign({}, nextProps.course) };
		}
		else return null;
	}

	// componentWillReceiveProps(nextProps) {
	// 	// only run this if we are requesting a new course
	// 	if (this.props.course.id != nextProps.course.id) {
	// 		// necessary to populate form when existing course is loaded directly
	// 		this.setState({ course: Object.assign({}, nextProps.course) });
	// 	}
	// }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.course.id !== this.props.course.id) {
			//Perform some operation here
			this.setState({ course: Object.assign({}, this.props.course) }); // eslint-disable-line react/no-did-update-set-state
		}
	}

	updateCourseState(event) {
		const field = event.target.name;
		let course = Object.assign({}, this.state.course);
		course[field] = event.target.value;
		return this.setState({ course: course });
	}

	courseFormIsValid() {
		let formIsValid = true;
		let errors = {};

		if (this.state.course.title.length < 5) {
			errors.title = 'Title must be at least 5 characters.';
			formIsValid = false;
		}

		this.setState({ errors: errors });
		return formIsValid;
	}

	saveCourse(event) {
		event.preventDefault();

		if (!this.courseFormIsValid()) {
			return;
		}

		this.setState({ saving: true });

		this.props.actions
			.saveCourse(this.state.course)
			.then(() => this.redirect())
			.catch(error => {
				toastr.error(error);
				this.setState({ saving: false });
			});
	}

	redirect() {
		this.setState({ saving: false });
		toastr.success('Course saved');
		this.props.history.push('/courses');
	}

	render() {
		return (
			<CourseForm
				allAuthors={this.props.authors}
				onChange={this.updateCourseState}
				onSave={this.saveCourse}
				course={this.state.course}
				errors={this.state.errors}
				saving={this.state.saving}
			/>
		);
	}
}

ManageCoursePage.propTypes = {
	history: PropTypes.object,
	course: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
	const course = courses.filter(course => course.id === id);
	if (course.length) return course[0]; // since filter returns an array, need to grab first one
	return null;
}

function mapStateToProps(state, ownProps) {
	const courseId = ownProps.match.params.id; // from the path '/course/:id'
	let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

	if (courseId && state.courses.length > 0) {
		course = getCourseById(state.courses, courseId);
	}

	return {
		course: course,
		authors: authorsFormattedForDropdown(state.authors)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
