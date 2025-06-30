// Unified startup data that will be used consistently across all features
// This ensures the same 8 startups appear in browse, portfolio, messaging, and bidding

// Import the BidStatus enum for proper typing
import { BidStatus } from '../../types/investor/bidding';
import type { Transaction } from '../../hooks/investor/portfolio/use-portfolio';

export interface UnifiedStartup {
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
  category: string; // For portfolio categorization
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
  valuation: number; // For bidding calculations
  riskLevel: 'Low' | 'Medium' | 'High'; // For portfolio analytics
}

// The 8 unified startups that will appear across all features
export const UNIFIED_STARTUPS: UnifiedStartup[] = [
  {
    id: 'startup-001',
    title: 'TechFlow AI',
    description: 'A cutting-edge AI platform that analyzes sales data, predicts customer behavior, and provides actionable insights to boost revenue by 40%.',
    industry: 'AI/ML',
    category: 'Software',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoType: 'youtube' as const,
    fundingStage: 'series-a',
    fundingNeeded: 2000000,
    currentFunding: 1200000,
    roiProjection: 15.2,
    investmentTimeline: '3-5 years',
    founderName: 'Sarah Johnson',
    founderBio: 'Former data scientist at Google with 10+ years of experience in AI and machine learning.',
    valuation: 8000000,
    riskLevel: 'Medium',
    teamMembers: [
      {
        name: 'Sarah Johnson',
        role: 'CEO & Founder',
        bio: 'Former Google data scientist with expertise in AI/ML',
        linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612c829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      },
      {
        name: 'Mark Chen',
        role: 'CTO',
        bio: 'Full-stack engineer with 8 years at Microsoft',
        linkedinUrl: 'https://linkedin.com/in/markchen',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 500000, expenses: 800000, profit: -300000 },
      { year: 2, revenue: 1500000, expenses: 1000000, profit: 500000 },
      { year: 3, revenue: 4000000, expenses: 2000000, profit: 2000000 },
      { year: 4, revenue: 8000000, expenses: 3500000, profit: 4500000 },
    ],
    marketAnalysis: {
      marketSize: '$50B global sales analytics market growing at 15% CAGR',
      targetMarket: 'Mid-market and enterprise B2B companies with sales teams of 50+',
      competitors: ['Salesforce Analytics', 'HubSpot', 'Pipedrive'],
      competitiveAdvantage: 'Proprietary ML algorithms with 95% prediction accuracy, 10x faster implementation'
    },
    investmentTerms: {
      minimumInvestment: 25000,
      maximumInvestment: 500000,
      equityOffered: 15,
      useOfFunds: ['Product development (40%)', 'Marketing & sales (35%)', 'Team expansion (20%)', 'Operations (5%)']
    },
    riskFactors: [
      'Competitive landscape with established players like Salesforce and HubSpot',
      'Dependency on data quality and availability from customer systems',
      'Potential regulatory changes in data privacy laws (GDPR, CCPA)',
      'Customer acquisition costs in competitive enterprise market',
      'Technology risks related to AI model accuracy and scalability',
      'Key person dependency on founding team members'
    ]
  },
  {
    id: 'startup-002',
    title: 'GreenEnergy Solutions',
    description: 'Vertical farming technology that enables efficient food production in urban environments using 95% less water and 80% less space than traditional farming.',
    industry: 'Agriculture',
    category: 'CleanTech',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=abcdef123456',
    videoType: 'youtube' as const,
    fundingStage: 'seed',
    fundingNeeded: 1500000,
    currentFunding: 400000,
    roiProjection: 12.8,
    investmentTimeline: '4-6 years',
    founderName: 'Michael Chen',
    founderBio: 'Environmental engineer with expertise in sustainable agriculture and urban planning.',
    valuation: 5000000,
    riskLevel: 'High',
    teamMembers: [
      {
        name: 'Michael Chen',
        role: 'CEO & Founder',
        bio: 'Environmental engineer with 12 years in sustainable agriculture',
        linkedinUrl: 'https://linkedin.com/in/michaelchen'
      },
      {
        name: 'Elena Rodriguez',
        role: 'Head of Agriculture',
        bio: 'PhD in Plant Science, former research director at AgTech Corp',
        linkedinUrl: 'https://linkedin.com/in/elenarodriguez'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 200000, expenses: 400000, profit: -200000 },
      { year: 2, revenue: 800000, expenses: 600000, profit: 200000 },
      { year: 3, revenue: 2000000, expenses: 1200000, profit: 800000 },
      { year: 4, revenue: 4500000, expenses: 2500000, profit: 2000000 },
    ],
    marketAnalysis: {
      marketSize: '$12B vertical farming market expected to reach $40B by 2030',
      targetMarket: 'Urban restaurants, grocery chains, and institutional food services',
      competitors: ['AeroFarms', 'Plenty', 'BrightFarms'],
      competitiveAdvantage: 'Patented LED optimization system reduces energy costs by 60%'
    },
    investmentTerms: {
      minimumInvestment: 10000,
      maximumInvestment: 250000,
      equityOffered: 20,
      useOfFunds: ['Equipment & infrastructure (50%)', 'R&D (25%)', 'Marketing (15%)', 'Working capital (10%)']
    },
    riskFactors: [
      'High initial capital requirements for scaling',
      'Energy cost fluctuations affecting profitability',
      'Regulatory approval for food production facilities',
      'Competition from traditional farming subsidies'
    ]
  },
  {
    id: 'startup-003',
    title: 'HealthTech Innovations',
    description: 'Advanced wearable health monitoring device that provides real-time biometric tracking and AI-powered health insights for preventive care.',
    industry: 'Healthcare',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2980&q=80',
    fundingStage: 'series-a',
    fundingNeeded: 3000000,
    currentFunding: 1800000,
    roiProjection: 18.5,
    investmentTimeline: '2-4 years',
    founderName: 'Dr. Lisa Park',
    founderBio: 'Former medical device engineer at Medtronic with 15 years in healthcare technology.',
    valuation: 12000000,
    riskLevel: 'Low',
    teamMembers: [
      {
        name: 'Dr. Lisa Park',
        role: 'CEO & Founder',
        bio: 'Former Medtronic engineer with 15 years in medical devices',
        linkedinUrl: 'https://linkedin.com/in/drlisakpark'
      },
      {
        name: 'James Wilson',
        role: 'VP of Engineering',
        bio: 'Hardware specialist with expertise in wearable technology',
        linkedinUrl: 'https://linkedin.com/in/jameswilson'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 800000, expenses: 1200000, profit: -400000 },
      { year: 2, revenue: 2500000, expenses: 1800000, profit: 700000 },
      { year: 3, revenue: 6000000, expenses: 3000000, profit: 3000000 },
      { year: 4, revenue: 12000000, expenses: 5000000, profit: 7000000 },
    ],
    marketAnalysis: {
      marketSize: '$27B wearable medical devices market growing at 25% CAGR',
      targetMarket: 'Health-conscious consumers, healthcare providers, and insurance companies',
      competitors: ['Apple Watch', 'Fitbit', 'Oura Ring'],
      competitiveAdvantage: 'Medical-grade sensors with FDA approval pathway and proprietary AI algorithms'
    },
    investmentTerms: {
      minimumInvestment: 50000,
      maximumInvestment: 750000,
      equityOffered: 12,
      useOfFunds: ['R&D and product development (45%)', 'Regulatory approval (25%)', 'Manufacturing (20%)', 'Marketing (10%)']
    },
    riskFactors: [
      'FDA regulatory approval timeline uncertainty',
      'Competition from established tech giants',
      'Healthcare data privacy regulations',
      'Manufacturing and supply chain risks'
    ]
  },
  {
    id: 'startup-004',
    title: 'FinTech Pro',
    description: 'Next-generation digital banking platform for SMEs with AI-powered financial management, automated bookkeeping, and integrated lending services.',
    industry: 'Fintech',
    category: 'Financial Technology',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    fundingStage: 'series-b',
    fundingNeeded: 5000000,
    currentFunding: 3500000,
    roiProjection: 22.3,
    investmentTimeline: '3-5 years',
    founderName: 'David Kumar',
    founderBio: 'Former fintech executive at Square with expertise in SME banking solutions.',
    valuation: 25000000,
    riskLevel: 'Medium',
    teamMembers: [
      {
        name: 'David Kumar',
        role: 'CEO & Founder',
        bio: 'Former Square executive with 12 years in fintech',
        linkedinUrl: 'https://linkedin.com/in/davidkumar'
      },
      {
        name: 'Jennifer Liu',
        role: 'Chief Risk Officer',
        bio: 'Former Goldman Sachs risk analyst with expertise in SME lending',
        linkedinUrl: 'https://linkedin.com/in/jenniferliu'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 1200000, expenses: 2000000, profit: -800000 },
      { year: 2, revenue: 3500000, expenses: 2500000, profit: 1000000 },
      { year: 3, revenue: 8000000, expenses: 4000000, profit: 4000000 },
      { year: 4, revenue: 18000000, expenses: 7000000, profit: 11000000 },
    ],
    marketAnalysis: {
      marketSize: '$180B SME banking market with 8% annual growth',
      targetMarket: 'Small and medium enterprises with $1M-$50M annual revenue',
      competitors: ['Brex', 'Mercury', 'Ramp'],
      competitiveAdvantage: 'Integrated lending platform with 80% faster approval times and AI-driven risk assessment'
    },
    investmentTerms: {
      minimumInvestment: 100000,
      maximumInvestment: 1000000,
      equityOffered: 8,
      useOfFunds: ['Technology development (40%)', 'Regulatory compliance (25%)', 'Customer acquisition (20%)', 'Team expansion (15%)']
    },
    riskFactors: [
      'Financial services regulations and compliance requirements',
      'Credit risk in lending operations',
      'Competition from established banks and fintechs',
      'Cybersecurity and data protection risks'
    ]
  },
  {
    id: 'startup-005',
    title: 'CyberShield Security',
    description: 'Advanced cybersecurity platform using AI and machine learning to provide real-time threat detection and automated response for enterprise networks.',
    industry: 'Cybersecurity',
    category: 'Security',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    fundingStage: 'series-a',
    fundingNeeded: 4000000,
    currentFunding: 2200000,
    roiProjection: 19.7,
    investmentTimeline: '3-4 years',
    founderName: 'Alex Rodriguez',
    founderBio: 'Former cybersecurity director at Cisco with 20 years of experience in enterprise security.',
    valuation: 18000000,
    riskLevel: 'Medium',
    teamMembers: [
      {
        name: 'Alex Rodriguez',
        role: 'CEO & Founder',
        bio: 'Former Cisco cybersecurity director with 20 years of experience',
        linkedinUrl: 'https://linkedin.com/in/alexrodriguez'
      },
      {
        name: 'Priya Patel',
        role: 'Chief Technology Officer',
        bio: 'AI/ML expert with focus on security applications',
        linkedinUrl: 'https://linkedin.com/in/priyapatel'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 600000, expenses: 1500000, profit: -900000 },
      { year: 2, revenue: 2200000, expenses: 1800000, profit: 400000 },
      { year: 3, revenue: 5500000, expenses: 3000000, profit: 2500000 },
      { year: 4, revenue: 12000000, expenses: 5000000, profit: 7000000 },
    ],
    marketAnalysis: {
      marketSize: '$156B global cybersecurity market growing at 12% CAGR',
      targetMarket: 'Enterprise companies with 500+ employees and critical data assets',
      competitors: ['CrowdStrike', 'SentinelOne', 'Palo Alto Networks'],
      competitiveAdvantage: 'AI-powered threat prediction with 99.5% accuracy and 50% faster response times'
    },
    investmentTerms: {
      minimumInvestment: 75000,
      maximumInvestment: 800000,
      equityOffered: 10,
      useOfFunds: ['Product development (50%)', 'Sales and marketing (30%)', 'R&D (15%)', 'Operations (5%)']
    },
    riskFactors: [
      'Rapidly evolving cyber threat landscape',
      'Competition from well-funded established players',
      'Technical complexity of enterprise integrations',
      'Regulatory compliance in different jurisdictions'
    ]
  },
  {
    id: 'startup-006',
    title: 'EduTech Analytics',
    description: 'AI-powered educational platform that personalizes learning experiences and provides real-time analytics to improve student outcomes in K-12 education.',
    industry: 'Education',
    category: 'EdTech',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2109&q=80',
    fundingStage: 'seed',
    fundingNeeded: 1800000,
    currentFunding: 750000,
    roiProjection: 16.4,
    investmentTimeline: '4-6 years',
    founderName: 'Maria Gonzalez',
    founderBio: 'Former education technology specialist at Google for Education with 12 years in K-12 solutions.',
    valuation: 7000000,
    riskLevel: 'Medium',
    teamMembers: [
      {
        name: 'Maria Gonzalez',
        role: 'CEO & Founder',
        bio: 'Former Google for Education specialist with 12 years in K-12 tech',
        linkedinUrl: 'https://linkedin.com/in/mariagonzalez'
      },
      {
        name: 'Robert Kim',
        role: 'VP of Product',
        bio: 'Former education researcher with expertise in learning analytics',
        linkedinUrl: 'https://linkedin.com/in/robertkim'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 300000, expenses: 800000, profit: -500000 },
      { year: 2, revenue: 1200000, expenses: 1000000, profit: 200000 },
      { year: 3, revenue: 3200000, expenses: 1800000, profit: 1400000 },
      { year: 4, revenue: 7500000, expenses: 3500000, profit: 4000000 },
    ],
    marketAnalysis: {
      marketSize: '$89B global EdTech market growing at 16% CAGR',
      targetMarket: 'K-12 schools, districts, and educational institutions',
      competitors: ['Khan Academy', 'Coursera', 'Pearson'],
      competitiveAdvantage: 'Proprietary adaptive learning algorithms with 85% improvement in learning outcomes'
    },
    investmentTerms: {
      minimumInvestment: 20000,
      maximumInvestment: 300000,
      equityOffered: 18,
      useOfFunds: ['Product development (40%)', 'Content creation (25%)', 'Sales and marketing (25%)', 'Technology infrastructure (10%)']
    },
    riskFactors: [
      'Long sales cycles with educational institutions',
      'Budget constraints in public education sector',
      'Data privacy regulations in education',
      'Seasonal revenue patterns aligned with school years'
    ]
  },
  {
    id: 'startup-007',
    title: 'BlockChain Supply Co',
    description: 'End-to-end supply chain tracking using blockchain technology to ensure product authenticity and reduce counterfeiting in luxury goods and pharmaceuticals.',
    industry: 'Blockchain',
    category: 'Supply Chain',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    fundingStage: 'pre-seed',
    fundingNeeded: 750000,
    currentFunding: 150000,
    roiProjection: 25.8,
    investmentTimeline: '2-4 years',
    founderName: 'Alex Thompson',
    founderBio: 'Former blockchain engineer at IBM with expertise in supply chain solutions.',
    valuation: 3000000,
    riskLevel: 'High',
    teamMembers: [
      {
        name: 'Alex Thompson',
        role: 'CEO & Founder',
        bio: 'Former IBM blockchain engineer with 8 years in enterprise solutions',
        linkedinUrl: 'https://linkedin.com/in/alexthompson'
      },
      {
        name: 'Sophie Chen',
        role: 'Head of Operations',
        bio: 'Supply chain expert with 10 years at Amazon Logistics',
        linkedinUrl: 'https://linkedin.com/in/sophiechen'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 100000, expenses: 300000, profit: -200000 },
      { year: 2, revenue: 500000, expenses: 400000, profit: 100000 },
      { year: 3, revenue: 1500000, expenses: 800000, profit: 700000 },
      { year: 4, revenue: 4000000, expenses: 1800000, profit: 2200000 },
    ],
    marketAnalysis: {
      marketSize: '$6B supply chain analytics market growing at 18% annually',
      targetMarket: 'Luxury brands, pharmaceutical companies, and food manufacturers',
      competitors: ['VeChain', 'Walmart Blockchain', 'Provenance'],
      competitiveAdvantage: 'Proprietary consensus mechanism 100x faster than traditional blockchain'
    },
    investmentTerms: {
      minimumInvestment: 5000,
      maximumInvestment: 100000,
      equityOffered: 25,
      useOfFunds: ['Technology development (60%)', 'Team hiring (25%)', 'Marketing (15%)']
    },
    riskFactors: [
      'Blockchain technology adoption barriers',
      'Regulatory uncertainty in cryptocurrency space',
      'Integration complexity with existing systems',
      'Market education requirements'
    ]
  },
  {
    id: 'startup-008',
    title: 'BioTech Therapeutics',
    description: 'Innovative gene therapy platform for treating rare genetic diseases using CRISPR technology and personalized medicine approaches.',
    industry: 'Biotech',
    category: 'Biotechnology',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    fundingStage: 'series-a',
    fundingNeeded: 8000000,
    currentFunding: 4500000,
    roiProjection: 28.9,
    investmentTimeline: '7-10 years',
    founderName: 'Dr. Sarah Wilson',
    founderBio: 'Former researcher at Broad Institute with expertise in CRISPR technology and gene therapy.',
    valuation: 35000000,
    riskLevel: 'High',
    teamMembers: [
      {
        name: 'Dr. Sarah Wilson',
        role: 'CEO & Founder',
        bio: 'Former Broad Institute researcher with expertise in CRISPR and gene therapy',
        linkedinUrl: 'https://linkedin.com/in/drsarahwilson'
      },
      {
        name: 'Dr. Michael Patel',
        role: 'Chief Scientific Officer',
        bio: 'Gene therapy specialist with 20 years of pharmaceutical research experience',
        linkedinUrl: 'https://linkedin.com/in/drmichaelpatel'
      }
    ],
    financialProjections: [
      { year: 1, revenue: 0, expenses: 2500000, profit: -2500000 },
      { year: 2, revenue: 500000, expenses: 3000000, profit: -2500000 },
      { year: 3, revenue: 2000000, expenses: 4000000, profit: -2000000 },
      { year: 4, revenue: 8000000, expenses: 5000000, profit: 3000000 },
      { year: 5, revenue: 25000000, expenses: 8000000, profit: 17000000 },
    ],
    marketAnalysis: {
      marketSize: '$8B gene therapy market expected to reach $40B by 2030',
      targetMarket: 'Pharmaceutical companies, healthcare providers, and patients with rare genetic diseases',
      competitors: ['Moderna', 'BioNTech', 'Editas Medicine'],
      competitiveAdvantage: 'Proprietary delivery system with 90% efficiency and reduced off-target effects'
    },
    investmentTerms: {
      minimumInvestment: 250000,
      maximumInvestment: 2000000,
      equityOffered: 6,
      useOfFunds: ['Clinical trials (60%)', 'R&D (25%)', 'Regulatory affairs (10%)', 'Operations (5%)']
    },
    riskFactors: [
      'Lengthy FDA approval process for gene therapies',
      'High clinical trial costs and failure risks',
      'Ethical concerns around genetic modification',
      'Competition from established pharmaceutical companies',
      'Regulatory changes in biotechnology sector'
    ]
  }
];

