import { useState } from 'react';
import { ProductSelect } from './ProductSelect';
import { OrderInput } from './OrderInput';
import { PromoMessage } from './PromoMessage';

interface SurveyFormProps {
  survey: {
    id: string;
    survey_name: string;
    survey_style: 'Simple' | 'WithInfo';
    logo_path: string;
    products: Array<{
      id: string;
      name: string;
      image_path: string;
      marketplace: string;
    }>;
  };
}

export function SurveyForm({ survey }: SurveyFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const hasMultipleProducts = survey.products.length > 1;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      {/* Logo Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <img 
            src={survey.logo_path} 
            alt="Survey Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Please share your experience!
            </h1>
            <p className="text-gray-600">
              The process is quick and easy! To begin, please complete the fields below.
            </p>
          </div>

          {survey.survey_style === 'WithInfo' && <PromoMessage />}

          {hasMultipleProducts ? (
            <ProductSelect
              products={survey.products}
              selectedProduct={selectedProduct}
              onSelect={setSelectedProduct}
            />
          ) : (
            survey.products[0] && (
              <OrderInput 
                product={survey.products[0]}
                marketplace={survey.products[0].marketplace}
              />
            )
          )}

          {hasMultipleProducts && selectedProduct && (
            <OrderInput 
              product={survey.products.find(p => p.id === selectedProduct)!}
              marketplace={survey.products.find(p => p.id === selectedProduct)!.marketplace}
            />
          )}
        </div>
      </div>
    </div>
  );
}