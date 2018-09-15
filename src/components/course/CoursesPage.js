import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {
	// the 5 major pieces of a container component
	// see 1) 2) 3) 4) 5) below

	// 1) constructor, where we initialize state and call our bind functions
	// any functions that need to be bound to the "this" context,
	// this is the best place to do so
	constructor(props) {
		super(props);

		// initialize state
		this.state = {
			course: { title: '' }
		};

		// bind "this" (component context) into the event handlers
		this.onTitleChange = this.onTitleChange.bind(this);
		this.onClickSave = this.onClickSave.bind(this);
	}

	// 2) child functions called by render():
	// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({ course: course });
	}

	onClickSave() {
		this.props.actions.createCourse(this.state.course);
	}

	courseRow(course, index) {
		return <div key={index}>{course.title}</div>;
	}

	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	// child functions called by render():

	// 3) render method... usually calls a child component
	// markup is usually kept separate from the container component
	render() {
		return (
			<div>
				<h1>Courses</h1>
				{this.props.courses.map(this.courseRow)}
				<h2>Add Course</h2>
				<input
					type="text"
					onChange={this.onTitleChange}
					value={this.state.course.title} />
				<input
					type="submit"
					value="Save"
					onClick={this.onClickSave} />
			</div>
		);
	}
}

// 4) prop types and prop type validation
CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

// redux "connect" and related functions
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
function mapStateToProps(state, ownProps) {
	return {
		courses: state.courses
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	};
}

// const connectedStateAndProps =  connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
// can be expressed by this one call: => the first function calls the second one
// this is just` 2 functions calls; the connect functions returns a function
// and that function calls our container component with the result of the first function
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// redux "connect" and related functions
