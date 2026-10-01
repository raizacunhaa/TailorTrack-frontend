export interface Category {
  id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
  _count?: { products?: number };
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
  status?: boolean;
  category?: Category;
}

export interface CreateCategoryDto {
  name: string;
}

export interface UpdateCategoryDto {
  name?: string;
  status?: boolean;
}
