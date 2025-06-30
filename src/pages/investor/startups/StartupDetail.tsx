import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InvestorHeader from '../../../components/layouts/investor/investor-header';
import { Button } from '../../../components/ui/investor/button';

interface VideoPlayerProps {
  src: string;
  type: 'youtube' | 'mp4';
  poster?: string;
}

function VideoPlayer({ src, type, poster }: VideoPlayerProps) {
  if (type === 'youtube') {
    const extractYoutubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : url;
    };

    return (
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${extractYoutubeId(src)}`}
          title="Startup Pitch Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="aspect-video">
      <video
        controls
        poster={poster}
        className="w-full h-full rounded-lg object-cover"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

interface Startup {
  id: string;
  title: string;
  description: string;
  industry: string;
  imageUrl: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'mp4';
  fundingStage: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'pre-seed';
  fundingNeeded: number;
  currentFunding: number;
  roiProjection: number;
  investmentTimeline: string;
  founderName: string;
  founderBio: string;
  teamMembers: {
    name: string;
    role: string;
    bio: string;
    linkedinUrl?: string;
    imageUrl?: string;
  }[];
  financialProjections: {
    year: number;
    revenue: number;
    expenses: number;
    profit: number;
  }[];
  marketAnalysis: {
    marketSize: string;
    targetMarket: string;
    competitors: string[];
    competitiveAdvantage: string;
  };
  investmentTerms: {
    minimumInvestment: number;
    maximumInvestment: number;
    equityOffered: number;
    useOfFunds: string[];
  };
  riskFactors: string[];
}

// Mock startup data (in a real app, this would come from an API)
const mockStartup: Startup = {
  id: '1',
  title: 'AI-Powered Sales Analytics Platform',
  description: 'A cutting-edge AI platform that analyzes sales data, predicts customer behavior, and provides actionable insights to boost revenue by 40%. Our proprietary machine learning algorithms process millions of data points to deliver unprecedented accuracy in sales forecasting.',
  industry: 'AI/ML',
  imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  videoType: 'youtube' as const,
  fundingStage: 'series-a',
  fundingNeeded: 2000000,
  currentFunding: 1200000,
  roiProjection: 8.5,
  investmentTimeline: '3-5 years',
  founderName: 'Sarah Johnson',
  founderBio: 'Former data scientist at Google with 10+ years of experience in AI and machine learning.',
  teamMembers: [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Former Google data scientist with expertise in AI/ML and enterprise software. Led development of Google Analytics ML features used by millions.',
      linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
      imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612c829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Mark Chen',
      role: 'CTO',
      bio: 'Full-stack engineer with 8 years at Microsoft, specializing in scalable cloud architectures and real-time data processing systems.',
      linkedinUrl: 'https://linkedin.com/in/markchen',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Sales',
      bio: 'Former Salesforce sales leader with track record of building enterprise sales teams and achieving 150% of quota for 5 consecutive years.',
      linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'Former product manager at Stripe with expertise in B2B SaaS products. Led product strategy for Stripe Dashboard used by 2M+ businesses.',
      linkedinUrl: 'https://linkedin.com/in/davidkim',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  ],
  financialProjections: [
    { year: 1, revenue: 500000, expenses: 800000, profit: -300000 },
    { year: 2, revenue: 1500000, expenses: 1000000, profit: 500000 },
    { year: 3, revenue: 4000000, expenses: 2000000, profit: 2000000 },
    { year: 4, revenue: 8000000, expenses: 3500000, profit: 4500000 },
    { year: 5, revenue: 15000000, expenses: 6000000, profit: 9000000 },
  ],
  marketAnalysis: {
    marketSize: '$50B global sales analytics market growing at 15% CAGR, expected to reach $85B by 2028',
    targetMarket: 'Mid-market and enterprise B2B companies with sales teams of 50+ representatives across technology, manufacturing, and professional services sectors',
    competitors: ['Salesforce Analytics Cloud', 'HubSpot Sales Analytics', 'Pipedrive Insights', 'Tableau CRM'],
    competitiveAdvantage: 'Proprietary ML algorithms with 95% prediction accuracy (vs 75% industry average), 10x faster implementation time, and 60% lower total cost of ownership'
  },
  investmentTerms: {
    minimumInvestment: 25000,
    maximumInvestment: 500000,
    equityOffered: 15,
    useOfFunds: [
      'Product development and AI model enhancement (40%)',
      'Sales and marketing expansion (35%)',
      'Engineering team growth (20%)',
      'Operations and compliance (5%)'
    ]
  },
  riskFactors: [
    'Competitive landscape with established players like Salesforce and HubSpot',
    'Dependency on data quality and availability from customer systems',
    'Potential regulatory changes in data privacy laws (GDPR, CCPA)',
    'Customer acquisition costs in competitive enterprise market',
    'Technology risks related to AI model accuracy and scalability',
    'Key person dependency on founding team members'
  ]
};

export default function StartupDetail() {
  const navigate = useNavigate();
  const { startupId } = useParams<{ startupId: string }>();
  // In a real app, startupId would be used to fetch specific startup data from API
  console.log('Viewing startup with ID:', startupId);
  const [startup] = useState<Startup>(mockStartup);
  const [bidAmount, setBidAmount] = useState<number>(startup.investmentTerms.minimumInvestment);
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stageLabels = {
    'pre-seed': 'Pre-Seed',
    'seed': 'Seed',
    'series-a': 'Series A',
    'series-b': 'Series B',
    'series-c': 'Series C',
  };

  const stageColors = {
    'pre-seed': 'bg-gray-100 text-gray-800',
    'seed': 'bg-green-100 text-green-800',
    'series-a': 'bg-blue-100 text-blue-800',
    'series-b': 'bg-purple-100 text-purple-800',
    'series-c': 'bg-orange-100 text-orange-800',
  };

  const handleSubmitBid = async () => {
    setIsSubmittingBid(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(`Bid of ${formatCurrency(bidAmount)} submitted successfully! The startup team will review and respond within 48 hours.`);
    setIsSubmittingBid(false);
  };

  const fundingProgress = (startup.currentFunding / startup.fundingNeeded) * 100;

  return (
    <>
      <InvestorHeader 
        title={startup.title}
        subtitle={`${stageLabels[startup.fundingStage]} • ${startup.industry} • ROI Projection: ${startup.roiProjection}x`}
      />
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="secondary" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            ← Back to Browse
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{startup.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stageColors[startup.fundingStage]}`}>
                  {stageLabels[startup.fundingStage]}
                </span>
                <span className="text-sm text-gray-600">{startup.industry}</span>
                <span className="text-sm text-gray-600">ROI Projection: {startup.roiProjection}x</span>
              </div>
            </div>
            
            {/* Funding Progress */}
            <div className="text-right min-w-[200px]">
              <div className="text-sm text-gray-600 mb-1">Funding Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(fundingProgress, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                {formatCurrency(startup.currentFunding)} of {formatCurrency(startup.fundingNeeded)}
              </div>
            </div>
          </div>
        </div>

        {/* Video Pitch Section */}
        {startup.videoUrl && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              marginBottom: '1rem', 
              color: '#000000',
              display: 'block'
            }}>Pitch Video</h2>
            <VideoPlayer 
              src={startup.videoUrl} 
              type={startup.videoType || 'youtube'} 
              poster={startup.imageUrl}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#000000',
                display: 'block'
              }}>About the Startup</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">{startup.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Founder:</span>
                  <div className="font-medium text-slate-500">{startup.founderName}</div>
                  <div className="text-sm text-gray-600">{startup.founderBio}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Investment Timeline:</span>
                  <div className="font-medium text-slate-500">{startup.investmentTimeline}</div>
                </div>
              </div>
            </div>

            {/* Financial Projections */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#000000',
                display: 'block'
              }} data-testid="financial-projections-heading">Financial Projections</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Year</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Revenue</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Expenses</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Profit</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {startup.financialProjections.map((projection, index) => {
                      const margin = projection.revenue > 0 ? ((projection.profit / projection.revenue) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-3 text-sm font-medium text-black">Year {projection.year}</td>
                          <td className="px-4 py-3 text-sm text-black">{formatCurrency(projection.revenue)}</td>
                          <td className="px-4 py-3 text-sm text-black">{formatCurrency(projection.expenses)}</td>
                          <td className={`px-4 py-3 text-sm font-medium ${projection.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(projection.profit)}
                          </td>
                          <td className={`px-4 py-3 text-sm ${parseFloat(margin) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {margin}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Team Profiles */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#000000',
                display: 'block'
              }}>Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startup.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                    {member.imageUrl && (
                      <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-gray-900">{member.name}</h3>
                        {member.linkedinUrl && (
                          <a 
                            href={member.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            LinkedIn →
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#000000',
                display: 'block'
              }}>Market Analysis</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Market Size & Growth</h3>
                  <p className="text-sm text-gray-700">{startup.marketAnalysis.marketSize}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Target Market</h3>
                  <p className="text-sm text-gray-700">{startup.marketAnalysis.targetMarket}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Competitive Advantage</h3>
                  <p className="text-sm text-gray-700">{startup.marketAnalysis.competitiveAdvantage}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Key Competitors</h3>
                  <div className="flex flex-wrap gap-2">
                    {startup.marketAnalysis.competitors.map((competitor, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {competitor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#000000',
                display: 'block'
              }}>Risk Assessment</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <h3 className="font-medium text-yellow-800">Investment Risk Factors</h3>
                </div>
                <ul className="text-sm text-yellow-700 space-y-2">
                  {startup.riskFactors.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment Terms */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem', 
                color: '#000000',
                display: 'block'
              }}>Investment Terms</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Min Investment:</span>
                  <span className="font-medium text-black">{formatCurrency(startup.investmentTerms.minimumInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Investment:</span>
                  <span className="font-medium text-black">{formatCurrency(startup.investmentTerms.maximumInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Equity Offered:</span>
                  <span className="font-medium text-black">{startup.investmentTerms.equityOffered}%</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Use of Funds</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {startup.investmentTerms.useOfFunds.map((use, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Bid Section */}
              <div className="border-t pt-6">
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  marginBottom: '1rem', 
                  color: '#000000',
                  display: 'block',
                  textAlign: 'center'
                }}>Submit Investment Bid</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Amount
                  </label>
                  <input
                    type="number"
                    min={startup.investmentTerms.minimumInvestment}
                    max={startup.investmentTerms.maximumInvestment}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder={formatCurrency(startup.investmentTerms.minimumInvestment)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Range: {formatCurrency(startup.investmentTerms.minimumInvestment)} - {formatCurrency(startup.investmentTerms.maximumInvestment)}
                  </p>
                </div>

                <Button
                  onClick={handleSubmitBid}
                  disabled={bidAmount < startup.investmentTerms.minimumInvestment || bidAmount > startup.investmentTerms.maximumInvestment || isSubmittingBid}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmittingBid ? 'Submitting...' : `Submit Bid - ${formatCurrency(bidAmount)}`}
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  By submitting, you agree to our investment terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
