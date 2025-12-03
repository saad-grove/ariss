export interface FetchProductsInterface {
  id: string;
  title: string;
  price: number;
  quantity: number;
  description: any;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  is_public: string;
  type: string;
  subcategoryId: string;
  panelUserId: string;
  subcategory: {
    title: string;
  };
}

export type AddProductType = {
  title: string;
  price: number;
  quantity: number;
  description: any;
  img1: string;
  img2: string;
  img3: string | null;
  img4: string | null;
  subcategoryId: string;
  panelUserId: string;
};
