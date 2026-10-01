import api from '../lib/axios';
import { brandApi } from './brand.service';
import type { Brand } from '../types/brand.types';
import type { Category, SubCategory } from '../types/category.types';
import type { CreateProductDto, Product, ProductEditBackend } from '../types/product.types';

type ApiResponse<T> = {
  ok: boolean;
  data: T;
};

type ProductsResponse = {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

type BackendProductPayload = {
  code: string;
  barcode?: string | null;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  salePrice: number;
  currentStock: number;
  taxRate: number;
  allowSellWithoutStock: boolean;
  isAvailable: boolean;
  isActive: boolean;
  categoryId?: number | null;
  brandId?: number | null;
  unit?: string;
};

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    price: product.price ?? product.salePrice ?? 0,
    stock: product.stock ?? product.currentStock ?? 0,
    status: product.status ?? product.isActive,
    showingInCatalog: product.showingInCatalog ?? product.isAvailable ?? true,
    imageUrl: product.imageUrl ?? '',
    description: product.description ?? '',
    subCategoryId: product.subCategoryId ?? 0,
  };
}

function toBackendPayload(payload: ProductEditBackend): Partial<BackendProductPayload> {
  const code = payload.code?.trim() || `PROD-${Date.now()}`;
  return {
    code,
    barcode: payload.barcode?.trim() || null,
    name: payload.name?.trim(),
    description: payload.description?.trim() || null,
    imageUrl: payload.imageUrl?.trim() || null,
    salePrice: payload.price === undefined ? undefined : Math.max(0, payload.price),
    currentStock:
      payload.stock === undefined ? undefined : Math.max(0, Math.floor(Number(payload.stock) || 0)),
    taxRate: 21,
    allowSellWithoutStock: false,
    isAvailable: payload.showingInCatalog ?? true,
    categoryId: payload.categoryId || null,
    brandId: payload.brandId || null,
    unit: payload.unit?.trim() || 'un',
  };
}

export const productApi = {
  getById: async (id: string | number): Promise<Product> => {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return normalizeProduct(data.data);
  },

  getAllProducts: async (includeInactive = false): Promise<Product[]> => {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(
      `/products?limit=100${includeInactive ? '&includeInactive=true' : ''}`,
    );
    return data.data.products.map(normalizeProduct);
  },

  reactivate: async (id: string | number): Promise<void> => {
    await api.patch(`/products/${id}/reactivate`);
  },

  create: async (payload: CreateProductDto): Promise<Product> => {
    const { data } = await api.post<ApiResponse<Product>>(
      '/products',
      toBackendPayload(payload) as BackendProductPayload,
    );
    return normalizeProduct(data.data);
  },

  update: async (id: string | number, payload: ProductEditBackend): Promise<Product> => {
    const { data } = await api.put<ApiResponse<Product>>(
      `/products/${id}`,
      toBackendPayload(payload),
    );
    return normalizeProduct(data.data);
  },

  delete: async (id: string | number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  disable: async (id: string | number): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch {
      await api.put(`/products/${id}`, { status: false });
    }
  },

  getAllCategories: async (): Promise<Category[]> => {
    const { data } = await api.get<ApiResponse<Category[]>>('/product-categories');
    return data.data.map((category) => ({
      ...category,
      status: category.status ?? category.isActive,
    }));
  },

  getAllBrands: async (): Promise<Brand[]> => {
    return brandApi.getAll();
  },

  getAllSubcategories: async (): Promise<SubCategory[]> => {
    return [];
  },
};
