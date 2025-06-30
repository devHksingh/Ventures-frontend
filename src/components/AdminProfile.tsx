import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Lock, KeyRound, Mail, Phone, UserCircle2, Camera, CheckCircle2 } from 'lucide-react';

const AdminProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@company.com',
    phone: '+1 (555) 123-4567',
    role: 'System Administrator',
    avatar: '/placeholder.svg'
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle profile save
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated."
    });
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setProfileData(prev => ({ ...prev, avatar: url }));
    }
  };

  // Handle password change
  const handlePasswordChange = () => {
    setShowPasswordModal(false);
    setPasswords({ current: '', new: '', confirm: '' });
    toast({
      title: "Password Changed",
      description: "Your password has been updated."
    });
  };

  // Handle 2FA toggle
  const handle2FAToggle = () => {
    setTwoFAEnabled(!twoFAEnabled);
    setShow2FAModal(false);
    toast({
      title: twoFAEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFAEnabled
        ? "Two-factor authentication has been disabled."
        : "Two-factor authentication is now enabled."
    });
  };
  return (
    <div className="space-y-10 max-w-3xl mx-auto py-8 px-2">
      <div className="flex items-center gap-4 mb-2">
        <UserCircle2 className="w-10 h-10 text-blue-500" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Profile Settings</h1>
      </div>

      {/* Profile Card */}
      <Card className="shadow-xl border-0 bg-white/90">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <UserCircle2 className="w-6 h-6 text-blue-400" />
              Admin Profile
            </CardTitle>
            <Button 
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Picture Section */}
          <div className="flex items-center space-x-8">
            <div className="relative">
              <Avatar className="w-28 h-28 ring-4 ring-blue-100 shadow-lg">
                <AvatarImage src={avatarPreview || profileData.avatar} alt="Profile" />
                <AvatarFallback className="text-2xl">{profileData.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute bottom-2 right-2 bg-white shadow"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="w-5 h-5 text-blue-500" />
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">Profile Picture</h3>
              <p className="text-gray-500 text-sm">Update your profile photo</p>
              {isEditing && avatarPreview && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setAvatarPreview(null);
                    setProfileData(prev => ({ ...prev, avatar: '/placeholder.svg' }));
                  }}
                >
                  Remove Photo
                </Button>
              )}
            </div>
          </div>

          {/* Profile Information Form */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  autoFocus
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 rounded-md font-medium">
                  {profileData.name}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 rounded-md font-medium">
                  {profileData.email}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 rounded-md font-medium">
                  {profileData.phone}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <div className="py-2 px-3 bg-gray-50 rounded-md text-gray-600 font-medium">
                {profileData.role}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6">
                Save Changes
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="shadow-lg border-0 bg-white/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
            <Button variant="outline" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">
                {twoFAEnabled
                  ? "2FA is enabled for your account"
                  : "Add an extra layer of security"}
              </p>
            </div>
            <Button
              variant={twoFAEnabled ? "default" : "outline"}
              className={twoFAEnabled ? "bg-green-600 text-white" : ""}
              onClick={() => setShow2FAModal(true)}
            >
              {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-blue-400" />
              Change Password
            </h2>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Current Password"
                value={passwords.current}
                onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
              />
              <Input
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={e => setPasswords(p => ({ ...p, new: e.target.value }))}
              />
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
              />
              <div className="flex gap-3 pt-2">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
                  onClick={handlePasswordChange}
                  disabled={
                    !passwords.current ||
                    !passwords.new ||
                    passwords.new !== passwords.confirm
                  }
                >
                  Update Password
                </Button>
                <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              Two-Factor Authentication
            </h2>
            <div className="space-y-4">
              {twoFAEnabled ? (
                <div>
                  <p className="text-gray-700 mb-2">Are you sure you want to disable 2FA?</p>
                  <Button
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6"
                    onClick={handle2FAToggle}
                  >
                    Disable 2FA
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-700 mb-2">
                    Scan the QR code below with your authenticator app, then enter the code to enable 2FA.
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-gray-500 text-sm">QR Code</span>
                    </div>
                  </div>
                  <Input type="text" placeholder="Enter 2FA code" />
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 mt-2"
                    onClick={handle2FAToggle}
                  >
                    Enable 2FA
                  </Button>
                </div>
              )}
              <Button variant="outline" className="mt-2" onClick={() => setShow2FAModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
