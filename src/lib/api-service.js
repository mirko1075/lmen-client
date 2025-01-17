import axios from "axios";
require("dotenv").config();

// //Connection to DB parameters
// const API_BASE_URL = process.env.API_BASE_URL.toString();
// const API_PORT = process.env.API_PORT.toString();

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL + "/api",
      withCredentials: true,
    });
  }

  getAll() {
    const pr = this.api
      .get("/products")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`

    return pr;
  }

  getForCategories(category) {
    const pr = this.api
      .get("/categories/" + category)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`

    return pr;
  }

  getOne(productId) {
    const pr = this.api
      .get("/products/" + productId)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  createOne(
    image,
    name,
    description,
    dimension,
    category,
    technic,
    material,
    price,
    stock
  ) {
    const pr = this.api
      .post("/products/", {
        image,
        name,
        description,
        dimension,
        category,
        technic,
        material,
        price,
        stock,
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  getCategories() {
    const pr = this.api
      .get("/categories")
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  postReview(productId, title, message, rate) {
    const pr = this.api
      .post("/product/" + productId + "/reviews", {
        productId,
        title,
        message,
        rate,
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  deleteReview(reviewId, productId) {
    const pr = this.api
      .delete("/product/" + productId + "/review/" + reviewId)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }

  sendContactForm(firstName, lastName, email, message) {
    console.log('Sending')
    const pr = this.api
      .post("/sendContact", {
        firstName,
        lastName,
        email,
        message,
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
      });
    return pr;
  }
}

const apiService = new ApiService();

export default apiService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