// Helper functions to get specific data formats for different features
export const getStartupForBrowse = (startup: UnifiedStartup) => ({
  id: startup.id,
  title: startup.title,
  description: startup.description,
  industry: startup.industry,
  imageUrl: startup.imageUrl,
  videoUrl: startup.videoUrl,
  videoType: startup.videoType,
  fundingStage: startup.fundingStage,
  fundingNeeded: startup.fundingNeeded,
  currentFunding: startup.currentFunding,
  roiProjection: startup.roiProjection,
  investmentTimeline: startup.investmentTimeline,
  founderName: startup.founderName,
  founderBio: startup.founderBio,
  teamMembers: startup.teamMembers,
  financialProjections: startup.financialProjections,
  marketAnalysis: startup.marketAnalysis,
  investmentTerms: startup.investmentTerms,
  riskFactors: startup.riskFactors
});

export const getStartupForPortfolio = (startup: UnifiedStartup, investmentAmount: number, currentValueMultiplier: number = 1.1) => ({
  id: `inv-${startup.id}`,
  ideaId: startup.id,
  title: startup.title,
  category: startup.category,
  imageUrl: startup.imageUrl,
  amount: investmentAmount,
  currentValue: Math.round(investmentAmount * currentValueMultiplier),
  date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random date within last year
  status: 'Active' as const,
  roi: Math.round((currentValueMultiplier - 1) * 100 * 10) / 10,
  projectedROI: startup.roiProjection,
  riskLevel: startup.riskLevel,
  transactions: [
    {
      id: `t-${startup.id}`,
      transactionId: `TXN-${startup.id.split('-')[1].toUpperCase()}`,
      ideaId: startup.id,
      ideaName: startup.title,
      amount: investmentAmount,
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      paymentMethod: Math.random() > 0.5 ? 'Bank Transfer' : 'Credit Card',
      status: 'completed' as const,
      type: 'investment' as const,
    }
  ],
});

