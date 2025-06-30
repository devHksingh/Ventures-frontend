import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  ChevronDown, 
  User, 
  DollarSign, 
  Calendar, 
  Star, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Clock,
  TrendingUp,
  Award,
  Building,
  X,
  Send,
  Eye,
  Users,
  Target,
  Globe,
  Linkedin,
  Twitter
} from 'lucide-react';

const sampleBidsData = [
  {
    ideaId: 1,
    ideaTitle: 'Smart Health Monitoring App',
    bids: [
      {
        id: 101,
        investor: {
          name: 'Rajesh Kumar',
          avatar: '/api/placeholder/40/40',
          company: 'HealthTech Ventures',
          location: 'Mumbai, Maharashtra',
          rating: 4.8,
          totalInvestments: 45,
          portfolio: ['MedTech', 'HealthTech', 'AI'],
          experience: '12 years',
          email: 'rajesh@healthtech.com',
          phone: '+91 98765 43210',
          bio: 'Seasoned investor with 12+ years in healthcare technology. Founded two successful MedTech startups before transitioning to angel investing. Passionate about digital health solutions that improve patient outcomes.',
          linkedin: 'https://linkedin.com/in/rajeshkumar',
          twitter: '@rajeshkumar_vc',
          website: 'https://healthtechventures.com',
          fundSize: '₹50 Cr',
          checkSize: '₹50L - ₹5Cr',
          sectors: ['Healthcare', 'MedTech', 'Digital Health', 'AI/ML'],
          previousInvestments: [
            { company: 'MediAssist', sector: 'HealthTech', exit: 'Acquired by Sequoia' },
            { company: 'CureApp', sector: 'MedTech', exit: 'IPO 2023' },
            { company: 'HealthBot', sector: 'AI Health', exit: 'Series B' }
          ]
        },
        amount: 2500000,
        equity: 15,
        terms: {
          valuation: 16666667,
          boardSeat: true,
          mentorship: true,
          followOnRights: true
        },
        message: 'Great potential in healthcare sector! I bring 12 years of MedTech experience and can provide strategic guidance.',
        status: 'Pending',
        dateSubmitted: '2024-05-15',
        priority: 'High'
      },
      {
        id: 102,
        investor: {
          name: 'Priya Sharma',
          avatar: '/api/placeholder/40/40',
          company: 'Angel Investment Group',
          location: 'Bangalore, Karnataka',
          rating: 4.6,
          totalInvestments: 32,
          portfolio: ['FinTech', 'HealthTech', 'EdTech'],
          experience: '8 years',
          email: 'priya@angelgroup.com',
          phone: '+91 87654 32109',
          bio: 'Former Goldman Sachs analyst turned angel investor. Specializes in early-stage fintech and healthtech investments. Active mentor in multiple accelerator programs.',
          linkedin: 'https://linkedin.com/in/priyasharma',
          twitter: '@priya_invests',
          website: 'https://angelinvestmentgroup.com',
          fundSize: '₹30 Cr',
          checkSize: '₹25L - ₹3Cr',
          sectors: ['FinTech', 'HealthTech', 'EdTech', 'SaaS'],
          previousInvestments: [
            { company: 'PayEasy', sector: 'FinTech', exit: 'Series A' },
            { company: 'LearnMax', sector: 'EdTech', exit: 'Acquired by BYJU\'S' },
            { company: 'HealthSync', sector: 'HealthTech', exit: 'Series B' }
          ]
        },
        amount: 3500000,
        equity: 20,
        terms: {
          valuation: 17500000,
          boardSeat: false,
          mentorship: true,
          followOnRights: true
        },
        message: 'Willing to offer mentorship and connections in healthcare industry. Let\'s discuss partnership terms.',
        status: 'Accepted',
        dateSubmitted: '2024-05-12',
        priority: 'High'
      },
      {
        id: 103,
        investor: {
          name: 'Amit Patel',
          avatar: '/api/placeholder/40/40',
          company: 'TechStart Capital',
          location: 'Pune, Maharashtra',
          rating: 4.2,
          totalInvestments: 28,
          portfolio: ['SaaS', 'HealthTech', 'IoT'],
          experience: '6 years',
          email: 'amit@techstart.com',
          phone: '+91 76543 21098',
          bio: 'Tech entrepreneur turned investor. Built and sold two SaaS companies before starting TechStart Capital. Focuses on B2B software and IoT solutions.',
          linkedin: 'https://linkedin.com/in/amitpatel',
          twitter: '@amittech_vc',
          website: 'https://techstartcapital.com',
          fundSize: '₹20 Cr',
          checkSize: '₹15L - ₹2Cr',
          sectors: ['SaaS', 'B2B Software', 'IoT', 'Enterprise Tech'],
          previousInvestments: [
            { company: 'CloudSync', sector: 'SaaS', exit: 'Series A' },
            { company: 'IoTHub', sector: 'IoT', exit: 'Acquired by TCS' },
            { company: 'DataFlow', sector: 'Enterprise', exit: 'Series B' }
          ]
        },
        amount: 1500000,
        equity: 12,
        terms: {
          valuation: 12500000,
          boardSeat: false,
          mentorship: false,
          followOnRights: false
        },
        message: 'Quick decision maker. Ready to close within 2 weeks.',
        status: 'Pending',
        dateSubmitted: '2024-05-18',
        priority: 'Medium'
      }
    ],
  },
  {
    ideaId: 2,
    ideaTitle: 'AI-Powered Education Platform',
    bids: [
      {
        id: 201,
        investor: {
          name: 'Kavita Singh',
          avatar: '/api/placeholder/40/40',
          company: 'EduInvest Partners',
          location: 'Delhi, NCR',
          rating: 4.9,
          totalInvestments: 52,
          portfolio: ['EdTech', 'AI/ML', 'SaaS'],
          experience: '15 years',
          email: 'kavita@eduinvest.com',
          phone: '+91 65432 10987',
          bio: 'EdTech pioneer with 15+ years of experience. Former VP at Pearson Education. Led digital transformation initiatives across multiple educational institutions.',
          linkedin: 'https://linkedin.com/in/kavitasingh',
          twitter: '@kavita_edutech',
          website: 'https://eduinvestpartners.com',
          fundSize: '₹100 Cr',
          checkSize: '₹1Cr - ₹10Cr',
          sectors: ['EdTech', 'AI/ML', 'SaaS', 'Enterprise Learning'],
          previousInvestments: [
            { company: 'SmartLearn', sector: 'EdTech', exit: 'IPO 2022' },
            { company: 'AITutor', sector: 'AI Education', exit: 'Series C' },
            { company: 'SkillUp', sector: 'Professional Learning', exit: 'Acquired by Coursera' }
          ]
        },
        amount: 5000000,
        equity: 25,
        terms: {
          valuation: 20000000,
          boardSeat: true,
          mentorship: true,
          followOnRights: true
        },
        message: 'EdTech specialist with deep industry connections. Can help with technical infrastructure and market expansion.',
        status: 'Pending',
        dateSubmitted: '2024-05-20',
        priority: 'High'
      },
      {
        id: 202,
        investor: {
          name: 'Suresh Reddy',
          avatar: '/api/placeholder/40/40',
          company: 'Innovation Fund',
          location: 'Hyderabad, Telangana',
          rating: 4.1,
          totalInvestments: 23,
          portfolio: ['AI/ML', 'EdTech', 'Enterprise'],
          experience: '10 years',
          email: 'suresh@innovationfund.com',
          phone: '+91 54321 09876',
          bio: 'AI/ML specialist with strong technical background. Former Google engineer with focus on machine learning applications in education and enterprise software.',
          linkedin: 'https://linkedin.com/in/sureshreddy',
          twitter: '@suresh_ai_vc',
          website: 'https://innovationfund.com',
          fundSize: '₹40 Cr',
          checkSize: '₹50L - ₹4Cr',
          sectors: ['AI/ML', 'Deep Tech', 'EdTech', 'Enterprise AI'],
          previousInvestments: [
            { company: 'MLOps', sector: 'AI/ML', exit: 'Series A' },
            { company: 'AutoLearn', sector: 'EdTech AI', exit: 'Series B' },
            { company: 'DataMind', sector: 'Enterprise AI', exit: 'Acquired by Microsoft' }
          ]
        },
        amount: 1800000,
        equity: 15,
        terms: {
          valuation: 12000000,
          boardSeat: false,
          mentorship: true,
          followOnRights: false
        },
        message: 'Strong background in AI/ML technologies. Lower valuation but quick execution.',
        status: 'Rejected',
        dateSubmitted: '2024-05-14',
        priority: 'Low'
      },
    ],
  },
];

