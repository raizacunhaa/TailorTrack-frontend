import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { PackagePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { ConfirmModal } from '../../../components/ConfirmModal';
import { ROUTES } from '../../../constants/routes';
import { productApi } from '../../../services/product.service';
import type { Category } from '../../../types/category.types';
import type { ProductEditFrontend } from '../../../types/product.types';
import { ErrorMessage, ProductForm, ProductFormHeader, ProductPreview } from './ProductFormParts';
import { formatPriceInput, initialFormData, parsePrice } from './productForm.utils';

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProductEditFrontend>(initialFormData);
  const [priceInput, setPriceInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        setError('');
        const categoriesData = await productApi.getAllCategories();
        setCategories(categoriesData.filter((item) => item.status !== false));
      } catch {
        setError('No pudimos cargar categorías desde el backend.');
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

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
    loadingOptions;

  const handleConfirm = async () => {
    try {
      setSaving(true);
      setError('');
      await productApi.create({
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
      setError('No pudimos crear el producto. Revisá los datos y la conexión con el backend.');
    } finally {
      setSaving(false);
      setShowConfirmModal(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <ProductFormHeader
          title="Nuevo producto"
          subtitle="Completá la información para cargar un producto."
          onBack={() => navigate(ROUTES.products.list)}
          icon={<PackagePlus className="h-6 w-6 text-sky-600" />}
        />

        {error && <ErrorMessage message={error} />}

        <ProductPreview
          name={formData.name || 'Nuevo producto'}
          imageUrl={formData.imageUrl}
          idLabel="Nuevo"
        />

        <ProductForm
          formData={formData}
          priceInput={priceInput}
          categories={categories}
          isFormInvalid={isFormInvalid}
          submitText="Crear producto"
          loadingOptions={loadingOptions}
          onChange={handleChange}
          onPriceChange={handlePriceChange}
          onPriceBlur={() => setPriceInput(formatPriceInput(formData.price))}
          onPriceFocus={() => setPriceInput(formData.price > 0 ? String(formData.price) : '')}
          onCancel={() => navigate(ROUTES.products.list)}
          onSubmit={() => setShowConfirmModal(true)}
        />

        <ConfirmModal
          isOpen={showConfirmModal}
          title="Crear producto"
          message={
            <>
              ¿Seguro que querés crear <b>{formData.name.trim()}</b>?
            </>
          }
          isLoading={saving}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
          confirmText="Crear"
        />
      </div>
    </DashboardLayout>
  );
}