// More flexible portfolio function that accepts custom options
export const getStartupForPortfolioCustom = (
  startup: UnifiedStartup, 
  options: {
    amount: number;
    currentValue: number;
    date: string;
    status: 'Active' | 'Completed' | 'Pending';
    paymentMethod: string;
    hasReturns?: boolean;
    returnAmount?: number;
    returnDate?: string;
  }
) => {
  const transactions: Transaction[] = [
    {
      id: `t-${startup.id}`,
      transactionId: `TXN-${startup.id.split('-')[1].toUpperCase()}-${Math.round(options.amount / 1000)}K`,
      ideaId: startup.id,
      ideaName: startup.title,
      amount: options.amount,
      date: options.date,
      paymentMethod: options.paymentMethod,
      status: 'completed' as const,
      type: 'investment' as const,
    }
  ];

  // Add return transaction if specified
  if (options.hasReturns && options.returnAmount && options.returnDate) {
    transactions.push({
      id: `t-${startup.id}-return`,
      transactionId: `TXN-${startup.id.split('-')[1].toUpperCase()}-ROI`,
      ideaId: startup.id,
      ideaName: `${startup.title} (Return)`,
      amount: options.returnAmount,
      date: options.returnDate,
      paymentMethod: options.paymentMethod,
      status: 'completed' as const,
      type: 'return' as const,
    });
  }

  const roi = options.amount > 0 ? ((options.currentValue - options.amount) / options.amount) * 100 : 0;

  return {
    id: `inv-${startup.id}`,
    ideaId: startup.id,
    title: startup.title,
    category: startup.category,
    imageUrl: startup.imageUrl,
    amount: options.amount,
    currentValue: options.currentValue,
    date: options.date,
    status: options.status,
    roi: Math.round(roi * 10) / 10,
    projectedROI: startup.roiProjection,
    riskLevel: startup.riskLevel,
    transactions,
  };
};

