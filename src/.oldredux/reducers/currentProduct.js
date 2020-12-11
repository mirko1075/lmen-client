const defaultState = "";

function reducer(state = defaultState, { type, payload }) {
  //type and payload ar properties of action ==> deco
  switch (type) {
    case "":
      return "";
    default:
      return state;
  }
}

export default reducer;
