import axios from "axios";

const BODY_TYPE = {
  FILE: "multipart/form-data",
  JSON: "application/json",
};

const intercepters = (code) => {
  if (code === 401) {
    localStorage.clear();
    location.reload();
  }
};

const headerConfig = (type) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  switch (type) {
    case BODY_TYPE.FILE:
      // headers["Content-Type"] = BODY_TYPE.FILE;
      return headers;

    case BODY_TYPE.JSON:
      headers["Content-Type"] = BODY_TYPE.JSON;

      return headers;
    default:
      break;
  }
};

export const apiConfig = {
  get(url, headers) {
    return new Promise((resolve, reject) => {
      return axios({
        url: `${process.env.VUE_APP_API_URL}/${url}`,
        method: "GET",
        headers,
      })
        .then((response) => resolve(response.data))
        .catch((err) => {
          if (err.code) {
            intercepters(err.code);
          }
          reject(err);
        });
    });
  },

  post(url, body) {
    return new Promise((resolve, reject) => {
      return axios({
        url: `${process.env.VUE_APP_API_URL}/${url}`,
        method: "POST",
        body,
        headers: headerConfig(BODY_TYPE.JSON),
      })
        .then((response) => resolve(response.data))
        .catch((err) => {
          if (err.code) {
            intercepters(err.code);
          }
          reject(err);
        });
    });
  },

  delete(url, body) {
    return new Promise((resolve, reject) => {
      return axios({
        url: `${process.env.VUE_APP_API_URL}/${url}`,
        method: "DELETE",
        body,
        headers,
      })
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  },

  update(url, body, headers) {
    return new Promise((resolve, reject) => {
      return axios({
        url: `${process.env.VUE_APP_API_URL}/${url}`,
        method: "PUT",
        body,
        headers,
      })
        .then((response) => resolve(response.data))
        .catch((err) => {
          if (err.code) {
            intercepters(err.code);
          }
          reject(err);
        });
    });
  },
};
