import { Link, useLocation } from 'react-router-dom';

export default function BiddingNavigation() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { href: '/investor/bidding', label: 'Overview', description: 'View all bids and statistics' },
    { href: '/investor/bidding/submit', label: 'Submit Bid', description: 'Create a new investment bid' },
    { href: '/investor/bidding/history', label: 'History', description: 'View past bids with filters' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                title={item.description}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
