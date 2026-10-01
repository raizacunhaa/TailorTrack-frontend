import api from '../lib/axios';
import type { Brand, CreateBrandDto, UpdateBrandDto } from '../types/brand.types';

type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

function normalizeBrand(brand: Brand): Brand {
  return {
    ...brand,
    status: brand.status ?? brand.isActive,
  };
}

export const brandApi = {
  getAll: async (): Promise<Brand[]> => {
    const { data } = await api.get<ApiResponse<Brand[]>>('/brands');
    return data.data.map(normalizeBrand);
  },

  getById: async (id: string | number): Promise<Brand> => {
    const { data } = await api.get<ApiResponse<Brand>>(`/brands/${id}`);
    return normalizeBrand(data.data);
  },

  create: async (payload: CreateBrandDto): Promise<Brand> => {
    const { data } = await api.post<ApiResponse<Brand>>('/brands', payload);
    return normalizeBrand(data.data);
  },

  update: async (id: string | number, payload: UpdateBrandDto): Promise<Brand> => {
    const { data } = await api.put<ApiResponse<Brand>>(`/brands/${id}`, payload);
    return normalizeBrand(data.data);
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/brands/${id}`);
  },
};
