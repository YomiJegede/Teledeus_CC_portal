import React from 'react';
import { ArrowLeft, Search, Filter, CreditCard, Download, File } from 'lucide-react';
import { saveAs } from 'file-saver';

interface MCAHistoryProps {
  onBack: () => void;
}

interface MCARecord {
  transactionId: string;
  beneficiary: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'Success' | 'Failed' | 'Pending';
  description: string;
  reference: string;
}

const MCAHistory: React.FC<MCAHistoryProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showExportMenu, setShowExportMenu] = React.useState(false);

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

  const mcaRecords: MCARecord[] = [
    { transactionId: 'MCA-2025-001234', beneficiary: '+234707549973', amount: 500.00, currency: 'NGN', timestamp: '2025-01-15T14:30:22', status: 'Success', description: 'Mobile Credit Advance', reference: 'REF-MCA-001234' },
    { transactionId: 'MCA-2025-001233', beneficiary: '+234707549973', amount: 1000.00, currency: 'NGN', timestamp: '2025-01-14T10:15:45', status: 'Success', description: 'Emergency Credit Top-up', reference: 'REF-MCA-001233' },
    { transactionId: 'MCA-2025-001232', beneficiary: '+234707549973', amount: 250.00, currency: 'NGN', timestamp: '2025-01-13T16:22:18', status: 'Failed', description: 'Credit Advance Request', reference: 'REF-MCA-001232' },
    { transactionId: 'MCA-2025-001231', beneficiary: '+234707549973', amount: 750.00, currency: 'NGN', timestamp: '2025-01-12T09:45:33', status: 'Success', description: 'Mobile Credit Advance', reference: 'REF-MCA-001231' },
    { transactionId: 'MCA-2025-001230', beneficiary: '+234707549973', amount: 300.00, currency: 'NGN', timestamp: '2025-01-11T13:28:17', status: 'Pending', description: 'Credit Top-up Request', reference: 'REF-MCA-001230' },
    { transactionId: 'MCA-2025-001229', beneficiary: '+234707549973', amount: 1500.00, currency: 'NGN', timestamp: '2025-01-10T11:12:55', status: 'Success', description: 'Bulk Credit Advance', reference: 'REF-MCA-001229' },
    { transactionId: 'MCA-2025-001228', beneficiary: '+234707549973', amount: 200.00, currency: 'NGN', timestamp: '2025-01-09T15:33:42', status: 'Success', description: 'Quick Credit Top-up', reference: 'REF-MCA-001228' },
    { transactionId: 'MCA-2025-001227', beneficiary: '+234707549973', amount: 800.00, currency: 'NGN', timestamp: '2025-01-08T08:17:29', status: 'Failed', description: 'Mobile Credit Advance', reference: 'REF-MCA-001227' },
    { transactionId: 'MCA-2025-001226', beneficiary: '+234707549973', amount: 450.00, currency: 'NGN', timestamp: '2025-01-07T12:44:16', status: 'Success', description: 'Credit Advance Request', reference: 'REF-MCA-001226' },
    { transactionId: 'MCA-2025-001225', beneficiary: '+234707549973', amount: 600.00, currency: 'NGN', timestamp: '2025-01-06T17:55:38', status: 'Success', description: 'Emergency Credit Top-up', reference: 'REF-MCA-001225' },
    { transactionId: 'MCA-2025-001224', beneficiary: '+234707549973', amount: 350.00, currency: 'NGN', timestamp: '2025-01-05T14:21:47', status: 'Success', description: 'Mobile Credit Advance', reference: 'REF-MCA-001224' },
    { transactionId: 'MCA-2025-001223', beneficiary: '+234707549973', amount: 900.00, currency: 'NGN', timestamp: '2025-01-04T10:38:25', status: 'Pending', description: 'Bulk Credit Request', reference: 'REF-MCA-001223' },
    { transactionId: 'MCA-2025-001222', beneficiary: '+234707549973', amount: 275.00, currency: 'NGN', timestamp: '2025-01-03T16:14:52', status: 'Success', description: 'Quick Credit Top-up', reference: 'REF-MCA-001222' },
    { transactionId: 'MCA-2025-001221', beneficiary: '+234707549973', amount: 550.00, currency: 'NGN', timestamp: '2025-01-02T09:27:14', status: 'Failed', description: 'Credit Advance Request', reference: 'REF-MCA-001221' },
    { transactionId: 'MCA-2025-001220', beneficiary: '+234707549973', amount: 425.00, currency: 'NGN', timestamp: '2025-01-01T13:49:36', status: 'Success', description: 'New Year Credit Top-up', reference: 'REF-MCA-001220' }
  ];

  const filteredRecords = mcaRecords.filter(record =>
    record.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatTimestamp(record.timestamp).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'Beneficiary', 'Amount', 'Currency', 'Timestamp', 'Status', 'Description', 'Reference'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => [
        record.transactionId,
        record.beneficiary,
        record.amount.toString(),
        record.currency,
        formatTimestamp(record.timestamp),
        record.status,
        `"${record.description}"`, // Wrap in quotes to handle commas
        record.reference
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `mca-history-${new Date().toISOString().split('T')[0]}.csv`);
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

      {/* Sidebar */}
      <div className="flex">
        <div className="w-64 bg-white/60 backdrop-blur-sm min-h-screen border-r border-gray-200/50">
          <div className="p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-6 flex items-center">
              <CreditCard className="w-4 h-4 mr-2 text-blue-500" />
              Missed Call Alert Management
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Transaction History
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Credit Limits
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Payment Methods
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Missed Call Alert History</h1>
              <p className="text-gray-600">Missed Call Alert transaction history for +234707549973</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Successful</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mcaRecords.filter(r => r.status === 'Success').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Failed</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mcaRecords.filter(r => r.status === 'Failed').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mcaRecords.filter(r => r.status === 'Pending').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatAmount(mcaRecords.reduce((sum, r) => r.status === 'Success' ? sum + r.amount : sum, 0), 'NGN')}
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
                    placeholder="Search by transaction ID, beneficiary, status, or description..."
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
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
                  Missed Call Alert Transaction Records
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredRecords.length} of {mcaRecords.length} records
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Beneficiary
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description
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
                              <span className="font-medium">{record.transactionId}</span>
                              <p className="text-xs text-gray-500">{record.reference}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {record.beneficiary}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {formatAmount(record.amount, record.currency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatTimestamp(record.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {record.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredRecords.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <CreditCard size={48} />
                  </div>
                  <p className="text-gray-500 text-lg">No records found</p>
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

export default MCAHistory;