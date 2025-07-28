import React, { useState } from 'react';
import { ArrowLeft, Lock, Shield, Smartphone, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface ResetPinProps {
  onBack: () => void;
}

const ResetPin: React.FC<ResetPinProps> = ({ onBack }) => {
  const [generatedPin, setGeneratedPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const phoneNumber = '+234707549973';

  const generateRandomPin = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedPin(pin);
  };

  const handleSendPin = async () => {
    setError('');
    
    if (!generatedPin) {
      setError('Please generate a PIN first');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to update PIN and send SMS
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate SMS sending
      console.log(`Sending new PIN ${generatedPin} to ${phoneNumber}`);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setGeneratedPin('');
      }, 3000);
    } catch (err) {
      setError('Failed to update PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105">
                  
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105">
                  
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all duration-200 hover:scale-105">
                  
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
                  Generate New PIN
                </h2>
                <p className="text-indigo-100 mt-1">A new 4-digit PIN will be generated and sent to {phoneNumber}</p>
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

                {/* Generated PIN Display */}
                {generatedPin && (
                  <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-3 flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Generated PIN
                    </h3>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <span className="text-3xl font-mono font-bold text-indigo-600 tracking-widest">
                        {generatedPin}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-700 mt-3 text-center">
                      This PIN will be sent to {phoneNumber}
                    </p>
                  </div>
                )}

                {/* Generate PIN Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-500" />
                    PIN Generation
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click the button below to generate a secure 4-digit PIN that will be sent to your mobile phone.
                  </p>
                  <button
                    onClick={generateRandomPin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <Shield size={20} />
                    <span>Generate New PIN</span>
                  </button>
                </div>

                {/* Send PIN Button */}
                {generatedPin && (
                  <div className="pt-4">
                    <button
                      onClick={handleSendPin}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending PIN...</span>
                        </>
                      ) : (
                        <>
                          <Smartphone size={20} />
                          <span>Send PIN to Mobile</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-800 font-medium">Security Notice</p>
                    <p className="text-blue-600 mt-1">
                      Your new PIN will be automatically generated and sent via SMS to {phoneNumber}. Keep it secure and don't share it with anyone.
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
