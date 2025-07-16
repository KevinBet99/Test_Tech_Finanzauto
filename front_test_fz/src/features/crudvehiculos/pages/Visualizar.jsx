import Table from "../../../components/Table";
import { useState, useEffect } from "react";
import { getVehicles, deleteVehicle } from "../services/vehicles";

import Modal from "../../../components/Modal";
import Editar from "./Editar"; 
// Importa tu componente de edición

const columns = [
  { header: "Id", accessor: "id" },
  { header: "Placa", accessor: "plate" },
  { header: "Color", accessor: "color" },
  { header: "Marca", accessor: "brand" },
  { header: "Línea", accessor: "model" },
  { header: "Año", accessor: "year" },
  { header: "Kilometraje", accessor: "km" },
  { header: "Valor", accessor: "value" },
  { header: "Observaciones", accessor: "observations" },
  { header: "Estado", accessor: "stage" },
];

const Visualizar = () => {
  const [data, setData] = useState([]);
  const [showdeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editId, setEditId] = useState(null); // Nuevo estado para edición

  useEffect(() => {
    const loadData = async () => {
      try {
        const vehiculos = await getVehicles();
        setData(vehiculos);
      } catch (error) {
        console.error("Error loading vehicles:", error);
      }
    };
    loadData();
  }, []);

  const handleEdit = (row) => {
    setEditId(row.id); // Guarda el id a editar
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedRow) return;
    try {
      await deleteVehicle(selectedRow.id);
      setData((prev) => prev.filter((item) => item.id !== selectedRow.id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
    }
    setShowDeleteModal(false);
    setSelectedRow(null);
  };

  // Lógica para guardar cambios de edición
  const handleSaveEdit = (updated) => {
    setData((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditId(null);
  };

  // Lógica para cancelar edición
  const handleCancelEdit = () => {
    setEditId(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-100 rounded-full p-3 shadow-lg">
          <img
            src="https://img.icons8.com/ios-filled/48/4ade80/car--v1.png"
            alt="Vehículos"
            className="w-10 h-10"
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-800 drop-shadow">
            Inventario de Vehículos
          </h1>
          <p className="text-green-700 text-base font-medium mt-1">
            Consulta, edita o elimina los vehículos registrados en el sistema.
          </p>
        </div>
      </div>
       <button
        className="mb-4 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
        onClick={() => window.location.replace("/menu")}
      >
        Volver al menú
      </button>
      <div className="bg-white rounded-xl shadow p-4">
        {editId ? (
          <Editar
            id={editId}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        ) : (
          <Table
            data={data}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      {showdeleteModal && selectedRow && (
        <Modal
          isOpen={showdeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedRow(null);
          }}
          onConfirm={handleConfirmDelete}
          text={`¿Estás seguro que deseas eliminar el vehículo con placa "${selectedRow.plate}"?`}
        />
      )}
    </div>
  );
};

export default Visualizar;