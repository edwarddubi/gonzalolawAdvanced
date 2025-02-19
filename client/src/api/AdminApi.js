import API from "./BaseApi.js";
import Cookies from "js-cookie";

const getAllClients = async () => {
  let axiosResponse = await API.get("/admin/clients", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve clients!",
      };
    });
  return axiosResponse;
};

const getAllOtherClients = async () => {
  let axiosResponse = await API.get("/admin/otherClients", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve clients!",
      };
    });
  return axiosResponse;
};

const updateClientInfoById = async (id, data) => {
  let axiosResponse = await API.put(`/admin/client/${id}`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve case!",
      };
    });
  return axiosResponse;
};

const getClientFilesById = async (id) => {
  let axiosResponse = await API.get(`/admin/files/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve case!",
      };
    });
  return axiosResponse;
}

const getCaseById = async (id) => {
  let axiosResponse = await API.get(`/case/admin/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve case!",
      };
    });
  return axiosResponse;
};

const getEvents = async () => {
  let axiosResponse = await API.get("/admin/events", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve events!",
      };
    });
  return axiosResponse;
};

const addEvent = async (title, type, startDate, duration, notes, clientId) => {
  let axiosResponse = await API.post(
    "/admin/events",
    {},
    {
      params: {
        title: title,
        type: type,
        startDate: startDate,
        duration: duration,
        clientId: clientId,
        notes: notes,
      },
      headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
    }
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve events!",
      };
    });
  return axiosResponse;
};

const addExistingClient = async (id) => {
  let axiosResponse = await API.post(`/admin/add/${id}`, id, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve client!",
      };
    });
  return axiosResponse;
};

const addClient = async (
  username,
  password,
  firstName,
  secondName,
  middleName,
  otherName,
  street,
  city,
  state,
  zip,
  homePhone,
  workPhone,
  cellPhone,
  email,
  birthDate,
  companyName,
  website
) => {
  let userData = {
    username: username,
    password: password,
    firstName: firstName,
    secondName: secondName,
    middleName: middleName,
    otherName: otherName,
    address: {
      street: street,
      city: city,
      state: state,
      zip: zip,
    },
    company: {
      companyName: companyName,
      website: website,
      companyLogoUrl: "",
    },
    contact: {
      homePhone: homePhone,
      workPhone: workPhone,
      cellPhone: cellPhone,
      email: email,
    },
    birthDate: birthDate,
    imageUrl: "https://react.semantic-ui.com/images/avatar/large/matthew.png",
    files: [],
    cases: [],
  };
  console.log("Adding the user");
  //console.log(userData)
  let axiosResponse = await API.post("/admin/client", userData, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve events!",
      };
    });
  return axiosResponse;
};

const addCase = async (type, startDate, completed, steps, userID) => {
  let caseData = {
    type: type,
    startDate: startDate,
    caseCompleted: completed,
    steps: steps,
  };
  console.log("Adding the user");
  //console.log(caseData);
  let axiosResponse = await API.post(`user/${userID}/cases`, caseData, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve events!",
      };
    });
  return axiosResponse;
};

const updateCase = async (type, startDate, completed, steps, caseID) => {
  let caseData = {
    type: type,
    startDate: startDate,
    caseCompleted: completed,
    steps: steps,
  };
  console.log("Updating the case");
  console.log(caseData);
  let axiosResponse = await API.put(`/case/${caseID}`, caseData, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve events!",
      };
    });
  return axiosResponse;
};

const getAdminByIdAdmin = async (id) => {
  let axiosResponse = await API.get(`/admin/getAdminCalendarAdmin/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          return { error: error.response.data.error };
        }
        return {
          error: "Unable to retrieve case!"
        };
      });
  return axiosResponse;
};

const getAdminByIdUser = async (id) => {
  let axiosResponse = await API.get(`/admin/getAdminCalendarUser/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` }
  })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response) {
          return { error: error.response.data.error };
        }
        return {
          error: "Unable to retrieve case!"
        };
      });
  return axiosResponse;
};

const getAdminById = async (id) => {
  let axiosResponse = await API.get(`/admin/name/${id}`, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return { error: error.response.data.error };
      }
      return {
        error: "Unable to retrieve case!",
      };
    });
  return axiosResponse;
};

const getCurrentAdmin = async () => {
  let axiosResponse = await API.get("/admin/", {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error !== null && error.response) {
        return { error: error.response };
      }
      return {
        error: "Unable to retrieve user!",
      };
    });

  return axiosResponse;
};

const deleteClient = async (clientId) => {
  let axiosResponse = await API.put("/admin/remove/" + clientId, clientId, {
    headers: { Authorization: `Bearer ${Cookies.get("jwt")}` },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        error: "Unable to delete client!",
      };
    });
  return axiosResponse;
};

export {
  getEvents,
  getAllClients,
  getAllOtherClients,
  addEvent,
  addExistingClient,
  addClient,
  getCaseById,
  addCase,
  getAdminById,
  deleteClient,
  updateClientInfoById,
  getClientFilesById,
  updateCase,
  getAdminByIdAdmin,
  getAdminByIdUser,
  getCurrentAdmin,
};
