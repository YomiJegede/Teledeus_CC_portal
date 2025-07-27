import React, { useState } from 'react';
import { ArrowLeft, Shield, ShieldCheck, Plus, Trash2, Search, Filter } from 'lucide-react';

interface BeneficiaryListsProps {
  onBack: () => void;
}

interface BeneficiaryEntry {
  number: string;
  dateAdded: string;
  addedBy: string;
  status: 'Active' | 'Inactive';
}

const BeneficiaryLists: React.FC<BeneficiaryListsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'whitelist' | 'blacklist'>('whitelist');
  const [searchTerm, setSearchTerm] = useState('');

  const whitelistData: BeneficiaryEntry[] = [
    { number: '+234707549973', dateAdded: '2025-01-15', addedBy: 'System', status: 'Active' },
    { number: '+234801234567', dateAdded: '2025-01-14', addedBy: 'Admin', status: 'Active' },
    { number: '+234809876543', dateAdded: '2025-01-13', addedBy: 'User', status: 'Active' },
    { number: '+234703456789', dateAdded: '2025-01-12', addedBy: 'System', status: 'Inactive' },
    { number: '+234812345678', dateAdded: '2025-01-11', addedBy: 'Admin', status: 'Active' },
    { number: '+234706789012', dateAdded: '2025-01-10', addedBy: 'User', status: 'Active' },
  ];

  const blacklistData: BeneficiaryEntry[] = [
    { number: '+234700000001', dateAdded: '2025-01-14', addedBy: 'Security', status: 'Active' },
    { number: '+234700000002', dateAdded: '2025-01-13', addedBy: 'Admin', status: 'Active' },
    { number: '+234700000003', dateAdded: '2025-01-12', addedBy: 'System', status: 'Active' },
    { number: '+234700000004', dateAdded: '2025-01-11', addedBy: 'Security', status: 'Inactive' },
  ];

  const currentData = activeTab === 'whitelist' ? whitelistData : blacklistData;
  const filteredData = currentData.filter(entry =>
    entry.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.addedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getTabColor = (tab: string) => {
    if (tab === 'whitelist') {
      return activeTab === 'whitelist' 
        ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
        : 'bg-green-50 text-green-600 hover:bg-green-100';
    } else {
      return activeTab === 'blacklist' 
        ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
        : 'bg-red-50 text-red-600 hover:bg-red-100';
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
              <Shield className="w-4 h-4 mr-2 text-blue-500" />
              
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Beneficiary Lists</h1>
              <p className="text-gray-600">Manage your whitelist and blacklist entries for +234707549973</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-2 mb-8">
              <button
                onClick={() => setActiveTab('whitelist')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${getTabColor('whitelist')}`}
              >
                <ShieldCheck size={20} />
                <span>Whitelist</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {whitelistData.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('blacklist')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${getTabColor('blacklist')}`}
              >
                <Shield size={20} />
                <span>Blacklist</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {blacklistData.length}
                </span>
              </button>
            </div>

            {/* Search and Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by number or added by..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
                    <Plus size={18} />
                    <span>Add Entry</span>
                  </button>
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
                  {activeTab === 'whitelist' ? (
                    <>
                      <ShieldCheck className="w-6 h-6 mr-2 text-green-500" />
                      Whitelist Entries
                    </>
                  ) : (
                    <>
                      <Shield className="w-6 h-6 mr-2 text-red-500" />
                      Blacklist Entries
                    </>
                  )}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredData.length} of {currentData.length} entries
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Added By
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {filteredData.map((entry, index) => (
                      <tr 
                        key={index} 
                        className="hover:bg-blue-50/30 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:bg-blue-500 transition-colors"></div>
                            <span className="text-sm font-medium text-gray-900">{entry.number}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(entry.dateAdded).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                            {entry.addedBy}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-red-500 hover:text-red-700 transition-colors hover:scale-110 transform duration-200">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredData.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    {activeTab === 'whitelist' ? <ShieldCheck size={48} /> : <Shield size={48} />}
                  </div>
                  <p className="text-gray-500 text-lg">No entries found</p>
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

export default BeneficiaryLists;
