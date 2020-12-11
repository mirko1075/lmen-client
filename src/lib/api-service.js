import axios from "axios";
require("dotenv").config();

// //Connection to DB parameters
// const API_BASE_URL = process.env.API_BASE_URL.toString();
// const API_PORT = process.env.API_PORT.toString();

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:5000/api",
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
  getCategories() {
    const pr = this.api
      .get("/categories")
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
