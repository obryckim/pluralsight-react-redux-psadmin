import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
	it('Should handle creating courses', () => {
		// arrange
		const store = createStore(rootReducer, initialState);
		const courses = [
			{ title: 'Clean Code' },
			{ title: 'Learning C' }
		];

		// act
		const action0 = courseActions.createCourseSuccess(courses[0]);
		const action1 = courseActions.createCourseSuccess(courses[1]);
		store.dispatch(action0);
		store.dispatch(action1);

		// assert
		const actual0 = store.getState().courses[0];
		const actual1 = store.getState().courses[1];
		const expected0 = { title: 'Clean Code' };
		const expected1 = { title: 'Learning C' };
		expect(actual0).toEqual(expected0);
		expect(actual1).toEqual(expected1);
	});
});
