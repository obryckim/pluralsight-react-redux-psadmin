import expect from 'expect';
import { authorsFormattedForDropdown } from './selectors';

describe('Author Selectors', () => {
    describe('authorsFormattedForDropdown', () => {
        it('shoud return author data formatted for se in a dropdown', () => {
            const authors = [
                { id: 'auth 1', firstName: 'fn1', lastName: 'ln1' },
                { id: 'auth 2', firstName: 'fn2', lastName: 'ln2' }
            ];
            const expected = [
                { value: 'auth 1', text: 'fn1 ln1' },
                { value: 'auth 2', text: 'fn2 ln2' }
            ];

            expect(authorsFormattedForDropdown(authors)).toEqual(expected);
        });
    });
});