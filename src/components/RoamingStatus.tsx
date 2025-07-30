import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wifi, WifiOff, Globe, MapPin, Clock, Signal, Smartphone, AlertTriangle } from 'lucide-react';

interface RoamingStatusProps {
  onBack: () => void;
}

interface RoamingData {
  isRoaming: boolean;
  currentNetwork: string;
  homeNetwork: string;
  currentCountry: string;
  homeCountry: string;
  roamingStartTime: string | null;
  lastUpdated: string;
  signalStrength: number;
  networkType: string;
  roamingCharges: boolean;
  dataRoaming: boolean;
}

const RoamingStatus: React.FC<RoamingStatusProps> = ({ onBack }) => {
  const [roamingData, setRoamingData] = useState<RoamingData>({
    isRoaming: false,
    currentNetwork: 'MTN Nigeria',
    homeNetwork: 'MTN Nigeria',
    currentCountry: 'Nigeria',
    homeCountry: 'Nigeria',
    roamingStartTime: null,
    lastUpdated: new Date().toISOString(),
    signalStrength: 85,
    networkType: '4G LTE',
    roamingCharges: false,
    dataRoaming: true
  });

  const [isLoading, setIsLoading] = useState(false);

  const refreshStatus = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRoamingData(prev => ({
        ...prev,
        lastUpdated: new Date().toISOString(),
        signalStrength: Math.floor(Math.random() * 40) + 60, // Random between 60-100
      }));
      setIsLoading(false);
    }, 1500);
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

  const getSignalBars = (strength: number) => {
    const bars = Math.ceil(strength / 25);
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={`w-1 rounded-sm ${
          i < bars ? 'bg-green-500' : 'bg-gray-300'
        }`}
        style={{ height: `${(i + 1) * 4 + 4}px` }}
      />
    ));
  };

  const roamingHistory = [
    { country: 'Ghana', network: 'MTN Ghana', duration: '3 days', date: '2025-01-10' },
    { country: 'Benin', network: 'MTN Benin', duration: '1 day', date: '2025-01-05' },
    { country: 'Togo', network: 'Togocel', duration: '2 days', date: '2024-12-28' },
  ];

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
              <Wifi className="w-4 h-4 mr-2 text-blue-500" />
              Network Status
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Roaming Status
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Network Settings
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Roaming History
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Roaming Status</h1>
              <p className="text-gray-600">Network and roaming information for +234707549973</p>
            </div>

            {/* Current Status Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-6">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    roamingData.isRoaming ? 'bg-orange-100' : 'bg-green-100'
                  }`}>
                    {roamingData.isRoaming ? (
                      <Globe className="w-10 h-10 text-orange-600" />
                    ) : (
                      <Wifi className="w-10 h-10 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {roamingData.isRoaming ? 'Roaming Active' : 'Home Network'}
                    </h2>
                    <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border ${
                      roamingData.isRoaming 
                        ? 'bg-orange-100 text-orange-800 border-orange-200' 
                        : 'bg-green-100 text-green-800 border-green-200'
                    }`}>
                      {roamingData.isRoaming ? 'Roaming' : 'Home'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={refreshStatus}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Signal size={16} />
                  )}
                  <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Location</p>
                      <p className="text-gray-900 font-semibold">{roamingData.currentCountry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Current Network</p>
                      <p className="text-gray-900 font-semibold">{roamingData.currentNetwork}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Network Type</p>
                      <p className="text-gray-900 font-semibold">{roamingData.networkType}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Home Country</p>
                      <p className="text-gray-900 font-semibold">{roamingData.homeCountry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Home Network</p>
                      <p className="text-gray-900 font-semibold">{roamingData.homeNetwork}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Signal className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Signal Strength</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-end space-x-0.5">
                          {getSignalBars(roamingData.signalStrength)}
                        </div>
                        <span className="text-gray-900 font-semibold">{roamingData.signalStrength}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roaming Details */}
            {roamingData.isRoaming && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-orange-500" />
                  Roaming Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-orange-50/50 rounded-xl">
                    <Clock className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Roaming Since</p>
                      <p className="text-gray-900 font-semibold">
                        {roamingData.roamingStartTime ? formatDateTime(roamingData.roamingStartTime) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-orange-50/50 rounded-xl">
                    <AlertTriangle className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Roaming Charges</p>
                      <p className="text-gray-900 font-semibold">
                        {roamingData.roamingCharges ? 'Active' : 'Not Active'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Smartphone className="w-6 h-6 mr-2 text-blue-500" />
                Roaming Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-900">Data Roaming</p>
                      <p className="text-sm text-gray-600">Allow data usage while roaming</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors ${
                    roamingData.dataRoaming ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                      roamingData.dataRoaming ? 'translate-x-6' : 'translate-x-0.5'
                    } mt-0.5`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roaming History */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-blue-500" />
                  Recent Roaming History
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {roamingHistory.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl hover:bg-blue-50/30 transition-all duration-200">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{entry.country}</p>
                            <p className="text-sm text-gray-600">{entry.network}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{entry.duration}</p>
                            <p className="text-xs text-gray-500">{entry.date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              Last updated: {formatDateTime(roamingData.lastUpdated)}
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
    </div>
  );
};

export default RoamingStatus;