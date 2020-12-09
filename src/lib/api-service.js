import axios from "axios";

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

  getOne(productId) {
    const pr = this.api
      .get("/products/" + productId)
      .then((response) => response.data);
    return pr;
  }
}

const apiService = new ApiService();

export default apiService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
