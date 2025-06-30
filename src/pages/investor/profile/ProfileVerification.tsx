import { Link } from 'react-router-dom';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import { Card, CardContent } from '../../../components/ui/investor/card';

export default function ProfileVerification() {
  const verificationSteps = [
    {
      title: 'Email Verification',
      description: 'Verify your email address to secure your account',
      status: 'completed',
      icon: '✅',
    },
    {
      title: 'Phone Verification',
      description: 'Add and verify your phone number for additional security',
      status: 'completed',
      icon: '✅',
    },
    {
      title: 'Identity Verification',
      description: 'Upload government ID for identity verification',
      status: 'pending',
      icon: '⏳',
    },
    {
      title: 'Accredited Investor Status',
      description: 'Verify your accredited investor status to access exclusive deals',
      status: 'pending',
      icon: '⏳',
    },
  ];

  return (
    <>
      <InvestorHeader
        title="Profile Verification"
        subtitle="Complete your profile verification to access all features"
        actions={          <Link 
            to="/investor/profile"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Profile
          </Link>
        }
      />

      <div className="p-6">
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-blue-800">
                Complete all verification steps to access premium features and investment opportunities.
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {verificationSteps.map((step, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      step.status === 'completed' 
                        ? 'bg-green-100 text-green-800'
                        : step.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {step.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                    {step.status === 'pending' && (
                      <button className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors">
                        Start Verification
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits of Full Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Access Premium Deals</h4>
                    <p className="text-sm text-gray-600">Get early access to exclusive investment opportunities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Higher Investment Limits</h4>
                    <p className="text-sm text-gray-600">Invest larger amounts with verified status</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Priority Support</h4>
                    <p className="text-sm text-gray-600">Get priority customer service and support</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-gray-900">Enhanced Security</h4>
                    <p className="text-sm text-gray-600">Additional security features and protection</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
