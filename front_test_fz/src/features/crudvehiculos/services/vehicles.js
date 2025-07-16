import axiosInstance from "../../../services/api/axiosInstances";

/**
 * Obtiene la lista de vehiculos
 * 
 * @returns {Promise<Object[]>} La lista de veh culos
 * @throws {Error} Un error si no se puede obtener la lista de veh culos
 */
export const getVehicles = async () => {
  try {
    // traer token del sessionStorage  para ponerlo en el header
    const response = await axiosInstance.get("/vehicles");
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
}

/**
 * Elimina un vehiculo por su id
 * @param {number} id El id del veh culo a eliminar
 * @returns {Promise<Object>} La respuesta del servidor con el resultado de la eliminaci n
 * @throws {Error} Un error si no se puede eliminar el veh culo
 */
export const deleteVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
}


export const editVehicle = async (id, vehicleData) => {
  try {
    const response = await axiosInstance.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error editing vehicle:", error);
    throw error;
  }
}

export const getVehicleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/vehicles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
}

export const createVehicle = async (vehicleData) => {
  try {
    const response = await axiosInstance.post("/vehicles", vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
}

export const updateVehicle = async (id, vehicleData) => {
  try {
    const response = await axiosInstance.put(`/vehicles/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
}