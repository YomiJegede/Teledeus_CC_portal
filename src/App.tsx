import React, { useState } from 'react';
import CallHistory from './components/CallHistory';
import BeneficiaryLists from './components/BeneficiaryLists';
import { 
  Search, 
  FileText, 
  User, 
  Wifi, 
  Phone, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [msisdn, setMsisdn] = useState('234707XXXXXXX');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'call-history' | 'beneficiary-lists'>('home');

  const handleSearch = () => {
    // Search functionality would be implemented here
    console.log('Searching for:', msisdn);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCallHistoryClick = () => {
    setCurrentPage('call-history');
  };

  const handleBeneficiaryListsClick = () => {
    setCurrentPage('beneficiary-lists');
  };


  const handleBackToHome = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'call-history') {
    return <CallHistory onBack={handleBackToHome} />;
  }

  if (currentPage === 'beneficiary-lists') {
    return <BeneficiaryLists onBack={handleBackToHome} />;
  }


  const serviceCards = [
    {
      icon: FileText,
      title: 'Beneficiary Lists',
      description: 'View white/blacklist entries',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      onClick: handleBeneficiaryListsClick
    },
    {
      icon: User,
      title: 'Profile Info',
      description: 'User ID, Last login',
      color: 'bg-slate-50 text-slate-600',
      hoverColor: 'hover:bg-slate-100'
    },
    {
      icon: Wifi,
      title: 'Roaming',
      description: 'Roaming status',
      color: 'bg-cyan-50 text-cyan-600',
      hoverColor: 'hover:bg-cyan-100'
    },
    {
      icon: Phone,
      title: 'Call History',
      description: 'View Pay4Me logs',
      color: 'bg-emerald-50 text-emerald-600',
      hoverColor: 'hover:bg-emerald-100',
      onClick: handleCallHistoryClick
    },
    {
      icon: CheckCircle,
      title: 'Opt In/Out',
      description: 'Enable/Disable',
      color: 'bg-green-50 text-green-600',
      hoverColor: 'hover:bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Teledus</h1>
                <p className="text-sm text-gray-500">Collect Call Service</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sign In
              </button>
              <span className="text-gray-300">/</span>
              <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Sign Out
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 p-2 rounded-md transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left">
                  Sign In
                </button>
                <button className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* MSISDN Lookup Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">MSISDN Lookup:</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500"
                placeholder="Enter MSISDN..."
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                onClick={card.onClick}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${card.hoverColor} group`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Teledus. All rights reserved. | Secure customer portal for collect call services.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;