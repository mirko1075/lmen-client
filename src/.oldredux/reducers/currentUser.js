const defaultState = {};

function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case "":
      return {};
    default:
      return state;
  }
}

export default reducer;
