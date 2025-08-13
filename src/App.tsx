import React, { useState } from 'react';
import CallHistory from './components/CallHistory';
import BeneficiaryLists from './components/BeneficiaryLists';
import ProfileInfo from './components/ProfileInfo';
import OptInOut from './components/OptInOut';
import Pay4MeOptInOut from './components/Pay4MeOptInOut';
import MCAHistory from './components/MCAHistory';
import { 
  Search, 
  FileText, 
  Phone, 
  CheckCircle,
  CreditCard,
  Menu,
  X,
  User,
  LogIn,
  LogOut
} from 'lucide-react';

function App() {
  const [msisdn, setMsisdn] = useState('234707XXXXXXX');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    fullName: ''
  });
  const [userProfile, setUserProfile] = useState({ name: '', email: '' });
  const [currentPage, setCurrentPage] = useState<'home' | 'call-history' | 'beneficiary-lists' | 'profile-info' | 'opt-in-out' | 'pay4me-opt-in-out' | 'mca-history'>('home');

  const handleSearch = () => {
    // Search functionality would be implemented here
    console.log('Searching for:', msisdn);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserProfile({ name: '', email: '' });
    setCurrentPage('home');
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app, this would be API call
    if (username && password) {
      setIsSignedIn(true);
      setUserProfile({ 
        name: username.charAt(0).toUpperCase() + username.slice(1),
        email: `${username}@teledus.com`
      });
      setShowSignInModal(false);
      setUsername('');
      setPassword('');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (signUpData.username && signUpData.email && signUpData.password && signUpData.fullName && signUpData.phoneNumber) {
      // In real app, this would be API call to create account
      setIsSignedIn(true);
      setUserProfile({ 
        name: signUpData.fullName,
        email: signUpData.email
      });
      setShowSignUpModal(false);
      setSignUpData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        fullName: ''
      });
    }
  };

  const handleSignUpInputChange = (field: string, value: string) => {
    setSignUpData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileClick = () => {
    setCurrentPage('profile-info');
  };

  const handleCallHistoryClick = () => {
    setCurrentPage('call-history');
  };

  const handleBeneficiaryListsClick = () => {
    setCurrentPage('beneficiary-lists');
  };

  const handleOptInOutClick = () => {
    setCurrentPage('opt-in-out');
  };

  const handlePay4MeOptInOutClick = () => {
    setCurrentPage('pay4me-opt-in-out');
  };

  const handleMCAHistoryClick = () => {
    setCurrentPage('mca-history');
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

  if (currentPage === 'profile-info') {
    return <ProfileInfo onBack={handleBackToHome} />;
  }

  if (currentPage === 'opt-in-out') {
    return <OptInOut onBack={handleBackToHome} />;
  }

  if (currentPage === 'pay4me-opt-in-out') {
    return <Pay4MeOptInOut onBack={handleBackToHome} />;
  }

  if (currentPage === 'mca-history') {
    return <MCAHistory onBack={handleBackToHome} />;
  }


  const serviceCards = [
    {
      icon: FileText,
      title: 'Beneficiary Lists',
      description: 'View whitelist/blacklist entries',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'hover:bg-blue-100',
      onClick: handleBeneficiaryListsClick
    },
    {
      icon: Phone,
      title: 'Pay4Me Call History',
      description: 'View Pay4Me logs',
      color: 'bg-emerald-50 text-emerald-600',
      hoverColor: 'hover:bg-emerald-100',
      onClick: handleCallHistoryClick
    },
    {
      icon: CheckCircle,
      title: 'MCA Subscription History',
      color: 'bg-green-50 text-green-600',
      hoverColor: 'hover:bg-green-100',
      onClick: handleOptInOutClick
    },
    {
      icon: Phone,
      title: 'Pay4Me Subscription History',
      color: 'bg-teal-50 text-teal-600',
      hoverColor: 'hover:bg-teal-100',
      onClick: handlePay4MeOptInOutClick
    },
    {
      icon: CreditCard,
      title: 'Missed Call Alert History',
      color: 'bg-purple-50 text-purple-600',
      hoverColor: 'hover:bg-purple-100',
      onClick: handleMCAHistoryClick
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
                <h1 className="text-xl font-bold text-gray-900">Teledeus</h1>
                <p className="text-sm text-gray-500">Collect Call Service</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isSignedIn ? (
                <>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <User size={16} />
                    <span>{userProfile.name}</span>
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSignUp}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <User size={16} />
                    <span>Sign Up</span>
                  </button>
                  <button
                    onClick={handleSignIn}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </button>
                </div>
              )}
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
                {isSignedIn ? (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <User size={16} />
                      <span>{userProfile.name}</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={handleSignUp}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <User size={16} />
                      <span>Sign Up</span>
                    </button>
                    <button
                      onClick={handleSignIn}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <LogIn size={16} />
                      <span>Sign In</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isSignedIn ? (
          /* Welcome Section for Non-Signed In Users */
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Teledeus Portal</h1>
              <p className="text-xl text-gray-600 mb-8">
                Access your collect call service information and manage your account settings.
              </p>
              <button
                onClick={handleSignIn}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 mx-auto hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <LogIn size={24} />
                <span>Sign In to Continue</span>
              </button>
              <div className="mt-4 text-center">
                <p className="text-gray-600 mb-4">Don't have an account?</p>
                <button
                  onClick={handleSignUp}
                  className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 mx-auto hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <User size={24} />
                  <span>Create New Account</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Teledeus. All rights reserved. | Secure customer portal for collect call services.
          </p>
        </div>
      </main>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Access your Teledeus customer portal</p>
            </div>
            
            <form onSubmit={handleSignInSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSignInModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join the Teledeus customer portal</p>
            </div>
            
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={signUpData.fullName}
                  onChange={(e) => handleSignUpInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signUpUsername" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="signUpUsername"
                  value={signUpData.username}
                  onChange={(e) => handleSignUpInputChange('username', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Choose a username"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={signUpData.email}
                  onChange={(e) => handleSignUpInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={signUpData.phoneNumber}
                  onChange={(e) => handleSignUpInputChange('phoneNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="signUpPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="signUpPassword"
                  value={signUpData.password}
                  onChange={(e) => handleSignUpInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={signUpData.confirmPassword}
                  onChange={(e) => handleSignUpInputChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSignUpModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Create Account
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setShowSignUpModal(false);
                    setShowSignInModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
