"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// 🧠 Validation Schema
const variantSchema = z.object({
  product: z.string().min(1, "Product ID required"),
  variantName: z.string().min(1, "Variant name required"),
  size: z
    .array(z.string().min(1, "Size required"))
    .min(1, "At least one size required"),
  color: z
    .array(z.string().min(1, "Color required"))
    .min(1, "At least one color required"),
  stockVariant: z.number().min(0, "Stock must be positive"),
  purchasePrice: z.number().min(0, "Purchase price required"),
  retailPrice: z.number().min(0, "Retail price required"),
  wholesalePrice: z.number().min(0, "Wholesale price required"),
  alertQuantity: z.number().min(0, "Alert quantity required"),
  barCode: z.string().min(1, "Barcode required"),
});

export function CreateVariant() {
  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      product: "",
      variantName: "",
      size: [""],
      color: [""],
      stockVariant: 0,
      purchasePrice: 0,
      retailPrice: 0,
      wholesalePrice: 0,
      alertQuantity: 0,
      barCode: "",
    },
  });

  const { fields: sizeFields, append: addSize } = useFieldArray({
    control: form.control,
    name: "size",
  });

  const { fields: colorFields, append: addColor } = useFieldArray({
    control: form.control,
    name: "color",
  });

  const onSubmit = (values) => {
    console.log("✅ Variant Data:", values);
    alert("Variant data logged in console!");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 p-4"
      >
        {/* Product ID */}
        <FormField
          control={form.control}
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter Product ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Variant Name */}
        <FormField
          control={form.control}
          name="variantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Variant Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sizes */}
        <div>
          <FormLabel>Sizes</FormLabel>
          {sizeFields.map((item, index) => (
            <Input
              key={item.id}
              placeholder="Enter size"
              {...form.register(`size.${index}`)}
              className="mb-2"
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addSize("")}
            className="w-full"
          >
            + Add Size
          </Button>
        </div>

        {/* Colors */}
        <div>
          <FormLabel>Colors</FormLabel>
          {colorFields.map((item, index) => (
            <Input
              key={item.id}
              placeholder="Enter color"
              {...form.register(`color.${index}`)}
              className="mb-2"
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addColor("")}
            className="w-full"
          >
            + Add Color
          </Button>
        </div>

        {/* Numeric Fields */}
        {[
          { name: "stockVariant", label: "Stock" },
          { name: "purchasePrice", label: "Purchase Price" },
          { name: "retailPrice", label: "Retail Price" },
          { name: "wholesalePrice", label: "Wholesale Price" },
          { name: "alertQuantity", label: "Alert Quantity" },
        ].map((fieldDef) => (
          <FormField
            key={fieldDef.name}
            control={form.control}
            name={fieldDef.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldDef.label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Barcode */}
        <FormField
          control={form.control}
          name="barCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
                <Input placeholder="Enter Barcode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit">Submit Variant</Button>
        </div>
      </form>
    </Form>
  );
}
