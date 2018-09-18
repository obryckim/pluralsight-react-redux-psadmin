import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';

const rootReducer = combineReducers({
	// courses: courses (es6 shorthand property name below)
	courses,
	authors
});

export default rootReducer;
