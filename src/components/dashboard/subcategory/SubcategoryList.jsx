import React from "react";
import { useNavigate } from "react-router";
import { Virtuoso } from "react-virtuoso";

export function SubCategoryList() {
  const navigate = useNavigate();

  // ✅ Dummy Data (1000 categories)
  const data = Array.from({ length: 1000 }, (_, i) => ({
    _id: i + 1,
    name: `Category ${i + 1}`,
    image: `https://picsum.photos/seed/category${i + 1}/100/100`,
    priority: Math.floor(Math.random() * 10) + 1,
    createdAt: new Date(Date.now() - i * 10000000).toISOString(),
  }));

  // ✅ Handlers
  const handleEdit = (item) => {
    navigate(`/editsubcategory/${item._id}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      alert(`"${item.name}" deleted (dummy action).`);
    }
  };

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white">
      {/* ✅ Table Header */}
      <div className="grid grid-cols-5 items-center bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Serial</div>
        <div>Name</div>
        <div>Image</div>
        <div>Priority</div>
        <div className="text-center">Actions</div>
      </div>

      {/* ✅ Virtualized Table */}
      <Virtuoso
        style={{ height: "calc(90vh - 40px)" }}
        data={data}
        itemContent={(index, item) => (
          <div
            key={item._id}
            className="grid grid-cols-5 items-center border-b text-sm hover:bg-gray-50 transition-all py-4"
          >
            <div className="px-2">{index + 1}</div>
            <div className="truncate px-2">{item.name}</div>
            <div className="px-2 flex justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 object-cover rounded-md"
              />
            </div>
            <div className="px-2 text-center">{item.priority}</div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-2 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="px-3 py-2 text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
