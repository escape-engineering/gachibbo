export type Product = {
  created_at: string;
  id: number;
  point_product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
};

export type ProductDataList = Product[];

export type SupabaseError = {
  code: string;
  message: string;
};
