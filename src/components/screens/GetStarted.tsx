import useStudyMaxer from "../hooks/useStudyMaxer";

export function GetStarted() {
  const { setAppState } = useStudyMaxer();

  return (
    <div className="h-screen bg-[#0a1628] flex flex-col items-center justify-between px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="w-full aspect-square mb-8 rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGxlYXJuaW5nJTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NjMzOTgyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Students learning together"
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-white text-center mb-4">
          Find Your Path
        </h1>
        
        <p className="text-gray-300 text-center mb-8">
          We help you discover the perfect degree program or apprenticeship and your dream career. 
          Answer a few questions and receive personalized suggestions.
        </p>
        
        <div className="flex gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
      </div>
      
      <div className="w-full max-w-md space-y-4">
        <button
          onClick={() => setAppState('onboarding')}
          className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white py-4 rounded-full transition-colors flex items-center justify-center"
        >
          Get Started
        </button>
        
        <button className="w-full text-gray-300 hover:text-white py-4 transition-colors flex items-center justify-center">
          I already have an account
        </button>
      </div>
    </div>
  );
}