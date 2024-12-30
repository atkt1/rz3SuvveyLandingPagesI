import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { SurveyPaused } from '@/components/surveys/landing/SurveyPaused';
import { SurveyForm } from '@/components/surveys/landing/SurveyForm';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface SurveyData {
  id: string;
  survey_name: string;
  survey_style: 'Simple' | 'WithInfo';
  logo_path: string;
  survey_status: 'ACTIVE' | 'PAUSED';
  products: Array<{
    id: string;
    name: string;
    image_path: string;
    marketplace: string;
  }>;
}

export function SurveyLandingPage() {
  const [survey, setSurvey] = useState<SurveyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { shortCode } = useParams<{ shortCode: string }>();

  useEffect(() => {
    async function loadSurvey() {
      try {
        // Fetch survey details
        const { data: surveyData, error: surveyError } = await supabase
          .from('surveys')
          .select(`
            id,
            survey_name,
            survey_style,
            logo_path,
            survey_status
          `)
          .eq('short_code', shortCode)
          .single();

        if (surveyError) throw surveyError;
        if (!surveyData) throw new Error('Survey not found');

        // Fetch linked products
        const { data: productLinks, error: productsError } = await supabase
          .from('survey_products')
          .select('product_id')
          .eq('survey_id', surveyData.id);

        if (productsError) throw productsError;

        if (productLinks.length > 0) {
          const productIds = productLinks.map(link => link.product_id);
          const { data: products, error: productDetailsError } = await supabase
            .from('products')
            .select('id, name, image_path, marketplace')
            .in('id', productIds);

          if (productDetailsError) throw productDetailsError;

          setSurvey({
            ...surveyData,
            products: products || []
          });
        } else {
          setSurvey({
            ...surveyData,
            products: []
          });
        }
      } catch (err) {
        console.error('Error loading survey:', err);
        setError(err instanceof Error ? err.message : 'Failed to load survey');
      } finally {
        setIsLoading(false);
      }
    }

    loadSurvey();
  }, [shortCode]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !survey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Survey Not Found</h1>
          <p className="text-gray-600">The survey you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  if (survey.survey_status === 'PAUSED') {
    return <SurveyPaused logo={survey.logo_path} />;
  }

  return <SurveyForm survey={survey} />;
}