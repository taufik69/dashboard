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
import { useState } from "react";

// 🧠 1. Validation schema
const brandSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Brand name must be at least 2 characters long." }),
  image: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: "Please upload a brand image.",
  }),
});

export function CreateBrand() {
  const [preview, setPreview] = useState(null);

  // 🧾 2. Setup form
  const form = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  // 🧩 3. Handle submit
  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("image", values.image[0]);
    console.log(formData);
  }

  // 🧱 4. UI
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4"
      >
        {/* Brand Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Apple, Samsung, etc." {...field} />
              </FormControl>
              <FormDescription>Enter the brand name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Brand Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Brand Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                    setPreview(
                      e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : null
                    );
                  }}
                />
              </FormControl>
              <FormDescription>
                Upload a logo or image for the brand
              </FormDescription>
              <FormMessage />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                </div>
              )}
            </FormItem>
          )}
        />

        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
