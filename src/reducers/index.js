import { combineReducers } from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
	// courses: courses (es6 shorthand property name below)
	courses
});

export default rootReducer;
