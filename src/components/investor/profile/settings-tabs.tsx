import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('password');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<{
    email: boolean;
    phone: boolean;
    identity: boolean;
  }>({
    email: true,
    phone: false,
    identity: false,
  });
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const validatePasswordChange = () => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswordChange()) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Show success message (you can implement a toast notification here)
      alert('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initiateVerification = (type: 'email' | 'phone' | 'identity') => {
    // Simulate starting verification process
    console.log(`Starting ${type} verification`);
    // Update verification status after simulated verification
    setVerificationStatus(prev => ({
      ...prev,
      [type]: true
    }));
  };

  return (    <Card className="overflow-hidden">
      <div className="border-b border-slate-300">
        <nav className="flex -mb-px">
          <button
            onClick={() => handleTabChange('password')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'password'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-600 hover:text-black hover:border-slate-400'
            }`}
          >
            Password
          </button>
          <button
            onClick={() => handleTabChange('verification')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'verification'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-600 hover:text-black hover:border-slate-400'
            }`}
          >
            Account Verification
          </button>
          <button
            onClick={() => handleTabChange('security')}
            className={`py-4 px-6 text-sm font-medium ${
              activeTab === 'security'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-slate-600 hover:text-black hover:border-slate-400'
            }`}
          >
            Security
          </button>
        </nav>
      </div>

      <CardContent className="p-6">
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
                required
              />
              
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                required
              />
              
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </div>
            </div>
          </form>
        )}        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-medium text-black">Email Verification</h3>
                <p className="text-xs text-slate-600">Verify your email address</p>
              </div>
              <div className="flex items-center">
                {verificationStatus.email ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => initiateVerification('email')}
                  >
                    Verify Email
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-medium text-black">Phone Verification</h3>
                <p className="text-xs text-slate-600">Verify your phone number for added security</p>
              </div>
              <div className="flex items-center">
                {verificationStatus.phone ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => initiateVerification('phone')}
                  >
                    Verify Phone
                  </Button>
                )}
              </div>
            </div>
              <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="text-sm font-medium text-black">Identity Verification</h3>
                <p className="text-xs text-slate-600">
                  Verify your identity to unlock higher investment limits
                </p>
              </div>
              <div className="flex items-center">
                {verificationStatus.identity ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Verified
                  </span>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => initiateVerification('identity')}
                  >
                    Verify Identity
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-black mb-2">Two-Factor Authentication</h3>
              <p className="text-xs text-slate-600 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline">
                Enable 2FA
              </Button>
            </div>
            
            <hr />
            
            <div>
              <h3 className="text-sm font-medium text-black mb-2">Active Sessions</h3>
              <p className="text-xs text-slate-600 mb-4">
                Here are the devices that have logged into your account.
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-100 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-black">Current Browser</p>
                    <p className="text-xs text-slate-600">Windows • Chrome • New York, USA</p>
                    <p className="text-xs text-green-600 mt-1">Active now</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-slate-100 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-black">iPhone App</p>
                    <p className="text-xs text-slate-600">iOS • Safari • New York, USA</p>
                    <p className="text-xs text-slate-600 mt-1">Last active: 2 hours ago</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Log Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
