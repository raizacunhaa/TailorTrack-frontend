import type { ProductEditFrontend } from '../../../types/product.types';

export const initialFormData: ProductEditFrontend = {
  name: '',
  code: '',
  barcode: '',
  brandId: 0,
  categoryId: 0,
  subCategoryId: 0,
  stock: 0,
  price: 0,
  description: '',
  showingInCatalog: true,
  imageUrl: '',
  unit: '',
};

export function parsePrice(rawValue: string) {
  const parseableRaw =
    rawValue.includes(',') && rawValue.includes('.')
      ? rawValue.lastIndexOf(',') > rawValue.lastIndexOf('.')
        ? rawValue.replace(/\./g, '').replace(',', '.')
        : rawValue.replace(/,/g, '')
      : rawValue.replace(/,/g, '.');

  const numericValue = Number.parseFloat(parseableRaw);
  return Number.isNaN(numericValue) ? 0 : Math.max(0, numericValue);
}

export function formatPriceInput(price: number) {
  return price > 0 ? price.toLocaleString('es-AR', { minimumFractionDigits: 2 }) : '';
}