const BidReview = () => {
  const [bidsData] = useState(sampleBidsData);
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortBy, setSortBy] = useState('amount');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: ''
  });
  const [filters, setFilters] = useState({
    minAmount: '',
    maxAmount: '',
    minEquity: '',
    maxEquity: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    priority: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Get all bids from all projects
  const allBids = useMemo(() => {
    return bidsData.flatMap(project => 
      project.bids.map(bid => ({
        ...bid,
        projectTitle: project.ideaTitle,
        projectId: project.ideaId
      }))
    );
  }, [bidsData]);

  // Apply filters and sorting
  const filteredAndSortedBids = useMemo(() => {
    let filtered = allBids.filter(bid => {
      const matchesAmount = (!filters.minAmount || bid.amount >= parseInt(filters.minAmount)) &&
                           (!filters.maxAmount || bid.amount <= parseInt(filters.maxAmount));
      const matchesEquity = (!filters.minEquity || bid.equity >= parseInt(filters.minEquity)) &&
                           (!filters.maxEquity || bid.equity <= parseInt(filters.maxEquity));
      const matchesStatus = !filters.status || bid.status === filters.status;
      const matchesPriority = !filters.priority || bid.priority === filters.priority;
      
      const bidDate = new Date(bid.dateSubmitted);
      const matchesDateFrom = !filters.dateFrom || bidDate >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || bidDate <= new Date(filters.dateTo);

      return matchesAmount && matchesEquity && matchesStatus && matchesPriority && 
             matchesDateFrom && matchesDateTo;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'equity':
          aValue = a.equity;
          bValue = b.equity;
          break;
        case 'date':
          aValue = new Date(a.dateSubmitted);
          bValue = new Date(b.dateSubmitted);
          break;
        case 'rating':
          aValue = a.investor.rating;
          bValue = b.investor.rating;
          break;
        case 'valuation':
          aValue = a.terms.valuation;
          bValue = b.terms.valuation;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [allBids, filters, sortBy, sortOrder]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Accepted':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const clearFilters = () => {
    setFilters({
      minAmount: '',
      maxAmount: '',
      minEquity: '',
      maxEquity: '',
      status: '',
      dateFrom: '',
      dateTo: '',
      priority: ''
    });
  };

  const handleViewProfile = (investor) => {
    setSelectedInvestor(investor);
    setShowProfileModal(true);
  };

  const handleContact = (investor) => {
    setSelectedInvestor(investor);
    setContactForm({
      subject: `Investment Opportunity - ${investor.name}`,
      message: `Hi ${investor.name},\n\nI would like to discuss the investment opportunity you proposed. I'm interested in learning more about your terms and how we can move forward.\n\nLooking forward to hearing from you.\n\nBest regards`
    });
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    // In a real app, this would send an email or message
    alert(`Message sent to ${selectedInvestor.name}!\n\nSubject: ${contactForm.subject}\n\nMessage: ${contactForm.message}`);
    setShowContactModal(false);
    setContactForm({ subject: '', message: '' });
  };

  const closeModals = () => {
    setShowProfileModal(false);
    setShowContactModal(false);
    setSelectedInvestor(null);
  };

  // Profile Modal Component
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {selectedInvestor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedInvestor.name}</h2>
              <p className="text-gray-600">{selectedInvestor.company}</p>
            </div>
          </div>
          <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-gray-500" size={20} />
                <span>{selectedInvestor.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="text-yellow-500" size={20} />
                <span>{selectedInvestor.rating}/5 Rating</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="text-gray-500" size={20} />
                <span>{selectedInvestor.totalInvestments} Total Investments</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="text-gray-500" size={20} />
                <span>{selectedInvestor.experience} Experience</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="text-green-500" size={20} />
                <span>Fund Size: {selectedInvestor.fundSize}</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="text-blue-500" size={20} />
                <span>Check Size: {selectedInvestor.checkSize}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-gray-500" size={20} />
                <span>{selectedInvestor.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gray-500" size={20} />
                <span>{selectedInvestor.phone}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <User size={20} />
              About
            </h3>
            <p className="text-gray-700 leading-relaxed">{selectedInvestor.bio}</p>
          </div>

          {/* Investment Sectors */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Target size={20} />
              Investment Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedInvestor.sectors.map((sector, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Previous Investments */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Award size={20} />
              Notable Investments
            </h3>
            <div className="grid gap-4">
              {selectedInvestor.previousInvestments.map((investment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{investment.company}</h4>
                    <p className="text-gray-600">{investment.sector}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {investment.exit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Globe size={20} />
              Connect
            </h3>
            <div className="flex gap-4">
              <a href={selectedInvestor.linkedin} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                <Twitter size={16} />
                {selectedInvestor.twitter}
              </a>
              <a href={selectedInvestor.website} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <Globe size={16} />
                Website
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button 
              onClick={() => handleContact(selectedInvestor)}
              className="flex-1 px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Contact Investor
            </button>
            <button 
              onClick={closeModals}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Modal Component
  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full">
        {/* Modal Header */}
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Contact {selectedInvestor.name}</h2>
            <p className="text-gray-600">{selectedInvestor.company}</p>
          </div>
          <button onClick={closeModals} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter subject"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows={8}
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your message"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Investor Contact Details</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{selectedInvestor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{selectedInvestor.phone}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleSendMessage}
              className="flex-1 px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={16} />
              Send Message
            </button>
            <button 
              onClick={closeModals}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BidCard = ({ bid }) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white">
      {/* Bid Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 flex justify-between items-start">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 font-semibold mb-1">{bid.investor.name}</h4>
            <p className="text-gray-600 text-sm mb-2">{bid.investor.company}</p>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <MapPin size={12} />
              <span>{bid.investor.location}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="block text-gray-600 text-sm mb-1">Investment</span>
          <span className="block text-2xl font-bold text-green-600 mb-1">{formatCurrency(bid.amount)}</span>
          <span className="block text-gray-900 font-medium">{bid.equity}% equity</span>
        </div>
      </div>

      {/* Bid Details */}
      <div className="p-6">
        <div className="flex flex-wrap gap-6 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Valuation: {formatCurrency(bid.terms.valuation)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={16} />
            <span>Rating: {bid.investor.rating}/5</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase size={16} />
            <span>{bid.investor.totalInvestments} investments</span>
          </div>
        </div>

        {/* Terms & Benefits */}
        <div className="mb-4">
          <h5 className="text-gray-900 font-semibold text-sm mb-2">Terms & Benefits</h5>
          <div className="flex flex-wrap gap-2">
            {bid.terms.boardSeat && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Board Seat
              </span>
            )}
            {bid.terms.mentorship && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Mentorship
              </span>
            )}
            {bid.terms.followOnRights && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                Follow-on Rights
              </span>
            )}
          </div>
        </div>

        {/* Portfolio Focus */}
        <div className="mb-4">
          <h5 className="text-gray-900 font-semibold text-sm mb-2">Portfolio Focus</h5>
          <div className="flex flex-wrap gap-2">
            {bid.investor.portfolio.map((area, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Investor Message */}
        <div className="mb-4">
          <h5 className="text-gray-900 font-semibold text-sm mb-2">Investor Message</h5>
          <p className="text-gray-700 leading-relaxed">{bid.message}</p>
        </div>

        {/* Bid Footer */}
        <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bid.status)}`}>
              {bid.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(bid.priority)}`}>
              {bid.priority} Priority
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Calendar size={14} />
            <span>{formatDate(bid.dateSubmitted)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => handleViewProfile(bid.investor)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <Eye size={16} />
            View Profile
          </button>
          <button 
            onClick={() => handleContact(bid.investor)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
          >
            <Mail size={16} />
            Contact
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 min-h-screen font-sans">
      {/* Header */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-4xl font-bold mb-2">💰 Investor Bids</h1>
        <p className="text-lg opacity-90">Review and manage investor proposals for your projects</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded-xl mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="amount">Investment Amount</option>
              <option value="equity">Equity %</option>
              <option value="date">Date Submitted</option>
              <option value="rating">Investor Rating</option>
              <option value="valuation">Valuation</option>
            </select>
          </div>
          <button 
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowUpDown size={16} />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors"
        >
          <Filter size={16} />
          Filters
          <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-xl mb-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Investment Amount</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min amount"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max amount"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Equity %</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min %"
                  value={filters.minEquity}
                  onChange={(e) => setFilters({...filters, minEquity: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max %"
                  value={filters.maxEquity}
                  onChange={(e) => setFilters({...filters, maxEquity: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-gray-700 mb-2">Date Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button onClick={clearFilters} className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
              Clear All
            </button>
            <span className="text-gray-600 font-medium">
              {filteredAndSortedBids.length} bid{filteredAndSortedBids.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      )}

      {/* Bids Content */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        {filteredAndSortedBids.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <DollarSign size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No bids found</h3>
            <p>Try adjusting your filters or check back later for new investor proposals.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredAndSortedBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showProfileModal && selectedInvestor && <ProfileModal />}
      {showContactModal && selectedInvestor && <ContactModal />}
    </div>
  );
};

export default BidReview;