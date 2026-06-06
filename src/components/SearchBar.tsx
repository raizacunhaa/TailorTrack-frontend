import type { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  containerClassName?: string;
  inputClassName?: string;
  iconClassName?: string;
  onSubmit?: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Encontrá lo que tu campo necesita...',
  containerClassName = '',
  inputClassName = '',
  iconClassName = '',
  onSubmit,
}: Props) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className={`relative w-full max-w-3xl ${containerClassName}`}>
      <Search
        className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${iconClassName}`}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-100 ${inputClassName}`}
      />
    </div>
  );
}
