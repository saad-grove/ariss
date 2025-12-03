export interface FetchCategoryInterface {
  id: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
  panel_user_id: string;
}

export type AddCategoryType = {
  title: string;
  description?: string | null;
  image: string;
  panelUserId: string;
};
