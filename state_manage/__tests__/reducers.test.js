import profileReducer from "../reducers/userInfoReducer";
import * as ActionTypes from "../actions/profileScreenActionTypes";

describe("profileReducer", () => {
  test("Sets name to new name when SET_NAME action is received", () => {
    const fakeAction = {
      type: ActionTypes.SET_NAME,
      payload: { name: "Haichen Wang" },
    };
    const originalState = {
      name: "Sergio Diaz",
      bio: "Junior in the college of engineering. Selling a bunch of textbooks and clothes I don't need.",
    };
    const expectedState = {
      name: "Haichen Wang",
      bio: "Junior in the college of engineering. Selling a bunch of textbooks and clothes I don't need.",
    };
    const actualState = profileReducer(originalState, fakeAction);
    expect(actualState).toEqual(expectedState);
  });

  test("Sets bio to new bio when SET_BIO action is received", () => {
    const fakeAction = {
      type: ActionTypes.SET_BIO,
      payload: { bio: "This is my new bio!" },
    };
    const originalState = {
      name: "Sergio Diaz",
      bio: "Junior in the college of engineering. Selling a bunch of textbooks and clothes I don't need.",
    };
    const expectedState = {
      name: "Sergio Diaz",
      bio: "This is my new bio!",
    };
    const actualState = profileReducer(originalState, fakeAction);
    expect(actualState).toEqual(expectedState);
  });

  test("Sets name and bio to new values when SET_NAME and SET_BIO action is received", () => {
    const fakeAction1 = {
      type: ActionTypes.SET_NAME,
      payload: { name: "Haichen Wang" },
    };
    const fakeAction2 = {
      type: ActionTypes.SET_BIO,
      payload: { bio: "This is my new bio!" },
    };
    const originalState = {
      name: "Sergio Diaz",
      bio: "Junior in the college of engineering. Selling a bunch of textbooks and clothes I don't need.",
    };
    const expectedState = {
      name: "Haichen Wang",
      bio: "This is my new bio!",
    };
    const actualState = profileReducer(
      profileReducer(originalState, fakeAction1),
      fakeAction2
    );
    expect(actualState).toEqual(expectedState);
  });
});
