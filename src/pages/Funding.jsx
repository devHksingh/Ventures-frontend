import React, { useState } from 'react';
import { 
  Clock, FileText, CheckCircle, Eye, Download, Send, MessageSquare, 
  Check, X, DollarSign, TrendingUp, Calendar, User, Phone, Mail,
  Edit, AlertCircle, Upload, FileSignature
} from 'lucide-react';

const FundingSelectionDashboard = () => {
  const [activeTab, setActiveTab] = useState('bids');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [contractStatus, setContractStatus] = useState({
    1: 'preparing',
    2: 'signing',
    3: 'completed'
  });

  // Sample data
  const [bids, setBids] = useState([
    {
      id: 1,
      investor: 'Sequoia Capital',
      logo: 'https://via.placeholder.com/48?text=SC',
      amount: 5000000,
      equity: 15,
      valuation: 33333333,
      status: 'pending',
      deadline: '2025-06-15',
      terms: {
        boardSeats: 1,
        liquidationPreference: '1x Non-Participating',
        antiDilution: 'Weighted Average',
        proRata: true
      },
      messages: [
        { id: 1, sender: 'investor', content: 'We\'re excited about this opportunity. Can we discuss the board composition?', timestamp: '2025-06-01T10:00:00Z' },
        { id: 2, sender: 'startup', content: 'Absolutely! We\'re open to having you join our board.', timestamp: '2025-06-01T14:30:00Z' }
      ]
    },
    {
      id: 2,
      investor: 'Andreessen Horowitz',
      logo: 'https://via.placeholder.com/48?text=A16Z',
      amount: 4500000,
      equity: 12,
      valuation: 37500000,
      status: 'accepted',
      deadline: '2025-06-20',
      terms: {
        boardSeats: 1,
        liquidationPreference: '1x Participating',
        antiDilution: 'Full Ratchet',
        proRata: true
      },
      messages: [
        { id: 1, sender: 'investor', content: 'Great progress on your metrics! Ready to move forward.', timestamp: '2025-06-01T09:00:00Z' }
      ]
    },
    {
      id: 3,
      investor: 'Benchmark Capital',
      logo: 'https://via.placeholder.com/48?text=BC',
      amount: 3000000,
      equity: 10,
      valuation: 30000000,
      status: 'declined',
      deadline: '2025-06-10',
      terms: {
        boardSeats: 0,
        liquidationPreference: '1x Non-Participating',
        antiDilution: 'Weighted Average',
        proRata: false
      },
      messages: []
    }
  ]);

  const [negotiations, setNegotiations] = useState([
    {
      id: 1,
      bidId: 1,
      investorName: 'Sequoia Capital',
      lastMessage: 'We\'re excited about this opportunity. Can we discuss the board composition?',
      unreadCount: 2,
      lastActivity: '2025-06-01T14:30:00Z'
    },
    {
      id: 2,
      bidId: 2,
      investorName: 'Andreessen Horowitz',
      lastMessage: 'Great progress on your metrics! Ready to move forward.',
      unreadCount: 0,
      lastActivity: '2025-06-01T09:00:00Z'
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleAcceptBid = (bidId) => {
    setBids(bids.map(bid => 
      bid.id === bidId ? { ...bid, status: 'accepted' } : bid
    ));
    setContractStatus(prev => ({ ...prev, [bidId]: 'preparing' }));
  };

  const handleDeclineBid = (bidId) => {
    setBids(bids.map(bid => 
      bid.id === bidId ? { ...bid, status: 'declined' } : bid
    ));
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'startup',
      content: messageInput,
      timestamp: new Date().toISOString()
    };

    setBids(bids.map(bid => 
      bid.id === selectedConversation.bidId 
        ? { ...bid, messages: [...bid.messages, newMessage] }
        : bid
    ));

    setMessageInput('');
  };

  const initiateESignature = (bidId) => {
    setContractStatus(prev => ({ ...prev, [bidId]: 'signing' }));
    // In real implementation, this would integrate with DocuSign API
    alert('E-signature process initiated! Documents sent to all parties.');
  };

  const selectedBid = selectedConversation ? bids.find(bid => bid.id === selectedConversation.bidId) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Funding Selection</h1>
              <p className="mt-2 text-gray-600">Manage investor bids and finalize funding agreements</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {bids.filter(bid => bid.status === 'pending').length} Active Bids
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'bids', label: 'Investor Bids', count: bids.filter(bid => bid.status === 'pending').length },
              { id: 'negotiations', label: 'Negotiations', count: negotiations.filter(n => n.unreadCount > 0).length },
              { id: 'contracts', label: 'Contracts', count: bids.filter(bid => bid.status === 'accepted').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bids Tab */}
        {activeTab === 'bids' && (
          <div className="space-y-6">
            {bids.map((bid) => (
              <div key={bid.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={bid.logo} alt={bid.investor} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{bid.investor}</h3>
                      <p className="text-gray-600">{formatCurrency(bid.amount)} Investment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {formatDate(bid.deadline)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Investment Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(bid.amount)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Equity Percentage</p>
                    <p className="text-lg font-semibold text-gray-900">{bid.equity}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Company Valuation</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(bid.valuation)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Board Seats</p>
                    <p className="text-lg font-semibold text-gray-900">{bid.terms.boardSeats}</p>
                  </div>
                </div>

                

                {bid.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAcceptBid(bid.id)}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Accept Bid
                    </button>
                    
                    <button
                      onClick={() => handleDeclineBid(bid.id)}
                      className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Negotiations Tab */}
        {activeTab === 'negotiations' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversation List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Active Negotiations</h3>
              </div>
              <div className="overflow-y-auto h-full">
                {negotiations.map((negotiation) => (
                  <div
                    key={negotiation.id}
                    onClick={() => setSelectedConversation(negotiation)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation?.id === negotiation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{negotiation.investorName}</h4>
                      {negotiation.unreadCount > 0 && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          {negotiation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{negotiation.lastMessage}</p>
                    <p className="text-xs text-gray-400">{formatDate(negotiation.lastActivity)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Interface */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Message Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{selectedConversation.investorName}</h3>
                          <p className="text-sm text-gray-500">Investment Negotiation</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedBid?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'startup' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'startup'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'startup' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={sendMessage}
                        disabled={!messageInput.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a conversation to start negotiating</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="space-y-6">
            {bids.filter(bid => bid.status === 'accepted').map((bid) => (
              <div key={bid.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img src={bid.logo} alt={bid.investor} className="w-12 h-12 rounded-full" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{bid.investor}</h3>
                      <p className="text-gray-600">{formatCurrency(bid.amount)} Investment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {contractStatus[bid.id] === 'preparing' && (
                      <span className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        <Clock className="w-4 h-4" />
                        Preparing Contract
                      </span>
                    )}
                    {contractStatus[bid.id] === 'signing' && (
                      <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        <FileSignature className="w-4 h-4" />
                        E-Signature in Progress
                      </span>
                    )}
                    {contractStatus[bid.id] === 'completed' && (
                      <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Investment Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(bid.amount)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Equity Percentage</p>
                    <p className="text-lg font-semibold text-gray-900">{bid.equity}%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Company Valuation</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(bid.valuation)}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Contract Documents</h4>
                    {contractStatus[bid.id] === 'preparing' && (
                      <button  
                        onClick={() => initiateESignature(bid.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <FileSignature className="w-4 h-4" />
                        Send for E-Signature
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Investment Agreement</p>
                          <p className="text-sm text-gray-500">Series A Preferred Stock Purchase Agreement</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-400">Last updated: 2 hours ago</span>
                            {contractStatus[bid.id] === 'signing' && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Pending signature from {bid.investor}
                              </span>
                            )}
                            {contractStatus[bid.id] === 'completed' && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Fully executed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        {contractStatus[bid.id] === 'preparing' && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Shareholders Agreement</p>
                          <p className="text-sm text-gray-500">Rights and obligations of shareholders</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-400">Last updated: 1 day ago</span>
                            {contractStatus[bid.id] === 'signing' && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Pending signature from both parties
                              </span>
                            )}
                            {contractStatus[bid.id] === 'completed' && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Fully executed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                        {contractStatus[bid.id] === 'preparing' && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <Edit className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Board Resolution</p>
                          <p className="text-sm text-gray-500">Authorization for stock issuance</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-xs text-gray-400">Generated automatically</span>
                            {contractStatus[bid.id] === 'completed' && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Approved by board
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {contractStatus[bid.id] === 'signing' && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">E-Signature in Progress</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Documents have been sent to all parties via DocuSign. You'll receive notifications as signatures are completed.
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm">
                            <span className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Your signature: Complete
                            </span>
                            <span className="flex items-center gap-2 text-yellow-700">
                              <Clock className="w-4 h-4" />
                              {bid.investor}: Pending
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {contractStatus[bid.id] === 'completed' && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900">Funding Agreement Completed</p>
                          <p className="text-sm text-green-700 mt-1">
                            All parties have signed the investment documents. The funding process is now complete and funds will be transferred according to the agreed timeline.
                          </p>
                          <div className="flex items-center gap-6 mt-3 text-sm">
                            <span className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              All signatures: Complete
                            </span>
                            <span className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Legal review: Approved
                            </span>
                            <span className="flex items-center gap-2 text-green-700">
                              <CheckCircle className="w-4 h-4" />
                              Wire transfer: Initiated
                            </span>
                          </div>
                          <div className="mt-4 pt-3 border-t border-green-200">
                            <p className="text-sm text-green-800 font-medium">Next Steps:</p>
                            <ul className="text-sm text-green-700 mt-2 space-y-1">
                              <li>• Expected fund transfer: Within 2-3 business days</li>
                              <li>• Board seat appointment: Schedule within 30 days</li>
                              <li>• Quarterly reporting: Begins next quarter</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {bids.filter(bid => bid.status === 'accepted').length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No accepted bids yet</p>
                <p className="text-gray-400 text-sm">Contracts will appear here once you accept investor bids</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingSelectionDashboard;