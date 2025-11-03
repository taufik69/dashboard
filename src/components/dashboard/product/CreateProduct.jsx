import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";

// 🧠 Zod Validation Schema
const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(5, "Description must be at least 5 characters."),
  category: z.string().min(1, "Category ID is required."),
  subcategory: z.string().min(1, "Subcategory ID is required."),
  brand: z.string().min(1, "Brand ID is required."),
  sku: z.string().min(1, "SKU is required."),
  purchasePrice: z.number().min(1, "Purchase price is required."),
  wholesalePrice: z.number().min(1, "Wholesale price is required."),
  retailPrice: z.number().min(1, "Retail price is required."),
  warrantyInformation: z.string().optional(),
  manufactureCountry: z.string().optional(),
  stock: z.number().min(0, "Stock must be a positive number."),
  size: z.array(z.string().min(1)).optional(),
  color: z.array(z.string().min(1)).optional(),
  tag: z.array(z.string().min(1)).optional(),
  rating: z.number().min(0).max(5),
  shippingInformation: z.string().optional(),
  groupUnit: z.string().optional(),
  groupUnitQuantity: z.number().optional(),
  unit: z.string().optional(),
  warehouseLocation: z.string().optional(),
  alertQuantity: z.number().optional(),
  barCode: z.string().optional(),
  variantType: z.enum(["singleVariant", "multipleVariant"]),
  specifications: z.string().optional(),
});

export function CreateProduct() {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subcategory: "",
      brand: "",
      sku: "",
      purchasePrice: 0,
      wholesalePrice: 0,
      retailPrice: 0,
      warrantyInformation: "",
      manufactureCountry: "",
      stock: 0,
      size: [""],
      color: [""],
      tag: [""],
      rating: 0,
      shippingInformation: "",
      groupUnit: "",
      groupUnitQuantity: 0,
      unit: "",
      warehouseLocation: "",
      alertQuantity: 0,
      barCode: "",
      variantType: "singleVariant",
      specifications: "",
    },
  });

  // 🧱 Dynamic arrays for size, color, tag
  const { fields: sizeFields, append: addSize } = useFieldArray({
    control: form.control,
    name: "size",
  });
  const { fields: colorFields, append: addColor } = useFieldArray({
    control: form.control,
    name: "color",
  });
  const { fields: tagFields, append: addTag } = useFieldArray({
    control: form.control,
    name: "tag",
  });

  // ✅ Submit handler (no API)
  const onSubmit = (values) => {
    console.log("✅ Product Data:", values);
    alert("Product data logged in console!");
  };

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
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. iPhone 15 Pro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* SKU */}
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="e.g. AZU-TEW-4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category / Subcategory / Brand */}
        {["category", "subcategory", "brand"].map((name) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {name.charAt(0).toUpperCase() + name.slice(1)} ID
                </FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${name} ID`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write product description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Numeric Fields */}
        {[
          "purchasePrice",
          "wholesalePrice",
          "retailPrice",
          "stock",
          "groupUnitQuantity",
          "alertQuantity",
          "rating",
        ].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Text Fields */}
        {[
          "warrantyInformation",
          "manufactureCountry",
          "shippingInformation",
          "groupUnit",
          "unit",
          "warehouseLocation",
          "barCode",
          "specifications",
        ].map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {fieldName
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Variant Type */}
        <FormField
          control={form.control}
          name="variantType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Type</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="border rounded-md px-3 py-2 w-full"
                >
                  <option value="singleVariant">Single Variant</option>
                  <option value="multipleVariant">Multiple Variant</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Array Fields */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Sizes */}
          <div>
            <label className="font-medium text-sm mb-1 block">Sizes</label>
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
            <label className="font-medium text-sm mb-1 block">Colors</label>
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

          {/* Tags */}
          <div>
            <label className="font-medium text-sm mb-1 block">Tags</label>
            {tagFields.map((item, index) => (
              <Input
                key={item.id}
                placeholder="Enter tag"
                {...form.register(`tag.${index}`)}
                className="mb-2"
              />
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => addTag("")}
              className="w-full"
            >
              + Add Tag
            </Button>
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            Create Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
