export const login = (userId, email, username) => ({
  type: "LOG_IN",
  payload: { userId, email, username },
});

export const logout = () => ({
  type: "LOG_OUT",
  payload: null,
});
