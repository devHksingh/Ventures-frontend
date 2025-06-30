import React, { useState, useEffect } from 'react';
import { Search, Menu, X, TrendingUp, DollarSign, Users, MessageSquare, ChevronRight, Bell, User, PlusCircle, FileText, Handshake, Sidebar } from 'lucide-react';

export const BidStatus = () => {
  const bidStatus = [
    { company: 'Tech Startup Inc.', status: 'Approved', amount: '$50,000', statusColor: 'text-green-600' },
    { company: 'Green Energy Co.', status: 'Pending', amount: '$75,000', statusColor: 'text-yellow-600' },
    { company: 'AI Solutions', status: 'Under Review', amount: '$30,000', statusColor: 'text-blue-600' },
    { company: 'Food Delivery App', status: 'Rejected', amount: '$25,000', statusColor: 'text-red-600' }
  ];

  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bid Status</h3>
        <div className="space-y-4">
          {bidStatus.map((bid, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 text-sm">{bid.company}</p>
                <p className="text-xs text-gray-600">{bid.amount}</p>
              </div>
              <span className={`text-xs font-medium ${bid.statusColor}`}>
                {bid.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};