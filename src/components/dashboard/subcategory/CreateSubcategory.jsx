"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { useEffect, useState } from "react";

// ✅ 1. Zod validation schema
const subcategorySchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  category: z
    .string()
    .min(1, { message: "Category is required." })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid category ID format." }),
});

export function CreateSubcategory({ defaultValues }) {
  const [categories, setCategories] = useState([]);

  const form = useForm({
    resolver: zodResolver(subcategorySchema),
    defaultValues: defaultValues || {
      name: "",
      category: "",
    },
  });

  // ✅ Fetch categories for dropdown
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchCategories() {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/category/get-category",
          { signal }
        );
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setCategories(data?.categories || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch categories:", err.message);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  // ✅ Handle submit
  async function onSubmit(values) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/subcategory/create-subcategory",
        values
      );
      console.log("✅ Subcategory created:", response.data);
    } catch (error) {
      console.error(
        "❌ Error creating subcategory:",
        error.response?.data || error.message
      );
    }
  }

  // ✅ Form UI
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Subcategory name (e.g. Laptops)"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the subcategory name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border rounded-md px-3 py-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormDescription>Select a parent category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
