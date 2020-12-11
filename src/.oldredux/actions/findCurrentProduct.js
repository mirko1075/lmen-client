export const type = "findCurrentProduct";

const findCurrentProduct = (id) => {
  return {
    type,
    payload: id,
  };
};

export default findCurrentProduct;
