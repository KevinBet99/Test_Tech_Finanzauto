import axiosInstance from "../../../services/api/axiosInstances";

export const authLogin = async (usernameOrEmail, password) => {
  if (!usernameOrEmail || !password) {
    return Promise.resolve({
      status: 400,
      message: "Usuario y contraseña son requeridos",
    });
  }

  try {
    const response = await axiosInstance.post("/userslogin/authenticate", {
      usernameOrEmail,
      password,
    });

    if (response.status === 200) {
      sessionStorage.setItem("token", response.data.token);
      window.location.href = "/menu";
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // Error de la API (401, 403, etc)
      return {
        status: error.response.status,
        message: error.response.data?.message || "Error de autenticación",
      };
    } else {
      // Error de red u otro
      return {
        status: 500,
        message: "Error de conexión con el servidor",
      };
    }
  }
};
