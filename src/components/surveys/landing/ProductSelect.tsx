interface ProductSelectProps {
  products: Array<{
    id: string;
    name: string;
    image_path: string;
  }>;
  selectedProduct: string | null;
  onSelect: (productId: string) => void;
}

export function ProductSelect({ products, selectedProduct, onSelect }: ProductSelectProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Which product did you purchase?*
      </label>
      
      <div className="relative">
        <select
          value={selectedProduct || ''}
          onChange={(e) => onSelect(e.target.value)}
          className="
            block w-full rounded-lg border-gray-300 
            focus:border-blue-500 focus:ring-blue-500
            bg-white py-2.5 pl-4 pr-10 text-gray-900
          "
        >
          <option value="">Select a product...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="mt-4 flex justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">You purchased...</p>
            <div className="w-32 h-32 mx-auto bg-gray-50 rounded-lg p-2">
              <img
                src={products.find(p => p.id === selectedProduct)?.image_path}
                alt="Selected product"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 font-medium text-gray-900">
              {products.find(p => p.id === selectedProduct)?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}