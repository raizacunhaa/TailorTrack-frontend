import type { Brand } from './brand.types';
import type { Category, SubCategory } from './category.types';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  code?: string;
  barcode?: string | null;
  imageUrl: string;
  categoryId?: number | null;
  category?: Category | null;
  subCategoryId: number;
  subCategory?: SubCategory & { category?: Category };
  brandId?: number;
  brand?: Brand;
  stock?: number;
  currentStock?: number;
  unit?: string;
  status?: boolean;
  isActive?: boolean;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  showingInCatalog: boolean;
}

// Para el formulario de edición
export interface ProductEditFrontend {
  name: string;
  code: string;
  barcode: string;
  brandId?: number;
  categoryId: number;
  subCategoryId?: number;
  stock: number;
  price: number;
  description: string;
  showingInCatalog: boolean;
  imageUrl: string;
  unit: string;
}

export type CreateProductDto = ProductEditFrontend;
export type ProductEditBackend = Partial<ProductEditFrontend>;
