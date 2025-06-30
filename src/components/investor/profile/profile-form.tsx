interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  title: string;
  company: string;
  linkedin: string;
  twitter: string;
  website: string;
  accreditedInvestor: boolean;
  investmentPreferences: {
    categories: string[];
    riskTolerance: string;
    minBudget: string;
    maxBudget: string;
    investmentStage: string[];
  };
  investmentStats: {
    totalInvested: number;
    activeInvestments: number;
    totalReturns: number;
    successfulExits: number;
    portfolioValue: number;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  verification: {
    email: boolean;
    phone: boolean;
    identity: boolean;
    accreditation: boolean;
  };
}

interface ProfileFormProps {
  profile?: ProfileFormData;
}

export default function ProfileForm({
  profile = {
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    title: '',
    company: '',
    linkedin: '',
    twitter: '',
    website: '',
    accreditedInvestor: false,
    investmentPreferences: {
      categories: [],
      riskTolerance: 'moderate',
      minBudget: '',
      maxBudget: '',
      investmentStage: [],
    },
    investmentStats: {
      totalInvested: 0,
      activeInvestments: 0,
      totalReturns: 0,
      successfulExits: 0,
      portfolioValue: 0,
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    verification: {
      email: false,
      phone: false,
      identity: false,
      accreditation: false,
    },
  },
}: ProfileFormProps) {
  const formData = profile;
    return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
        <p className="text-sm text-gray-600 mt-1">Your investor profile and preferences</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="text-gray-900 font-medium bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              {formData.name || 'Not provided'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <div className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              {formData.email || 'Not provided'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone Number</label>
            <div className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              {formData.phone || 'Not provided'}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <div className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              {formData.location || 'Not provided'}
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">About Me</label>
            <div className="text-gray-900 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200 min-h-[80px]">
              {formData.bio || 'No bio provided'}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Investment Preferences</h3>
          <p className="text-sm text-gray-600">Your investment criteria and focus areas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Preferred Categories</label>
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              {formData.investmentPreferences.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.investmentPreferences.categories.map((category) => (
                    <span 
                      key={category}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No categories selected</span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Risk Tolerance</label>
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                formData.investmentPreferences.riskTolerance === 'aggressive' ? 'bg-red-100 text-red-800' :
                formData.investmentPreferences.riskTolerance === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {formData.investmentPreferences.riskTolerance.charAt(0).toUpperCase() + formData.investmentPreferences.riskTolerance.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Investment Range</label>
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              {formData.investmentPreferences.minBudget && formData.investmentPreferences.maxBudget ? (
                <span className="text-gray-900 font-medium">
                  ${parseInt(formData.investmentPreferences.minBudget).toLocaleString()} - ${parseInt(formData.investmentPreferences.maxBudget).toLocaleString()}
                </span>
              ) : (
                <span className="text-gray-500">Not specified</span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Communication Preferences</h3>
          <p className="text-sm text-gray-600">How you prefer to receive updates and notifications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              <div className={`w-3 h-3 rounded-full ${formData.notifications.email ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formData.notifications.email ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Push Notifications</span>
              <div className={`w-3 h-3 rounded-full ${formData.notifications.push ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formData.notifications.push ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
              <div className={`w-3 h-3 rounded-full ${formData.notifications.sms ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formData.notifications.sms ? 'Enabled' : 'Disabled'}
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-blue-800">
              To update your profile information, please visit the Settings page.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
