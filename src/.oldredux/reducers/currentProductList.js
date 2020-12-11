// [{ product1 }, { product2 }];

const defaultState = [];

function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case "currentProductList":
      return [
        {
          name: "Product 1",
          description: "This is the product 1 description",
        },
      ];
      break;
    default:
      return state;
  }
}

export default reducer;
