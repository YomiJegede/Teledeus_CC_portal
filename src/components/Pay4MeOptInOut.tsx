import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, ToggleLeft, ToggleRight, Shield, Clock, User, AlertTriangle, Search, Filter, History, Download, File } from 'lucide-react';
import { saveAs } from 'file-saver';

interface OptInOutProps {
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

interface OptInOutRecord {
  beneficiary: string;
  date: string;
  status: 'Opt In' | 'Opt Out';
  timestamp: string;
}

const OptInOut: React.FC<OptInOutProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>({
    isOptedIn: true,
    lastChanged: '2025-01-10T14:30:00',
    changedBy: 'User',
    totalOptIns: 12,
    totalOptOuts: 3,
    currentStreak: 45,
    streakType: 'opted-in'
  });

  const optInOutHistory: OptInOutRecord[] = [
    { beneficiary: '+234707549973', date: '2025-01-15', status: 'Opt In', timestamp: '2025-01-15T14:30:22' },
    { beneficiary: '+234707549973', date: '2025-01-10', status: 'Opt In', timestamp: '2025-01-10T14:30:00' },
    { beneficiary: '+234707549973', date: '2025-01-05', status: 'Opt Out', timestamp: '2025-01-05T09:15:33' },
    { beneficiary: '+234707549973', date: '2025-01-01', status: 'Opt In', timestamp: '2025-01-01T16:20:00' },
    { beneficiary: '+234707549973', date: '2024-12-28', status: 'Opt Out', timestamp: '2024-12-28T11:45:18' },
    { beneficiary: '+234707549973', date: '2024-12-25', status: 'Opt In', timestamp: '2024-12-25T13:22:44' },
    { beneficiary: '+234707549973', date: '2024-12-20', status: 'Opt Out', timestamp: '2024-12-20T10:18:29' },
    { beneficiary: '+234707549973', date: '2024-12-15', status: 'Opt In', timestamp: '2024-12-15T15:33:55' },
    { beneficiary: '+234707549973', date: '2024-12-10', status: 'Opt In', timestamp: '2024-12-10T08:42:16' },
    { beneficiary: '+234707549973', date: '2024-12-05', status: 'Opt Out', timestamp: '2024-12-05T12:28:37' },
    { beneficiary: '+234707549973', date: '2024-12-01', status: 'Opt In', timestamp: '2024-12-01T17:14:52' },
    { beneficiary: '+234707549973', date: '2024-11-25', status: 'Opt In', timestamp: '2024-11-25T14:47:23' }
  ];

  const filteredHistory = optInOutHistory.filter(record =>
    record.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const getRecordStatusColor = (status: string) => {
    return status === 'Opt In' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const exportToCSV = () => {
    const headers = ['Beneficiary', 'Date', 'Status', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...filteredHistory.map(record => [
        record.beneficiary,
        formatDate(record.date),
        record.status,
        formatDateTime(record.timestamp)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `pay4me-opt-in-out-history-${new Date().toISOString().split('T')[0]}.csv`);
    setShowExportMenu(false);
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
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Service Control
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Opt In/Out Status
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Service History
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Preferences
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pay4Me Opt In/Out History</h1>
              <p className="text-gray-600">Manage your Teledeus collect call service status for +234707549973</p>
            </div>

            {/* Opt In/Out History Table */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 mb-8">
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <History className="w-6 h-6 mr-2 text-blue-500" />
                  MCA Opt In/Out History
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredHistory.length} of {optInOutHistory.length} records
                </p>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-gray-200/50">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search by beneficiary, status, or date..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setShowExportMenu(!showExportMenu)}
                      className="flex items-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    >
                      <Download size={18} />
                      <span>Export</span>
                    </button>
                    
                    {showExportMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200/50 z-10">
                        <div className="py-2">
                          <button
                            onClick={exportToCSV}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                          >
                            <File className="w-4 h-4 text-green-600" />
                            <span>Export as CSV</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Beneficiary
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {filteredHistory.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{record.beneficiary}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getRecordStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-500" />
                Service Information
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">What does Opt In mean?</p>
                    <p className="text-sm">When opted in, you can receive collect calls from authorized numbers and sponsors can pay for your calls.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">What does Opt Out mean?</p>
                    <p className="text-sm">When opted out, you will not receive any collect calls and the service will be completely disabled for your number.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Can I change my status anytime?</p>
                    <p className="text-sm">Yes, you can opt in or opt out of the service at any time. Changes take effect immediately.</p>
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
                Confirm {pendingAction === 'opt-in' ? 'Opt In' : 'Opt Out'}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {pendingAction === 'opt-in' ? 'opt in to' : 'opt out of'} the Teledeus collect call service?
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

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </div>
  );
};

export default OptInOut;