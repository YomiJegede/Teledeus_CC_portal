import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ToggleLeft, ToggleRight, Shield, Clock, User, AlertTriangle, Phone } from 'lucide-react';

interface Pay4MeOptInOutProps {
  onBack: () => void;
}

interface ServiceStatus {
  isOptedIn: boolean;
  lastChanged: string;
  changedBy: string;
  totalOptIns: number;
  totalOptOuts: number;
  currentStreak: number;
  streakType: 'opted-in' | 'opted-out';
}

const Pay4MeOptInOut: React.FC<Pay4MeOptInOutProps> = ({ onBack }) => {
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
    isOptedIn: true,
    lastChanged: '2025-01-08T16:20:00',
    changedBy: 'User',
    totalOptIns: 8,
    totalOptOuts: 2,
    currentStreak: 32,
    streakType: 'opted-in'
  });

  const [isChanging, setIsChanging] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<'opt-in' | 'opt-out' | null>(null);

  const handleToggleService = (action: 'opt-in' | 'opt-out') => {
    setPendingAction(action);
    setShowConfirmation(true);
  };

  const confirmToggle = async () => {
    if (!pendingAction) return;
    
    setIsChanging(true);
    setShowConfirmation(false);
    
    // Simulate API call
    setTimeout(() => {
      setServiceStatus(prev => ({
        ...prev,
        isOptedIn: pendingAction === 'opt-in',
        lastChanged: new Date().toISOString(),
        changedBy: 'User',
        totalOptIns: pendingAction === 'opt-in' ? prev.totalOptIns + 1 : prev.totalOptIns,
        totalOptOuts: pendingAction === 'opt-out' ? prev.totalOptOuts + 1 : prev.totalOptOuts,
        currentStreak: 1,
        streakType: pendingAction === 'opt-in' ? 'opted-in' : 'opted-out'
      }));
      setIsChanging(false);
      setPendingAction(null);
    }, 2000);
  };

  const cancelToggle = () => {
    setShowConfirmation(false);
    setPendingAction(null);
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (isOptedIn: boolean) => {
    return isOptedIn 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (isOptedIn: boolean) => {
    return isOptedIn ? CheckCircle : XCircle;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-all duration-200 hover:scale-105"
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
              <Phone className="w-4 h-4 mr-2 text-blue-500" />
              Pay4Me Control
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Pay4Me Opt In/Out Status
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Service History
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Call Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pay4Me Service Opt In/Out</h1>
              <p className="text-gray-600">Manage your Teledeus Pay4Me collect call service status for +234707549973</p>
            </div>

            {/* Current Status Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${serviceStatus.isOptedIn ? 'bg-green-100' : 'bg-red-100'}`}>
                    {React.createElement(getStatusIcon(serviceStatus.isOptedIn), {
                      size: 40,
                      className: serviceStatus.isOptedIn ? 'text-green-600' : 'text-red-600'
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {serviceStatus.isOptedIn ? 'Pay4Me Service Active' : 'Pay4Me Service Inactive'}
                    </h2>
                    <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(serviceStatus.isOptedIn)}`}>
                      {serviceStatus.isOptedIn ? 'Opted In' : 'Opted Out'}
                    </span>
                    <p className="text-gray-600 text-sm mt-2">
                      Last changed: {formatDateTime(serviceStatus.lastChanged)} by {serviceStatus.changedBy}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {serviceStatus.currentStreak}
                  </div>
                  <div className="text-sm text-gray-600">
                    days {serviceStatus.streakType.replace('-', ' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <ToggleRight className="w-6 h-6 mr-2 text-blue-500" />
                Pay4Me Service Control
              </h3>
              
              {isChanging ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Updating Pay4Me service status...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleToggleService('opt-in')}
                    disabled={serviceStatus.isOptedIn}
                    className={`flex items-center justify-center space-x-3 p-6 rounded-xl font-semibold transition-all duration-200 ${
                      serviceStatus.isOptedIn
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-green-50 hover:bg-green-100 text-green-600 hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <CheckCircle size={24} />
                    <span>Opt In to Pay4Me</span>
                  </button>
                  
                  <button
                    onClick={() => handleToggleService('opt-out')}
                    disabled={!serviceStatus.isOptedIn}
                    className={`flex items-center justify-center space-x-3 p-6 rounded-xl font-semibold transition-all duration-200 ${
                      !serviceStatus.isOptedIn
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-50 hover:bg-red-100 text-red-600 hover:scale-105 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <XCircle size={24} />
                    <span>Opt Out of Pay4Me</span>
                  </button>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Opt-Ins</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceStatus.totalOptIns}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Opt-Outs</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceStatus.totalOptOuts}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Streak</p>
                    <p className="text-2xl font-bold text-gray-900">{serviceStatus.currentStreak} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-500" />
                Pay4Me Service Information
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">What is Pay4Me Service?</p>
                    <p className="text-sm">Pay4Me allows you to receive collect calls where the caller pays for the call charges. When someone calls you and selects the Pay4Me option, they cover the cost of the conversation.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">How does Opt In work?</p>
                    <p className="text-sm">When opted in, you can receive Pay4Me collect calls from authorized numbers. Callers will be prompted to pay for the call before connecting to you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">What happens when Opted Out?</p>
                    <p className="text-sm">When opted out, you will not receive any Pay4Me collect calls. All such calls will be automatically declined and callers will hear a message that the service is unavailable.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Can I change my status anytime?</p>
                    <p className="text-sm">Yes, you can opt in or opt out of the Pay4Me service at any time. Changes take effect immediately and will apply to all future incoming collect calls.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teledeus Logo */}
          <div className="fixed bottom-6 right-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              Teledeus
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                pendingAction === 'opt-in' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {React.createElement(pendingAction === 'opt-in' ? CheckCircle : XCircle, {
                  size: 32,
                  className: pendingAction === 'opt-in' ? 'text-green-600' : 'text-red-600'
                })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm Pay4Me {pendingAction === 'opt-in' ? 'Opt In' : 'Opt Out'}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {pendingAction === 'opt-in' ? 'opt in to' : 'opt out of'} the Teledeus Pay4Me collect call service?
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={cancelToggle}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmToggle}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    pendingAction === 'opt-in'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay4MeOptInOut;