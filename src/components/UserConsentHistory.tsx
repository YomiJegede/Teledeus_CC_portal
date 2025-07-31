import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, UserCheck, Clock, Phone, Hash } from 'lucide-react';

interface UserConsentHistoryProps {
  onBack: () => void;
}

interface ConsentRecord {
  timestamp: string;
  callToAction: 'Accepted' | 'Declined' | 'Busy' | 'No Answer' | 'Timeout' | 'Invalid';
  keyPress: '0' | '1' | '2' | '3' | 'None';
  callerNumber: string;
  sessionId: string;
  duration: number;
  consentType: string;
}

const UserConsentHistory: React.FC<UserConsentHistoryProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/(\d{4})\/(\d{2})\/(\d{2}),/, '$1-$2-$3');
  };

  const consentRecords: ConsentRecord[] = [
    { timestamp: '2025-01-15T14:30:22', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234707549974', sessionId: 'CNS-2025-001234', duration: 45, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-15T13:28:17', callToAction: 'Declined', keyPress: '2', callerNumber: '+234801234567', sessionId: 'CNS-2025-001233', duration: 12, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-15T12:15:33', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234707549974', sessionId: 'CNS-2025-001232', duration: 38, consentType: 'Premium Service Consent' },
    { timestamp: '2025-01-14T16:45:18', callToAction: 'Busy', keyPress: 'None', callerNumber: '+234809876543', sessionId: 'CNS-2025-001231', duration: 0, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-14T15:22:44', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234703456789', sessionId: 'CNS-2025-001230', duration: 67, consentType: 'Service Activation' },
    { timestamp: '2025-01-14T14:18:29', callToAction: 'No Answer', keyPress: 'None', callerNumber: '+234812345678', sessionId: 'CNS-2025-001229', duration: 0, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-14T11:33:55', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234706789012', sessionId: 'CNS-2025-001228', duration: 29, consentType: 'Data Usage Consent' },
    { timestamp: '2025-01-13T17:42:16', callToAction: 'Declined', keyPress: '2', callerNumber: '+234700123456', sessionId: 'CNS-2025-001227', duration: 8, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-13T16:28:37', callToAction: 'Timeout', keyPress: 'None', callerNumber: '+234707549974', sessionId: 'CNS-2025-001226', duration: 0, consentType: 'Premium Service Consent' },
    { timestamp: '2025-01-13T15:14:52', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234801234567', sessionId: 'CNS-2025-001225', duration: 52, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-13T13:47:23', callToAction: 'Invalid', keyPress: '9', callerNumber: '+234809876543', sessionId: 'CNS-2025-001224', duration: 15, consentType: 'Service Activation' },
    { timestamp: '2025-01-12T18:35:41', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234703456789', sessionId: 'CNS-2025-001223', duration: 41, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-12T16:22:18', callToAction: 'Declined', keyPress: '2', callerNumber: '+234812345678', sessionId: 'CNS-2025-001222', duration: 6, consentType: 'Data Usage Consent' },
    { timestamp: '2025-01-12T14:58:33', callToAction: 'Busy', keyPress: 'None', callerNumber: '+234706789012', sessionId: 'CNS-2025-001221', duration: 0, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-12T12:44:27', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234700123456', sessionId: 'CNS-2025-001220', duration: 33, consentType: 'Premium Service Consent' },
    { timestamp: '2025-01-11T19:17:45', callToAction: 'No Answer', keyPress: 'None', callerNumber: '+234707549974', sessionId: 'CNS-2025-001219', duration: 0, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-11T17:53:12', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234801234567', sessionId: 'CNS-2025-001218', duration: 58, consentType: 'Service Activation' },
    { timestamp: '2025-01-11T15:29:38', callToAction: 'Declined', keyPress: '2', callerNumber: '+234809876543', sessionId: 'CNS-2025-001217', duration: 11, consentType: 'Collect Call Authorization' },
    { timestamp: '2025-01-11T13:16:54', callToAction: 'Accepted', keyPress: '1', callerNumber: '+234703456789', sessionId: 'CNS-2025-001216', duration: 44, consentType: 'Data Usage Consent' },
    { timestamp: '2025-01-10T20:42:19', callToAction: 'Timeout', keyPress: 'None', callerNumber: '+234812345678', sessionId: 'CNS-2025-001215', duration: 0, consentType: 'Collect Call Authorization' }
  ];

  const filteredRecords = consentRecords.filter(record =>
    record.callToAction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.keyPress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.callerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.consentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatTimestamp(record.timestamp).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Declined':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'No Answer':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Timeout':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Invalid':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getKeyPressColor = (keyPress: string) => {
    switch (keyPress) {
      case '1':
        return 'bg-green-50 text-green-700 border-green-200';
      case '2':
        return 'bg-red-50 text-red-700 border-red-200';
      case '0':
      case '3':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'None':
        return 'bg-gray-50 text-gray-500 border-gray-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
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
              <UserCheck className="w-4 h-4 mr-2 text-blue-500" />
              Consent Management
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Consent History
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Consent Settings
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Privacy Controls
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">User Consent History</h1>
              <p className="text-gray-600">User consent and authorization history for +234707549973</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Accepted</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {consentRecords.filter(r => r.callToAction === 'Accepted').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Declined</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {consentRecords.filter(r => r.callToAction === 'Declined').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">No Response</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {consentRecords.filter(r => ['Busy', 'No Answer', 'Timeout'].includes(r.callToAction)).length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Hash className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Key Press 1</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {consentRecords.filter(r => r.keyPress === '1').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by action, key press, caller number, session ID, or consent type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:scale-105">
                    <Filter size={18} />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <UserCheck className="w-6 h-6 mr-2 text-blue-500" />
                  User Consent Records
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredRecords.length} of {consentRecords.length} records
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Call to Action
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Key Press
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Caller Number
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Session ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Consent Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {filteredRecords.map((record, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-blue-50/30 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                            <div>
                              <span className="font-medium">{formatTimestamp(record.timestamp)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getActionColor(record.callToAction)}`}>
                            {record.callToAction}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getKeyPressColor(record.keyPress)}`}>
                            {record.keyPress}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {record.callerNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                            {record.sessionId}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {record.consentType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {record.duration}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRecords.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <UserCheck size={48} />
                  </div>
                  <p className="text-gray-500 text-lg">No consent records found</p>
                  <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
                </div>
              )}
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

export default UserConsentHistory;