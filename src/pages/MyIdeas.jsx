import React, { useState } from 'react';
import { 
  Eye, 
  X, 
  DollarSign, 
  Percent, 
  Calendar, 
  FileText, 
  Image, 
  Video, 
  Download,
  Search,
  Filter,
  TrendingUp,
  Users,
  Clock,
  Edit,
  Trash2
} from 'lucide-react';

const MyIdeas = () => {
  // Sample ideas data - in real app this would come from Firebase
  const [ideas] = useState([
    {
      id: 1,
      title: 'Smart Agriculture Platform',
      briefDescription: 'IoT-based smart farming solution for crop monitoring and yield optimization',
      description: 'Our platform combines IoT sensors, AI analytics, and mobile technology to help farmers monitor their crops in real-time. The system tracks soil moisture, temperature, humidity, and other critical factors to optimize irrigation and fertilization. Machine learning algorithms analyze historical data to predict crop yields and suggest optimal planting times. The platform includes a mobile app for farmers to receive alerts and recommendations, and a web dashboard for agricultural consultants to manage multiple farms.',
      image: null,
      shortVideo: null,
      longVideo: null,
      fundingAmount: '100000',
      equityStake: '15',
      additionalDocuments: ['Business Plan.pdf', 'Market Research.docx', 'Financial Projections.xlsx'],
      category: 'AgriTech',
      createdAt: '2025-05-15',
      status: 'Active',
      views: 45,
      interestedInvestors: 12
    },
    {
      id: 2,
      title: 'Health Tracker AI',
      briefDescription: 'AI-powered health monitoring and predictive analytics platform',
      description: 'A comprehensive health monitoring platform that uses wearable devices and AI to track vital signs, analyze health trends, and predict potential health issues. The system integrates with various fitness trackers and health devices to provide real-time monitoring of heart rate, blood pressure, sleep patterns, and activity levels. Our proprietary AI algorithms can detect early signs of health problems and alert users and their healthcare providers. The platform also includes telemedicine features for remote consultations.',
      image: null,
      shortVideo: null,
      longVideo: null,
      fundingAmount: '250000',
      equityStake: '20',
      additionalDocuments: ['Technical Specifications.pdf', 'Regulatory Compliance.pdf'],
      category: 'HealthTech',
      createdAt: '2025-04-20',
      status: 'Under Review',
      views: 78,
      interestedInvestors: 23
    },
    {
      id: 3,
      title: 'EduLearn Pro',
      briefDescription: 'Personalized learning platform with adaptive AI curriculum',
      description: 'An innovative educational platform that adapts to each student\'s learning style and pace. Using advanced AI algorithms, the system creates personalized learning paths, identifies knowledge gaps, and provides targeted exercises to improve understanding. The platform includes interactive content, gamification elements, and progress tracking for both students and teachers. It supports multiple subjects and age groups, from elementary to university level.',
      image: null,
      shortVideo: null,
      longVideo: null,
      fundingAmount: '180000',
      equityStake: '18',
      additionalDocuments: ['Educational Content Strategy.pdf', 'User Research.docx'],
      category: 'EdTech',
      createdAt: '2025-03-10',
      status: 'Draft',
      views: 23,
      interestedInvestors: 8
    },
    {
      id: 4,
      title: 'GreenEnergy Solutions',
      briefDescription: 'Renewable energy storage and distribution system',
      description: 'A revolutionary energy storage system that efficiently captures and distributes renewable energy from solar and wind sources. Our proprietary battery technology offers 40% longer storage capacity compared to existing solutions. The system includes smart grid integration, automated load balancing, and real-time energy trading capabilities. Perfect for residential communities, commercial buildings, and industrial facilities looking to reduce their carbon footprint while saving on energy costs.',
      image: null,
      shortVideo: null,
      longVideo: null,
      fundingAmount: '500000',
      equityStake: '25',
      additionalDocuments: ['Technical Patents.pdf', 'Environmental Impact Study.pdf', 'Prototype Testing Results.xlsx'],
      category: 'CleanTech',
      createdAt: '2025-02-28',
      status: 'Active',
      views: 156,
      interestedInvestors: 34
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.briefDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || idea.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || idea.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalFundingRequested = ideas.reduce((sum, idea) => sum + parseInt(idea.fundingAmount), 0);
  const totalViews = ideas.reduce((sum, idea) => sum + idea.views, 0);
  const totalInterestedInvestors = ideas.reduce((sum, idea) => sum + idea.interestedInvestors, 0);

  const categories = [...new Set(ideas.map(idea => idea.category))];

  const openDetailModal = (idea) => {
    setSelectedIdea(idea);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedIdea(null);
    setShowDetailModal(false);
  };

  const DetailModal = () => {
    if (!selectedIdea) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedIdea.title}</h2>
                <p className="text-gray-600 italic">{selectedIdea.briefDescription}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIdea.status)}`}>
                    {selectedIdea.status}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {selectedIdea.category}
                  </span>
                </div>
              </div>
              <button
                onClick={closeDetailModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-8">
            {/* Funding Information */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Funding Requirements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Funding Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${formatCurrency(selectedIdea.fundingAmount)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Percent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equity Offered</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedIdea.equityStake}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Detailed Description</h3>
              <div className="bg-gray-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedIdea.description}
                </p>
              </div>
            </div>

            {/* Media Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🎬 Media & Presentations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Project Image */}
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Project Image</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedIdea.image ? 'Uploaded' : 'Not uploaded'}
                  </p>
                </div>

                {/* Short Video */}
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Pitch Video</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedIdea.shortVideo ? '1 min video' : 'Not uploaded'}
                  </p>
                </div>

                {/* Long Video */}
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Detailed Presentation</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {selectedIdea.longVideo ? 'Full presentation' : 'Not uploaded'}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents */}
            {selectedIdea.additionalDocuments && selectedIdea.additionalDocuments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Additional Documents</h3>
                <div className="space-y-3">
                  {selectedIdea.additionalDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-medium">{doc}</span>
                      </div>
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Performance Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedIdea.views}</p>
                  <p className="text-sm text-gray-600">Total Views</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedIdea.interestedInvestors}</p>
                  <p className="text-sm text-gray-600">Interested Investors</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-gray-900">{formatDate(selectedIdea.createdAt)}</p>
                  <p className="text-sm text-gray-600">Created</p>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <button
                onClick={closeDetailModal}
                className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <div className="flex gap-3">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">💡 My Ideas</h1>
            <p className="text-gray-600">Manage and track your innovative project ideas</p>
          </div>
          <div className="mt-4 md:mt-0">
          
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Ideas</p>
                <p className="text-2xl font-bold text-gray-900">{ideas.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Funding</p>
                <p className="text-2xl font-bold text-green-600">${formatCurrency(totalFundingRequested)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Interested Investors</p>
                <p className="text-2xl font-bold text-orange-600">{totalInterestedInvestors}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search your ideas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Under Review">Under Review</option>
                <option value="Draft">Draft</option>
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Ideas Grid */}
      {filteredIdeas.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No ideas found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or create your first idea</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div key={idea.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{idea.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{idea.briefDescription}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                      {idea.status}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {idea.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Funding</span>
                  <span className="font-semibold text-green-600">${formatCurrency(idea.fundingAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Equity</span>
                  <span className="font-semibold text-purple-600">{idea.equityStake}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Views</span>
                  <span className="font-semibold text-blue-600">{idea.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Interested</span>
                  <span className="font-semibold text-orange-600">{idea.interestedInvestors}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(idea.createdAt)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openDetailModal(idea)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    View Details
                  </button>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && <DetailModal />}
    </div>
  );
};

export default MyIdeas;