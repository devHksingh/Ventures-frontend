import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Sparkles, ShieldCheck, XCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from "react-router-dom";

export const StartupVerification = () => {
  const { toast } = useToast();
  const [startups, setStartups] = useState([
    {
      id: 1,
      startupName: 'TechFlow Solutions',
      founderName: 'Alex Rodriguez',
      email: 'alex@techflow.com',
      submissionDate: '2024-01-15',
      documentsLink: '',
      status: 'pending'
    },
    {
      id: 2,
      startupName: 'AI Innovations',
      founderName: 'Sarah Chen',
      email: 'sarah@aiinnovations.com',
      submissionDate: '2024-01-14',
      documentsLink: '',
      status: 'pending'
    },
    {
      id: 3,
      startupName: 'GreenTech Ventures',
      founderName: 'Michael Thompson',
      email: 'michael@greentech.com',
      submissionDate: '2024-01-13',
      documentsLink: '',
      status: 'pending'
    },
    {
      id: 4,
      startupName: 'Code-Poilet',
      founderName: 'Alex Rodriguez',
      email: 'alex@codepoilet.com',
      submissionDate: '2023-03-13',
      documentsLink: '',
      status: 'pending'
    },
    {
      id: 5,
      startupName: 'Solarize',
      founderName: 'Michael Thompson',
      email: 'michaelthompson@solarize.com',
      submissionDate: '2024-01-15',
      documentsLink: '#',
      status: 'pending'
    }
  ]);

  const handleVerify = (id: number, startupName: string) => {
    setStartups(startups.filter(startup => startup.id !== id));
    toast({
      title: "Startup Verified",
      description: `${startupName} has been successfully verified.`,
    });
  };

  const handleReject = (id: number, startupName: string) => {
    setStartups(startups.filter(startup => startup.id !== id));
    toast({
      title: "Startup Rejected",
      description: `${startupName} has been rejected.`,
      variant: "destructive",
    });
  };
const ProfileCircleButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="fixed top-5 right-7 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white border border-blue-200 shadow hover:bg-blue-50 transition-all"
      onClick={() => navigate("/profile")}
      aria-label="Profile"
      style={{ minWidth: 48, minHeight: 48 }}
    >
      <Avatar className="w-9 h-9">
        <AvatarImage src="/placeholder.svg" alt="Profile" />
        <AvatarFallback>AU</AvatarFallback>
      </Avatar>
    </button>
  );
};
  return (
    <div className="space-y-8 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] min-h-screen px-2 md:px-8 py-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-10 h-10 text-blue-500" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight drop-shadow">
             Startup Verification
          </h1>

        </div>
        
        <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-700 shadow font-semibold rounded-xl">
          {startups.length} Pending
        </Badge>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {startups.map((startup) => (
          <div
            key={startup.id}
            className="relative border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white via-blue-50 to-gray-50"
          >
            <div className="absolute -top-6 right-4 z-10">
              <ShieldCheck className="w-10 h-10 text-blue-200 opacity-40" />
            </div>
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold text-blue-700">{startup.startupName}</span>
                <Badge className="bg-blue-100 text-blue-700 font-semibold">{startup.status}</Badge>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base font-semibold text-gray-800">{startup.founderName}</span>
                <span className="text-xs text-gray-400">{startup.submissionDate}</span>
              </div>
              <div className="text-sm text-gray-500 mb-3">{startup.email}</div>
              <div className="flex items-center gap-2 mb-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-2 py-1 text-xs rounded-lg border-blue-200 hover:border-blue-400"
                  onClick={() => window.open(startup.documentsLink, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Documents
                </Button>
              </div>
              <div className="flex gap-3 mt-auto">
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1 rounded-lg"
                  onClick={() => handleReject(startup.id, startup.startupName)}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow font-semibold flex items-center gap-1 rounded-lg"
                  onClick={() => handleVerify(startup.id, startup.startupName)}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Verify
                </Button>
              </div>
            </div>
          </div>
        ))}

        {startups.length === 0 && (
          <div className="card border rounded-lg shadow-sm bg-white">
            <div className="pricing-block-content py-12 text-center">
              <p className="text-gray-500 text-lg">No startups pending verification</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
