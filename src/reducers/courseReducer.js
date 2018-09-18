import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
	switch (action.type) {
		// case types.CREATE_COURSE:
		// 	// explode the state array and then add the new course to it
		// 	return [...state, Object.assign({}, action.course)];
		case types.LOAD_COURSES_SUCCESS:
			// whatever was returned will replace what was in the state
			return action.courses;

		case types.CREATE_COURSE_SUCCESS:
			return [...state, Object.assign({}, action.course)];

		case types.UPDATE_COURSE_SUCCESS:
			return [
				// all courses except the one being updated
				...state.filter(course => course.id !== action.course.id),
				// add the one being updated
				Object.assign({}, action.course)
			];

		default:
			return state;
	}
}
