import React from 'react';
import { ArrowLeft, User, Calendar, Clock, Shield, Phone, MapPin, Settings } from 'lucide-react';

interface ProfileInfoProps {
  onBack: () => void;
}

interface ProfileData {
  userId: string;
  phoneNumber: string;
  lastLogin: string;
  accountStatus: 'Active' | 'Inactive' | 'Suspended';
  registrationDate: string;
  location: string;
  serviceType: string;
  totalCalls: number;
  lastCallDate: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ onBack }) => {
  const profileData: ProfileData = {
    userId: 'USR-234707549973',
    phoneNumber: '+234707549973',
    lastLogin: '2025-01-15T14:30:22',
    accountStatus: 'Active',
    registrationDate: '2024-03-15T09:15:00',
    location: 'Lagos, Nigeria',
    serviceType: 'Collect Call Premium',
    totalCalls: 156,
    lastCallDate: '2025-01-15T13:28:17'
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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const profileSections = [
    {
      title: 'Account Information',
      icon: User,
      items: [
        { label: 'User ID', value: profileData.userId, icon: User },
        { label: 'Phone Number', value: profileData.phoneNumber, icon: Phone },
        { label: 'Account Status', value: profileData.accountStatus, icon: Shield, isStatus: true },
        { label: 'Service Type', value: profileData.serviceType, icon: Settings }
      ]
    },
    {
      title: 'Activity Information',
      icon: Clock,
      items: [
        { label: 'Last Login', value: formatDateTime(profileData.lastLogin), icon: Clock },
        { label: 'Registration Date', value: formatDate(profileData.registrationDate), icon: Calendar },
        { label: 'Last Call Date', value: formatDateTime(profileData.lastCallDate), icon: Phone },
        { label: 'Total Calls', value: profileData.totalCalls.toString(), icon: Phone }
      ]
    },
    {
      title: 'Location Information',
      icon: MapPin,
      items: [
        { label: 'Location', value: profileData.location, icon: MapPin }
      ]
    }
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
              <User className="w-4 h-4 mr-2 text-blue-500" />
              Profile Menu
            </h3>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Account Details
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:scale-105">
                  Security Settings
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Information</h1>
              <p className="text-gray-600">Account details and activity information for {profileData.phoneNumber}</p>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 mb-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{profileData.phoneNumber}</h2>
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-4 py-2 text-sm font-semibold rounded-full border ${getStatusColor(profileData.accountStatus)}`}>
                      {profileData.accountStatus}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Member since {formatDate(profileData.registrationDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Sections */}
            <div className="space-y-6">
              {profileSections.map((section, sectionIndex) => {
                const SectionIcon = section.icon;
                return (
                  <div key={sectionIndex} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                        <SectionIcon className="w-6 h-6 mr-2 text-blue-500" />
                        {section.title}
                      </h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.items.map((item, itemIndex) => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={itemIndex} className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl hover:bg-blue-50/30 transition-all duration-200">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <ItemIcon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600 mb-1">{item.label}</p>
                                {item.isStatus ? (
                                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(item.value)}`}>
                                    {item.value}
                                  </span>
                                ) : (
                                  <p className="text-gray-900 font-semibold">{item.value}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-blue-500" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-105">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Update Security</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-all duration-200 hover:scale-105">
                  <Settings className="w-5 h-5 text-green-600" />
                  <span className="text-green-600 font-medium">Preferences</span>
                </button>
                <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all duration-200 hover:scale-105">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-600 font-medium">Call Settings</span>
                </button>
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
    </div>
  );
};

export default ProfileInfo;