import { 
  LayoutDashboard, 
  CheckCircle, 
  Users as UsersIcon, 
  CreditCard, 
  User, 
  ListChecks,
  BarChart3,
  Settings,
  ScrollText,
  FileSearch,
  Pencil,
  Gavel,

} from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/adminDashboard' },
    { id: 'verification', label: 'Startup Verification', icon: CheckCircle, path: '/verification' },
    { id: 'users', label: 'Users', icon: UsersIcon, path: '/users' },
    { id: 'payments', label: 'Payments', icon: CreditCard, path: '/payments' },
    { id: 'user-management', label: 'User Management', icon: User, path: '/userManagement' },
    { id: 'moderation-queue', label: 'Approval Queue', icon: ListChecks , path: '/moderationQueue' },
    { id: 'audit-logs', label: 'Audit Logs', icon: ScrollText , path: '/auditLogs' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/adminAnalytics' },
    { id: 'compliance-center', label: 'Compliance Center', icon: Gavel , path: '/complianceCenter' },
    { id: 'settings', label: 'Settings', icon: Settings , path: '/adminSettings' },
   
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-black flex items-center gap-2 select-none tracking-tight drop-shadow">
          Admin Portal
        </h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
