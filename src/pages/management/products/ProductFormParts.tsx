import type { ChangeEvent, ReactNode } from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { getDriveDirectLink } from '../../../helpers/url.helper';
import type { Category } from '../../../types/category.types';
import type { ProductEditFrontend } from '../../../types/product.types';

export function ProductFormHeader({
  title,
  subtitle,
  icon,
  onBack,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onBack: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-500 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver
      </button>
      <div className="mb-5">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-900">
          {icon}
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </>
  );
}

export function ProductPreview({
  name,
  imageUrl,
  idLabel,
}: {
  name: string;
  imageUrl: string;
  idLabel: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {imageUrl ? (
          <img
            src={getDriveDirectLink(imageUrl)}
            alt={name}
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <ImageIcon className="h-6 w-6 text-slate-300" />
        )}
      </div>
      <div>
        <h2 className="text-lg font-bold leading-tight text-slate-900">{name}</h2>
        <p className="text-xs font-medium text-sky-600">ID: {idLabel}</p>
      </div>
    </div>
  );
}

export function ProductForm({
  formData,
  priceInput,
  categories,
  isFormInvalid,
  submitText,
  loadingOptions,
  onChange,
  onPriceChange,
  onPriceBlur,
  onPriceFocus,
  onCancel,
  onSubmit,
}: {
  formData: ProductEditFrontend;
  priceInput: string;
  categories: Category[];
  isFormInvalid: boolean;
  submitText: string;
  loadingOptions: boolean;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  onPriceChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onPriceBlur: () => void;
  onPriceFocus: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isFormInvalid) onSubmit();
      }}
      className="grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 md:grid-cols-2 sm:p-8"
    >
      <div className="space-y-4">
        <SectionTitle>Información básica</SectionTitle>
        <TextInput
          label="Código *"
          name="code"
          value={formData.code}
          onChange={onChange}
          placeholder="Ej: CAM-OXF-001"
        />
        <TextInput
          label="Nombre del producto *"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Ej: Camisa oxford"
        />
        <TextInput
          label="Código de barras"
          name="barcode"
          value={formData.barcode}
          onChange={onChange}
          placeholder="Opcional"
        />
        <TextInput
          label="Unidad por bulto *"
          name="unit"
          value={formData.unit}
          onChange={onChange}
          placeholder="Ej: x 12 unidades"
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700 ml-1">Descripción</label>
          <textarea
            name="description"
            maxLength={500}
            value={formData.description}
            onChange={onChange}
            placeholder="Características del producto..."
            className="block h-28 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
          />
        </div>
        <TextInput
          label="URL de imagen"
          name="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={onChange}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-4">
        <SectionTitle>Categoría y precio</SectionTitle>
        <SelectInput
          label="Categoría *"
          name="categoryId"
          value={formData.categoryId}
          onChange={onChange}
          disabled={loadingOptions}
        >
          <option value="">Seleccionar...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectInput>

        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput
            label="Stock *"
            name="stock"
            type="number"
            value={String(formData.stock)}
            onChange={onChange}
            placeholder="0"
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 ml-1">Precio ($) *</label>
            <input
              type="text"
              name="price"
              value={priceInput}
              onChange={onPriceChange}
              onBlur={onPriceBlur}
              onFocus={onPriceFocus}
              placeholder="0,00"
              className="block h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
              required
            />
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="showingInCatalog"
            checked={formData.showingInCatalog}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300 text-sky-600"
          />
          Mostrar en catálogo
        </label>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isFormInvalid}
            className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-600">
      {message}
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
      {children}
    </h3>
  );
}

function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="block h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100"
        required={label.includes('*')}
      />
    </div>
  );
}

function SelectInput({
  label,
  name,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 ml-1">{label}</label>
      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className="block h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-sky-400 focus:ring-1 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        required
      >
        {children}
      </select>
    </div>
  );
}
