export const type = "findSuggestionsResult";

const findSuggestionsResult = (text) => {
  return {
    type,
    payload: text,
  };
};

export default findSuggestionsResult;
