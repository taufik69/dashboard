import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CreateCategory } from "./CreateCategory";

export function EditCategory() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>
      {/* Reuse CreateBanner form but pass default values */}
      <CreateCategory defaultValues={{}} />
      <button
        onClick={() => navigate("/bannerlist")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
