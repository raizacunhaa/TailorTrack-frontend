import api from '../lib/axios';
import type {
  Brand,
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../types/category.types';

type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

function normalizeCategory(category: Category): Category {
  return {
    ...category,
    status: category.status ?? category.isActive,
  };
}

export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get<ApiResponse<Category[]>>('/product-categories');
    return data.data.map(normalizeCategory);
  },

  getById: async (id: string | number): Promise<Category> => {
    const { data } = await api.get<ApiResponse<Category>>(`/product-categories/${id}`);
    return normalizeCategory(data.data);
  },

  create: async (payload: CreateCategoryDto): Promise<Category> => {
    const { data } = await api.post<ApiResponse<Category>>('/product-categories', payload);
    return normalizeCategory(data.data);
  },

  update: async (id: string | number, payload: UpdateCategoryDto): Promise<Category> => {
    const { data } = await api.put<ApiResponse<Category>>(`/product-categories/${id}`, payload);
    return normalizeCategory(data.data);
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/product-categories/${id}`);
  },
};

export const brandApi = {
  getAll: async (): Promise<Brand[]> => {
    return [];
  },
};
