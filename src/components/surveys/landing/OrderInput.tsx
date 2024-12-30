interface OrderInputProps {
  product: {
    name: string;
    image_path: string;
  };
  marketplace: string;
}

export function OrderInput({ product, marketplace }: OrderInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-50 rounded-lg p-2">
            <img
              src={product.image_path}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-2 font-medium text-gray-900">
            {product.name}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          What is your {marketplace} Order Number containing {product.name}?*
        </label>
        
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          onClick={() => window.open('https://www.amazon.in/gp/your-account/order-history', '_blank')}
        >
          Find Your {marketplace} Order Number
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <input
          type="text"
          placeholder={`${marketplace} Order Number`}
          className="
            block w-full rounded-lg border-gray-300 
            focus:border-blue-500 focus:ring-blue-500
            bg-white py-2.5 px-4 text-gray-900
          "
        />
        <p className="text-xs text-gray-500">
          Format: 123-1234567-1234567
        </p>
      </div>
    </div>
  );
}