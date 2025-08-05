import React from 'react';
import { ArrowLeft, Search, Filter, Download, FileSpreadsheet, FileText, File } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface CallHistoryProps {
  onBack: () => void;
}

interface CallRecord {
  sponsor: string;
  beneficiary: string;
  timestamp: string;
  status: 'Success' | 'Not Connected';
  duration: number;
}

const CallHistory: React.FC<CallHistoryProps> = ({ onBack }) => {
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

  const callRecords: CallRecord[] = [
    { sponsor: '234707549974', beneficiary: '+234707549973', timestamp: '2025-07-24T13:28:17', status: 'Success', duration: 12 },
    { sponsor: '234707549974', beneficiary: '+234707549973', timestamp: '2025-07-24T13:08:40', status: 'Success', duration: 8 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-18T08:07:46', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T17:18:06', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T17:13:42', status: 'Success', duration: 98 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T16:49:24', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T16:08:31', status: 'Success', duration: 19 },
    { sponsor: '200234707549973', beneficiary: '+234707549973', timestamp: '2025-07-17T14:31:49', status: 'Success', duration: 31 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T14:28:28', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T14:26:06', status: 'Success', duration: 51 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T14:23:10', status: 'Success', duration: 50 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T14:21:49', status: 'Success', duration: 49 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T14:20:32', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-17T14:18:43', status: 'Success', duration: 34 },
    { sponsor: '200234707549973', beneficiary: '+234707549973', timestamp: '2025-07-17T14:14:12', status: 'Success', duration: 11 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-07T13:13:38', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-07T13:09:14', status: 'Success', duration: 39 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-07T13:05:58', status: 'Success', duration: 26 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-07T13:02:34', status: 'Success', duration: 23 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-04T14:17:17', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-04T14:16:09', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-04T14:14:48', status: 'Success', duration: 6 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-04T14:12:17', status: 'Success', duration: 58 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-02T16:35:57', status: 'Success', duration: 27 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-02T16:35:32', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549974', beneficiary: '+234707549973', timestamp: '2025-07-02T14:07:31', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-07-01T10:14:17', status: 'Success', duration: 6 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-07-01T10:13:12', status: 'Success', duration: 6 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-07-01T10:08:08', status: 'Success', duration: 6 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-07-01T10:06:51', status: 'Success', duration: 30 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-07-01T10:06:20', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T12:11:25', status: 'Success', duration: 5 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T12:10:07', status: 'Success', duration: 5 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T12:08:42', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T11:36:49', status: 'Success', duration: 70 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T11:32:33', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T11:30:54', status: 'Not Connected', duration: 0 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T11:23:34', status: 'Success', duration: 45 },
    { sponsor: '200234707549972', beneficiary: '+234707549973', timestamp: '2025-06-27T11:16:28', status: 'Success', duration: 40 }
  ];

  const filteredRecords = callRecords.filter(record =>
    record.sponsor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.beneficiary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatTimestamp(record.timestamp).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const exportToCSV = () => {
    const headers = ['Sponsor', 'Beneficiary', 'Timestamp', 'Status', 'Duration (seconds)'];
    const csvContent = [
      headers.join(','),
      ...filteredRecords.map(record => [
        record.sponsor,
        record.beneficiary,
        formatTimestamp(record.timestamp),
        record.status,
        record.duration.toString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `pay4me-call-history-${new Date().toISOString().split('T')[0]}.csv`);
    setShowExportMenu(false);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredRecords.map(record => ({
        'Sponsor': record.sponsor,
        'Beneficiary': record.beneficiary,
        'Timestamp': formatTimestamp(record.timestamp),
        'Status': record.status,
        'Duration (seconds)': record.duration
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pay4Me Call History');
    
    // Set column widths
    const colWidths = [
      { wch: 20 }, // Sponsor
      { wch: 20 }, // Beneficiary
      { wch: 25 }, // Timestamp
      { wch: 15 }, // Status
      { wch: 18 }  // Duration
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `pay4me-call-history-${new Date().toISOString().split('T')[0]}.xlsx`);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const doc = new jsPDF('l', 'mm', 'a4'); // landscape orientation
    
    // Add title
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text('Pay4Me Call History Report', 14, 20);
    
    // Add subtitle with date range
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Total Records: ${filteredRecords.length}`, 14, 38);
    
    // Prepare table data
    const tableData = filteredRecords.map(record => [
      record.sponsor,
      record.beneficiary,
      formatTimestamp(record.timestamp),
      record.status,
      `${record.duration}s`
    ]);

    // Add table
    doc.autoTable({
      head: [['Sponsor', 'Beneficiary', 'Timestamp', 'Status', 'Duration']],
      body: tableData,
      startY: 45,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [59, 130, 246], // Blue color
        textColor: 255,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252] // Light gray
      },
      columnStyles: {
        0: { cellWidth: 45 }, // Sponsor
        1: { cellWidth: 45 }, // Beneficiary
        2: { cellWidth: 55 }, // Timestamp
        3: { cellWidth: 30 }, // Status
        4: { cellWidth: 25 }  // Duration
      }
    });

    doc.save(`pay4me-call-history-${new Date().toISOString().split('T')[0]}.pdf`);
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
              <Search className="w-4 h-4 mr-2 text-blue-500" />
              
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Pay4Me Call History</h1>
              <p className="text-gray-600">Collect-call history for +234707549973</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by sponsor, beneficiary, status, or timestamp..."
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
                          <button
                            onClick={exportToExcel}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                          >
                            <FileSpreadsheet className="w-4 h-4 text-green-600" />
                            <span>Export as Excel</span>
                          </button>
                          <button
                            onClick={exportToPDF}
                            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                          >
                            <FileText className="w-4 h-4 text-red-600" />
                            <span>Export as PDF</span>
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
                <Search className="w-6 h-6 mr-2 text-blue-500" />
                Call Records
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredRecords.length} of {callRecords.length} records
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Sponsor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Beneficiary
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
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
                          <span className="font-medium">{record.sponsor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {record.beneficiary}
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
                  <Search size={48} />
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

export default CallHistory;
