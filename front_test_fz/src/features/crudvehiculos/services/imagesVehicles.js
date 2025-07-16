import axiosInstance from "../../../services/api/axiosInstances";

/**
 * Obtiene la lista de vehiculos
 * 
 * @returns {Promise<Object[]>} La lista de veh culos
 * @throws {Error} Un error si no se puede obtener la lista de veh culos
 */
export const getImagesVehicles = async () => {
  try {
    // traer token del sessionStorage  para ponerlo en el header
    const response = await axiosInstance.get("/imagevehicle");
    return response.data;
  } catch (error) {
    console.error("Error fetching imagevehicle:", error);
    throw error;
  }
}

/**
 * Elimina un vehiculo por su id
 * @param {number} id El id del veh culo a eliminar
 * @returns {Promise<Object>} La respuesta del servidor con el resultado de la eliminaci n
 * @throws {Error} Un error si no se puede eliminar el veh culo
 */
export const deleteImageVehicle = async (id) => {
  try {
    const response = await axiosInstance.delete(`/imagevehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
}


/**
 * Edita la información de una imagen de vehículo por su id
 * @param {number} id El id de la imagen del vehículo a editar
 * @param {Object} vehicleData Los nuevos datos de la imagen del vehículo
 * @returns {Promise<Object>} La respuesta del servidor con los datos actualizados
 * @throws {Error} Un error si no se puede editar la imagen del vehículo
 */

export const editImageVehicle = async (id, vehicleData) => {
  try {
    const response = await axiosInstance.put(`/imagevehicle/${id}`, vehicleData);
    return response.data;
  } catch (error) {
    console.error("Error editing vehicle:", error);
    throw error;
  }
}

/**
 * Obtiene una imagen de vehiculo por su id de vehiculo
 * @param {number} id El id del vehiculo al que pertenece la imagen
 * @returns {Promise<Object[]>} La lista de imágenes del vehiculo
 * @throws {Error} Un error si no se puede obtener la lista de imágenes del vehiculo
 */

export const getImageVehicleById = async (id) => {
  try {
    const response = await axiosInstance.get(`/ImageVehicle/by-vehicle/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
}

export const createImageVehicle = async (imageData) => {
  try {
    const response = await axiosInstance.post("/imagevehicle", imageData);
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle image:", error);
    throw error;
  }
}

export const updateImageVehicle = async (id, imageData) => {
  try {
    const response = await axiosInstance.put(`/imagevehicle/${id}`, imageData);
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle image:", error);
    throw error;
  }
}

