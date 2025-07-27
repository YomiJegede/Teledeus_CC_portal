import React, { useState } from 'react';
import { ArrowLeft, Lock, Shield, Smartphone, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface ResetPinProps {
  onBack: () => void;
}

const ResetPin: React.FC<ResetPinProps> = ({ onBack }) => {
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const phoneNumber = '+234707549973';

  const generateRandomPin = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setNewPin(pin);
    setConfirmPin(pin);
  };

  const handleSave = async () => {
    setError('');
    
    if (!newPin || newPin.length !== 4) {
      setError('PIN must be exactly 4 digits');
      return;
    }

    if (newPin !== confirmPin) {
      setError('PINs do not match');
      return;
    }

    if (!/^\d{4}$/.test(newPin)) {
      setError('PIN must contain only numbers');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to update PIN and send SMS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate SMS sending
      console.log(`Sending new PIN ${newPin} to ${phoneNumber}`);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setNewPin('');
        setConfirmPin('');
      }, 3000);
    } catch (err) {
      setError('Failed to update PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidPin = newPin.length === 4 && /^\d{4}$/.test(newPin);
  const pinsMatch = newPin === confirmPin && confirmPin.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Portal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/60 backdrop-blur-sm min-h-screen border-r border-gray-200/50">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-6 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-indigo-500" />
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Opt in/out
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Roaming status
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Lock className="w-8 h-8 mr-3 text-indigo-600" />
                Reset PIN
              </h1>
              <p className="text-gray-600">Update your sponsor PIN for {phoneNumber}</p>
            </div>

            {/* Main Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Card Header */}
              <div className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <h2 className="text-xl font-semibold flex items-center">
                  <Smartphone className="w-6 h-6 mr-2" />
                  PIN will be sent to your mobile
                </h2>
                <p className="text-indigo-100 mt-1">Enter a new 4-digit PIN below</p>
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-6">
                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-pulse">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="text-green-800 font-medium">PIN Updated Successfully!</p>
                      <p className="text-green-600 text-sm">New PIN has been sent to {phoneNumber}</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                {/* New PIN Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    New PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value.slice(0, 4))}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-lg font-mono text-center tracking-widest"
                      placeholder="••••"
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-colors ${isValidPin ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={`text-xs ${isValidPin ? 'text-green-600' : 'text-gray-500'}`}>
                      4 digits required
                    </span>
                  </div>
                </div>

                {/* Confirm PIN Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Confirm PIN
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPin ? 'text' : 'password'}
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value.slice(0, 4))}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-lg font-mono text-center tracking-widest"
                      placeholder="••••"
                      maxLength={4}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPin(!showConfirmPin)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPin ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-colors ${pinsMatch ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className={`text-xs ${pinsMatch ? 'text-green-600' : 'text-gray-500'}`}>
                      PINs must match
                    </span>
                  </div>
                </div>

                {/* Generate Random PIN */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 mb-3">Need a secure PIN?</p>
                  <button
                    onClick={generateRandomPin}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    Generate Random PIN
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={!isValidPin || !pinsMatch || isLoading}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Updating PIN...</span>
                      </>
                    ) : (
                      <>
                        <Smartphone size={20} />
                        <span>Save & Send SMS</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-800 font-medium">Security Notice</p>
                    <p className="text-blue-600 mt-1">
                      Your new PIN will be sent via SMS to {phoneNumber}. Keep it secure and don't share it with anyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teledeus Logo */}
          <div className="fixed bottom-6 right-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              Teledeus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPin;