import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { SquarePen } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { ROUTES } from '../../../constants/routes';
import { productApi } from '../../../services/product.service';
import type { Category } from '../../../types/category.types';
import type { ProductEditFrontend } from '../../../types/product.types';
import { ErrorMessage, ProductForm, ProductFormHeader, ProductPreview } from './ProductFormParts';
import { formatPriceInput, initialFormData, parsePrice } from './productForm.utils';

export default function EditProductPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<ProductEditFrontend>(initialFormData);
  const [priceInput, setPriceInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError('');
        const [product, categoriesData] = await Promise.all([
          productApi.getById(id),
          productApi.getAllCategories(),
        ]);

        const categoryId = product.categoryId ?? product.category?.id ?? 0;

        setFormData({
          name: product.name ?? '',
          code: product.code ?? '',
          barcode: product.barcode ?? '',
          brandId: 0,
          categoryId,
          subCategoryId: 0,
          stock: product.stock ?? 0,
          price: product.price ?? 0,
          description: product.description ?? '',
          showingInCatalog: Boolean(product.showingInCatalog),
          imageUrl: product.imageUrl ?? '',
          unit: product.unit ?? '',
        });
        setPriceInput(formatPriceInput(product.price ?? 0));
        setCategories(categoriesData.filter((item) => item.status !== false));
      } catch {
        setError('No pudimos cargar el producto o sus categorías desde el backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const { checked } = event.target as HTMLInputElement;
      setFormData((current) => ({ ...current, [name]: checked }));
      return;
    }

    const numericFields = ['categoryId', 'stock'];
    const parsedValue = numericFields.includes(name) ? Number(value) : value;

    setFormData((current) => ({
      ...current,
      [name]: parsedValue,
    }));
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    setPriceInput(rawValue);
    setFormData((current) => ({ ...current, price: parsePrice(rawValue) }));
  };

  const isFormInvalid =
    !formData.name.trim() ||
    !formData.code.trim() ||
    !formData.unit.trim() ||
    !formData.categoryId ||
    formData.price <= 0 ||
    saving ||
    loading;

  const handleConfirm = async () => {
    if (!id) return;

    try {
      setSaving(true);
      setError('');
      await productApi.update(id, {
        code: formData.code.trim(),
        barcode: formData.barcode.trim(),
        categoryId: formData.categoryId,
        name: formData.name.trim(),
        stock: Math.max(0, Math.floor(Number(formData.stock) || 0)),
        price: Math.max(0, formData.price),
        description: formData.description.trim(),
        showingInCatalog: formData.showingInCatalog,
        imageUrl: formData.imageUrl.trim(),
        unit: formData.unit.trim(),
      });
      navigate(ROUTES.products.list);
    } catch {
      setError('No pudimos guardar los cambios del producto.');
    } finally {
      setSaving(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <ProductFormHeader
          title="Editar producto"
          subtitle="Modificá la información necesaria del producto."
          onBack={() => navigate(ROUTES.products.list)}
          icon={<SquarePen className="h-6 w-6 text-sky-600" />}
        />

        {error && <ErrorMessage message={error} />}

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-xl shadow-slate-200/70">
            Cargando producto...
          </div>
        ) : (
          <>
            <ProductPreview
              name={formData.name || 'Producto sin nombre'}
              imageUrl={formData.imageUrl}
              idLabel={`#${id}`}
            />
            <ProductForm
              formData={formData}
              priceInput={priceInput}
              categories={categories}
              isFormInvalid={isFormInvalid}
              submitText="Guardar cambios"
              loadingOptions={loading}
              onChange={handleChange}
              onPriceChange={handlePriceChange}
              onPriceBlur={() => setPriceInput(formatPriceInput(formData.price))}
              onPriceFocus={() => setPriceInput(formData.price > 0 ? String(formData.price) : '')}
              onCancel={() => navigate(ROUTES.products.list)}
              onSubmit={() => setShowConfirmModal(true)}
            />
          </>
        )}

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Guardar cambios"
          message={
            <>
              ¿Seguro que querés guardar <b>{formData.name.trim()}</b>?
            </>
          }
          isLoading={saving}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          confirmText="Guardar"
        />
      </div>
    </DashboardLayout>
  );
}
