export default function Input({
    label,
    name,
    type = 'text',
    value,
    onChange,
    required = false,
    error,
  }: {
    label: string;
    name: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    error?: string;
  }) {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }