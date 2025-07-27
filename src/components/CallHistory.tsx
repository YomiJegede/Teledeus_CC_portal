import React from 'react';
import { ArrowLeft } from 'lucide-react';

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

  const getStatusColor = (status: string) => {
    return status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex">
        <div className="w-48 bg-gray-100 min-h-screen border-r border-gray-200">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">
                  Opt in/out
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">
                  Roaming status
                </button>
              </li>
              <li>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Collect-call history → +234707549973
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Sponsor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Beneficiary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {callRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.sponsor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.beneficiary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTimestamp(record.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teledeus Logo */}
          <div className="fixed bottom-4 right-4">
            <div className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-medium">
              Teledeus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallHistory;