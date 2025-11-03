import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CreateProduct } from "./CreateProduct";

export function EditProduct() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      {/* Reuse CreateBanner form but pass default values */}
      <CreateProduct defaultValues={{}} />
      <button
        onClick={() => navigate("/productlist")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
