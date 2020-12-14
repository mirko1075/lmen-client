import axios from "axios";
require("dotenv").config();

// //Connection to DB parameters
// const API_BASE_URL = process.env.API_BASE_URL.toString();
// const API_PORT = process.env.API_PORT.toString();

class CountriesService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://countries-cities.p.rapidapi.com/location/country",
      withCredentials: true,
    });
  }

  getCountries() {
    const pr = this.api
      .get("/list")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`
    return pr;
  }

  getCities(country) {
    const pr = this.api
      .get("/" + country + "/city/list")
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // .then(({ data }) => data); // Shorter way of `.then((response) => response.data);`

    return pr;
  }
}

const countryService = new CountriesService();

export default countryService;

// Service is a set of methods abstracted and placed into a class, out of which we create one instance.
// In the above case, all axios request calls are abstracted into methods.
