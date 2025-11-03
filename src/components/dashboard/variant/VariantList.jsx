"use client";

import React from "react";
import { useNavigate } from "react-router";
import { Virtuoso } from "react-virtuoso";

export function VariantList() {
  const navigate = useNavigate();

  // Sample dummy data
  const data = Array.from({ length: 50 }, (_, i) => ({
    product: `68afe96e20192f525cc1446${i}`,
    variantName: `Variant ${i + 1}`,
    size: ["S", "M"],
    color: ["Red", "Blue"],
    stockVariant: 100 + i,
    purchasePrice: 500 + i,
    retailPrice: 700 + i,
    wholesalePrice: 650 + i,
    alertQuantity: 5,
    barCode: `BARCODE-${i + 1000}`,
  }));

  const handleEdit = (item) => {
    navigate(`/editvariant/${item.product}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete variant "${item.variantName}"?`)) {
      alert("Deleted!");
    }
  };

  return (
    <div className="w-full mx-auto h-[90vh] border rounded-lg shadow-sm bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-10 items-center justify-center bg-gray-100 font-semibold text-gray-700 border-b p-3 text-sm">
        <div>Serial</div>
        <div>Product ID</div>
        <div>Variant Name</div>
        <div>Sizes</div>
        <div>Colors</div>
        <div>Stock</div>
        <div>Purchase Price</div>
        <div>Retail Price</div>
        <div>Wholesale Price</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Virtualized Table Rows */}
      <Virtuoso
        data={data}
        itemContent={(index, item) => (
          <div className="grid grid-cols-10 items-center justify-center border-b text-sm hover:bg-gray-50 transition-all py-4">
            <div className="truncate px-2">{index + 1}</div>
            <div className="truncate px-2">{item.product}</div>
            <div className="truncate px-2">{item.variantName}</div>
            <div className="truncate px-2">{item.size.join(", ")}</div>
            <div className="truncate px-2">{item.color.join(", ")}</div>
            <div className="px-2 text-center">{item.stockVariant}</div>
            <div className="px-2 text-center">{item.purchasePrice}</div>
            <div className="px-2 text-center">{item.retailPrice}</div>
            <div className="px-2 text-center">{item.wholesalePrice}</div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="px-2 py-1 text-xs cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item)}
                className="px-2 py-1 cursor-pointer text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
