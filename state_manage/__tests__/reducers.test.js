import profileReducer from '../reducers/profileScreenReducer';
import * as ActionTypes from '../actions/profileScreenActionTypes';

describe('profileReducer', () => {
  test('Sets name to new name when SET_NAME action is received', () => {
    const fakeAction = { type: ActionTypes.SET_NAME, payload: 'Haichen Wang' };
    const originalState = {
      profile: {
          name: 'Sergio Diaz',
          bio: 'Junior in the college of engineering. Selling a bunch of textbooks and clothes I don\'t need.'
      }
    }
    const expectedState = {
      profile: {
          name: 'Haichen Wang',
          bio: 'Junior in the college of engineering. Selling a bunch of textbooks and clothes I don\'t need.'
      }
    }
    const actualState = profileReducer(originalState, fakeAction);
    expect(actualState).toEqual(expectedState);
  })
});