export const getStartupForMessaging = (startup: UnifiedStartup) => ({
  id: `conv-${startup.id}`,
  startupId: startup.id,
  startupName: startup.title,
  startupCategory: startup.category,
  startupStatus: ['online', 'away', 'offline'][Math.floor(Math.random() * 3)] as 'online' | 'away' | 'offline',
  lastMessage: getRandomMessage(startup),
  lastMessageAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  lastMessageType: Math.random() > 0.8 ? 'file' : 'text' as 'text' | 'file',
  unreadCount: Math.floor(Math.random() * 4),
  isPinned: Math.random() > 0.7,
  hasUnreadMention: Math.random() > 0.8,
  isTyping: Math.random() > 0.9,
  tags: [startup.fundingStage.charAt(0).toUpperCase() + startup.fundingStage.slice(1), startup.category]
});

export const getStartupForBidding = (startup: UnifiedStartup, bidAmount: number) => ({
  id: `bid-${startup.id}`,
  startupId: startup.id,
  startupName: startup.title,
  startupCategory: startup.category,
  investorId: 'inv-001',
  investorName: 'Tech Ventures Capital',
  amount: bidAmount,
  equityPercentage: startup.investmentTerms.equityOffered,
  valuation: startup.valuation,
  status: [BidStatus.PENDING, BidStatus.NEGOTIATING, BidStatus.ACCEPTED, BidStatus.REJECTED][Math.floor(Math.random() * 4)],
  submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  expiresAt: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  dueDiligenceRequirements: [
    'Financial statements (last 3 years)',
    'Customer contracts and revenue pipeline',
    'Intellectual property documentation',
    'Team background checks',
    'Technology architecture review'
  ],
  terms: {
    preferredShares: true,
    boardSeat: bidAmount > 500000,
    liquidationPreference: 1,
    antiDilution: 'weighted-average' as const,
    proRataRights: true,
    tagAlongRights: true,
    dragAlongRights: true,
    votingRights: bidAmount > 250000,
    informationRights: true,
    useOfFunds: startup.investmentTerms.useOfFunds.join(', '),
    milestones: [
      `Achieve revenue targets as outlined in projections`,
      `Expand market presence in target segments`,
      `Build team to support growth objectives`
    ],
    restrictions: [
      'Monthly financial reporting required',
      'Board approval required for major strategic decisions'
    ]
  },
  timeline: {
    dueDiligenceDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    fundingDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    expectedClosing: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    milestoneReviewDates: [
      new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      new Date(Date.now() + 240 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    ]
  },
  negotiations: []
});

// Helper function to generate realistic messages
function getRandomMessage(startup: UnifiedStartup): string {
  const messages = [
    `Thank you for your interest in ${startup.title}. We would love to discuss the opportunity further.`,
    `Here is our updated pitch deck with the financial projections you requested.`,
    `We are excited about the possibility of partnering with you. When would be a good time for a call?`,
    `The due diligence documents are ready for your review.`,
    `We've updated our funding terms based on recent market conditions.`,
    `Our latest product demo is available. Would you like to schedule a presentation?`,
    `We're on track to meet our Q4 milestones as discussed.`,
    `The regulatory approval process is progressing as expected.`
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Export individual startups by ID for easy reference
export const getStartupById = (id: string): UnifiedStartup | undefined => {
  return UNIFIED_STARTUPS.find(startup => startup.id === id);
};

// Export all startup IDs
export const STARTUP_IDS = UNIFIED_STARTUPS.map(startup => startup.id);
