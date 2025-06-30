import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import ProfileForm from '../../../components/investor/profile/profile-form';
import AvatarUpload from '../../../components/investor/profile/avatar-upload';
import { Card, CardContent } from '../../../components/ui/investor/card';

// Enhanced profile data interface
interface ProfileData {
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

// Mock data for demonstration purposes
const mockProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  bio: 'Angel investor with 10+ years of experience in tech startups. Passionate about innovative solutions that address real-world problems.',
  title: 'Senior Angel Investor',
  company: 'Tech Ventures LLC',
  linkedin: 'https://linkedin.com/in/johndoe',
  twitter: 'https://twitter.com/johndoe',
  website: 'https://johndoe.com',
  accreditedInvestor: true,
  investmentPreferences: {
    categories: ['Software', 'AI', 'Healthcare'],
    riskTolerance: 'moderate',
    minBudget: '10000',
    maxBudget: '50000',
    investmentStage: ['Seed', 'Series A'],
  },
  investmentStats: {
    totalInvested: 500000,
    activeInvestments: 12,
    totalReturns: 75000,
    successfulExits: 3,
    portfolioValue: 575000,
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  verification: {
    email: true,
    phone: true,
    identity: true,
    accreditation: true,
  },
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profile] = useState<ProfileData>(mockProfile);
  const [imageUrl, setImageUrl] = useState('/avatar.jpg');
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (file: File) => {
    setIsUploading(true);
    
    // Simulate API upload
    setTimeout(() => {
      setImageUrl(URL.createObjectURL(file));
      setIsUploading(false);
    }, 1500);
  };

  return (
    <>
      <InvestorHeader
        title="Profile"
        subtitle="Manage your investor profile and information."
        actions={
          <Link 
            to="/investor/profile/settings"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
        }
      />

      <div className="p-6">
        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Investment Preferences</h3>
                  <p className="text-sm text-gray-600">Define your investment criteria and preferences</p>
                </div>
                <div className="flex-shrink-0">
                  <Link 
                    to="/investor/profile/investment-preferences"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                  >
                    Configure
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Verification Status</h3>
                  <p className="text-sm text-gray-600">Manage accredited investor verification</p>
                </div>
                <div className="flex-shrink-0">
                  <Link 
                    to="/investor/profile/verification"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                  >
                    View Status
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile and Settings Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
          {/* Profile Sidebar */}
          <div className="xl:col-span-1">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <AvatarUpload
                  currentImageUrl={imageUrl}
                  onImageChange={handleImageChange}
                  isLoading={isUploading}
                  size="lg"
                />
                
                <h3 className="mt-4 text-xl font-medium text-gray-900">
                  {isLoading ? 'Loading...' : profile.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {isLoading ? 'Loading...' : profile.email}
                </p>
                
                <div className="mt-4 flex items-center justify-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Investor
                  </span>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-3 w-full">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {isLoading ? '...' : profile.investmentStats.activeInvestments}
                    </p>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">
                      {isLoading ? '...' : profile.investmentStats.successfulExits}
                    </p>
                    <p className="text-xs text-gray-500">Exits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">
                      {isLoading ? '...' : `${((profile.investmentStats.totalReturns / profile.investmentStats.totalInvested) * 100).toFixed(1)}%`}
                    </p>
                    <p className="text-xs text-gray-500">ROI</p>
                  </div>
                </div>
                
                {/* Professional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {isLoading ? 'Loading...' : profile.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {isLoading ? 'Loading...' : profile.company}
                    </p>
                  </div>
                  
                  {/* Accreditation Badge */}
                  <div className="mt-3 flex justify-center">
                    {profile.accreditedInvestor && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Accredited
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Networks */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Professional Networks
                  </h3>
                  <span className="text-xs text-gray-500">
                    {Object.values(profile.verification).filter(Boolean).length}/4 verified
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                        <p className="text-xs text-gray-500">
                          {profile.linkedin ? 'Connected' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {profile.verification.identity && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                      <button className={`text-sm ${profile.linkedin ? 'text-red-600 hover:text-red-900' : 'text-blue-600 hover:text-blue-900'}`}>
                        {profile.linkedin ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Twitter</p>
                        <p className="text-xs text-gray-500">
                          {profile.twitter ? 'Connected' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <button className={`text-sm ${profile.twitter ? 'text-red-600 hover:text-red-900' : 'text-blue-600 hover:text-blue-900'}`}>
                      {profile.twitter ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Focus */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Investment Focus
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Preferred Categories</p>
                    <div className="flex flex-wrap gap-2">
                      {profile.investmentPreferences.categories.slice(0, 3).map((category) => (
                        <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {category}
                        </span>
                      ))}
                      {profile.investmentPreferences.categories.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{profile.investmentPreferences.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Investment Range</p>
                    <p className="text-sm text-gray-600">
                      ${parseInt(profile.investmentPreferences.minBudget).toLocaleString()} - ${parseInt(profile.investmentPreferences.maxBudget).toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Risk Tolerance</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.investmentPreferences.riskTolerance === 'high' ? 'bg-red-100 text-red-800' :
                      profile.investmentPreferences.riskTolerance === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {profile.investmentPreferences.riskTolerance.charAt(0).toUpperCase() + profile.investmentPreferences.riskTolerance.slice(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Enhanced Profile Form */}
            <ProfileForm
              profile={profile}
            />

            {/* Recent Activity Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Investment Activity</h3>
                  <Link to="/investor/portfolio" className="text-sm text-blue-600 hover:text-blue-800">
                    View all →
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Investment in TechCorp</p>
                        <p className="text-xs text-gray-500">Series A • $25,000 invested</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">+12.5%</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Successful Exit: HealthTech</p>
                        <p className="text-xs text-gray-500">Acquisition • 3.2x return</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">+220%</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Due Diligence: AI Startup</p>
                        <p className="text-xs text-gray-500">Seed • Under review</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
