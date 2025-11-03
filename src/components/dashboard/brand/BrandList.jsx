import React from "react";
import { useNavigate } from "react-router";
import { Virtuoso } from "react-virtuoso";

export function BrandList() {
  const navigate = useNavigate();

  // 🧠 Dummy data
  const data = Array.from({ length: 200 }, (_, i) => ({
    name: `Brand ${i + 1}`,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo_TV_2015.svg/800px-Logo_TV_2015.svg.png",
  }));

  // ✏️ Handlers
  const handleEdit = (item) => {
    navigate(`/editbrand/${item.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete "${item.name}"?`)) {
      alert("Deleted!");
    }
  };

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-4 items-center justify-center bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Serial</div>
        <div>Name</div>
        <div>Image</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Virtualized Table Rows */}
      <Virtuoso
        data={data}
        itemContent={(index, item) => (
          <div className="grid grid-cols-4 items-center justify-center border-b text-sm hover:bg-gray-50 transition-all py-5">
            <div className="truncate px-2">{index + 1}</div>
            <div className="truncate px-2">{item.name}</div>
            <div className="px-2 flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 object-contain rounded"
              />
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-2 text-xs cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="px-3 py-2 text-xs cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}
