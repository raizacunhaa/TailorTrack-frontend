import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  label?: string;
  options?: string[];
}

export default function Dropdowns({ label = 'Opciones', options = [] }: DropdownProps) {
  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
      >
        {label}
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>
      {options.length > 0 && (
        <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
