import axios from "axios";
require("dotenv").config();

// //Connection to DB parameters
// const API_BASE_URL = process.env.API_BASE_URL.toString();
// const API_PORT = process.env.API_PORT.toString();

class CartService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000/private",
    });
  }

  getCart() {
    const pr = this.api
      .get("/cart")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`

    return pr;
  }

  updateCart(cartArr) {
    const pr = this.api

      .post("/cart/")

      .then((response) => response.data)

      .catch((err) => {
        console.log(err);
      });
    return pr;
  }
}

const cartService = new CartService();

export default cartService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
