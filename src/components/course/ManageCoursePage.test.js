import expect from 'expect';
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ManageCoursePage } from './ManageCoursePage';

Enzyme.configure({ adapter: new Adapter() });

describe('<ManageCoursePage />', () => {

    it('sets error message when trying to save empty title', () => {
        const props = {
            actions: { saveCourse: () => { return Promise.resolve(); } },
            authors: [],
            course: { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' }
        };
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });

});