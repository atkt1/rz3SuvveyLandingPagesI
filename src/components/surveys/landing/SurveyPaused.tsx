interface SurveyPausedProps {
  logo: string;
}

export function SurveyPaused({ logo }: SurveyPausedProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      {/* Logo Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <img 
            src={logo} 
            alt="Survey Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            This survey is currently paused
          </h1>
          <p className="text-gray-600">
            Please come back soon!
          </p>
        </div>
      </div>
    </div>
  );
}