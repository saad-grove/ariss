export type AddSubcategoryType = {
  title: string;
  description?: string | null;
  image: string;
  categoryId: string;
  panelUserId: string;
};

export interface FetchSubcategoryInterface {
  id: string;
  title: string;
  category: {
    title: string;
  };
  description: string;
  image: string;
  category_id: string;
  panel_user_id: string;
  created_at: string;
}
