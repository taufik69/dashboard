import React from "react";
import { useNavigate } from "react-router";
import { Virtuoso } from "react-virtuoso";

export function ProductList() {
  const navigate = useNavigate();

  // 🧠 Dummy Data
  const data = Array.from({ length: 1000 }, (_, i) => ({
    _id: i + 1,
    name: `Product ${i + 1}`,
    sku: `SKU-${i + 100}`,
    category: `Category ${(i % 10) + 1}`,
    subcategory: `Subcategory ${(i % 15) + 1}`,
    brand: `Brand ${(i % 5) + 1}`,
    purchasePrice: (Math.random() * 500 + 50).toFixed(2),
    wholesalePrice: (Math.random() * 700 + 100).toFixed(2),
    retailPrice: (Math.random() * 1000 + 200).toFixed(2),
    stock: Math.floor(Math.random() * 100),
    size: ["S", "M", "L"].slice(0, (i % 3) + 1),
    color: ["Red", "Blue", "Green"].slice(0, (i % 3) + 1),
    tag: ["new", "sale", "trending"].slice(0, (i % 3) + 1),
    variantType: i % 2 === 0 ? "singleVariant" : "multipleVariant",
    warehouseLocation: `Warehouse ${(i % 3) + 1}`,
  }));

  // 🧩 Handlers
  const handleEdit = (item) => {
    navigate(`/editproduct/${item._id}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete "${item.name}"?`)) {
      alert(`Product "${item.name}" deleted (mock)`);
    }
  };

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white overflow-auto">
      {/* Table Header */}
      <div className="grid grid-cols-14 items-center bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Serial</div>
        <div>Name</div>
        <div>SKU</div>
        <div>Category</div>
        <div>Subcategory</div>
        <div>Brand</div>
        <div>Purchase Price</div>
        <div>Wholesale Price</div>
        <div>Retail Price</div>
        <div>Stock</div>
        <div>Sizes</div>
        <div>Colors</div>
        <div>Variant Type</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Virtualized Table Rows */}
      <Virtuoso
        data={data}
        itemContent={(index, item) => (
          <div
            key={item._id}
            className="grid grid-cols-14 items-center border-b text-sm hover:bg-gray-50 transition-all py-2"
          >
            <div className="truncate px-2">{index + 1}</div>
            <div className="truncate px-2">{item.name}</div>
            <div className="truncate px-2">{item.sku}</div>
            <div className="truncate px-2">{item.category}</div>
            <div className="truncate px-2">{item.subcategory}</div>
            <div className="truncate px-2">{item.brand}</div>
            <div className="truncate px-2">{item.purchasePrice}</div>
            <div className="truncate px-2">{item.wholesalePrice}</div>
            <div className="truncate px-2">{item.retailPrice}</div>
            <div className="truncate px-2 text-center">{item.stock}</div>
            <div className="truncate px-2">{item.size.join(", ")}</div>
            <div className="truncate px-2">{item.color.join(", ")}</div>
            <div className="truncate px-2">{item.variantType}</div>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
