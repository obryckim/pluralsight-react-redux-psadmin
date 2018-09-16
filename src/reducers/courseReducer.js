import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
	switch (action.type) {
		// case types.CREATE_COURSE:
		// 	// explode the state array and then add the new course to it
		// 	return [...state, Object.assign({}, action.course)];
		case types.LOAD_COURSES_SUCCESS:
			// whatever was returned will replace what was in the state
			return action.courses;
		default:
			return state;
	}
}
