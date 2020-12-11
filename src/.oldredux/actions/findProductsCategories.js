export const type = "findProductsCategories";

const findProductsCategories = (category) => {
  return {
    type,
    payload: category,
  };
};

export default findProductsCategories;
