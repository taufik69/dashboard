import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CreateBrand } from "./CreateBrand";

export function EditBrand() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Brand</h2>
      {/* Reuse CreateBanner form but pass default values */}
      <CreateBrand defaultValues={{}} />
      <button
        onClick={() => navigate("/brandlist")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
