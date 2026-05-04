import { z } from "zod";

const ImageSchema = z.object({
  url: z.string().url(),
  altText: z.string().min(1),
});

const PromotionSchema = z.object({
  name: z.string().min(1),
  percentage: z.number().int().min(0).max(100),
});

const ProductSchema = z.object({
  articleNumber: z.string().regex(/^[0-9]{7}$/),
  gtin: z.string().regex(/^[0-9]{13}$/),
  url: z.string().regex(/^\/.*/),
  image: ImageSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  brandName: z.string().min(1),
  brandLogo: z.string().url(),
  price: z.number().int().min(0),
  promotion: PromotionSchema.nullable().optional(),
});

export const ColumbusDataSchema = z.object({
  title: z.string().min(1),
  logo: ImageSchema,
  products: z.array(ProductSchema).min(1),
});

// Inferred TypeScript types — used everywhere else in the app.
export type Image = z.infer<typeof ImageSchema>;
export type Promotion = z.infer<typeof PromotionSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ColumbusRecruitmentData = z.infer<typeof ColumbusDataSchema>;
