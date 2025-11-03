import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { CreateSubcategory } from "./CreateSubcategory";

export function EditSubCategory() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit sub Category</h2>
      {/* Reuse CreateBanner form but pass default values */}
      <CreateSubcategory defaultValues={{}} />
      <button
        onClick={() => navigate("/bannerlist")}
        className="mt-4 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
