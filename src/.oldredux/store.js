import { createStore, combineReducers } from "redux";
import currentBasket from "./reducers/currentBasket";
import currentUser from "./reducers/currentUser";
import currentProductList from "./reducers/currentProductList";
import currentProduct from "./reducers/currentProduct";

const reducer = combineReducers({
  currentBasket,
  currentProduct,
  currentProductList,
  currentUser,
});

const store = createStore(reducer);
export default store;
