// components/Input.tsx

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (evento: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
      />
    </div>
  );
}