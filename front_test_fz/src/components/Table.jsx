import React, { useState, useMemo } from "react";

// Mapeo de nombres de color en español a valores CSS
const colorMap = {
  blanco: "#f3f4f6",
  gris: "#6b7280",
  rojo: "#ef4444",
  negro: "#111827",
  azul: "#2563eb",
  verde: "#22c55e",
  amarillo: "#eab308",
  plata: "#d1d5db",
  dorado: "#f59e42",
  // Agrega más colores si lo necesitas
};

const Table = ({ columns, data, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search) return data;
    const lower = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor] ?? "")
          .toLowerCase()
          .includes(lower)
      )
    );
  }, [search, data, columns]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Filtro de búsqueda */}
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-4 py-2 text-center bg-green-100 text-green-800 font-bold uppercase text-sm border-b"
                >
                  {col.header}
                </th>
              ))}
              <th className="px-4 py-2 bg-green-100 text-green-800 font-bold uppercase text-sm border-b">
                Editar
              </th>
              <th className="px-4 py-2 bg-green-100 text-green-800 font-bold uppercase text-sm border-b">
                Borrar
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-8 text-gray-400"
                >
                  No hay resultados.
                </td>
              </tr>
            ) : (
              filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-green-50 transition">
                  {columns.map((col) => (
                    <td
                      key={col.accessor}
                      className="px-6 py-4 border-b align-middle"
                    >
                      {col.accessor === "color" ? (
                        <span className="flex items-center justify-center">
                          <span
                            className="w-28 h-8 rounded-full flex items-center justify-center border border-gray-300 mr-2"
                            style={{
                              background:
                                colorMap[
                                  (row[col.accessor] || "").toLowerCase()
                                ] || "#e5e7eb",
                              color:
                                (row[col.accessor] || "").toLowerCase() ===
                                "blanco"
                                  ? "#222"
                                  : "#fff",
                              fontWeight: 600,
                              fontSize: "1rem",
                              textTransform: "capitalize",
                            }}
                          >
                            {row[col.accessor]}
                          </span>
                        </span>
                      ) : col.accessor === "placa" ? (
                        <span className="inline-block px-5 py-2 rounded-md bg-yellow-300 border-2 border-gray-700 font-mono text-lg tracking-widest shadow text-gray-900">
                          {row[col.accessor]}
                        </span>
                      ) : col.accessor === "plate" ? (
                        
                        <span className="inline-block px-5 py-2 rounded-md bg-yellow-300 border-2 border-gray-700 font-mono text-lg tracking-widest shadow text-gray-900">
                          {row[col.accessor]}
                        </span>
                        
                      )
                      
                      : col.accessor === "value" ? (
                        <span className="flex items-center font-bold text-green-700">
                          <svg
                            className="w-5 h-5 mr-1 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {row[col.accessor]?.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                            minimumFractionDigits: 0,
                          })}
                        </span>
                      ) : col.accessor === "km" ? (
                        <span className="flex items-center font-semibold text-gray-700">
                          
                          {row[col.accessor]?.toLocaleString()} km
                        </span>
                      ) : (
                        row[col.accessor]
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-600 hover:text-blue-900 transition"
                      title="Editar"
                    >
                      <svg
                        className="w-5 h-5 inline"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" />
                        <path d="M16 7l1.5-1.5a2.121 2.121 0 10-3-3L13 4" />
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-600 hover:text-red-900 transition"
                      title="Borrar"
                    >
                      <svg
                        className="w-5 h-5 inline"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12z" />
                        <path d="M19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2" />
                        <path d="M9 10v6M15 10v6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
