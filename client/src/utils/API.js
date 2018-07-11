import axios from "axios";

export default {
  signup: function(data) {
    return axios.post("/api/signup", data);
  },
  getDogs: function() {
    return axios.get("/api/dogs");
  },

  review: function(data) {
    return axios.post("/api/review", data);
  },

  getProfile: function(id) {
    return axios.get("/api/profile/" + id);
  },

  login: function(data) {
    return axios.post("/api/login", data);
  },
};
