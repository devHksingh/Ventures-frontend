import { useState, useEffect, useCallback } from 'react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatarUrl?: string;
  investmentPreferences: {
    categories: string[];
    riskTolerance: string;
    minBudget: string;
    maxBudget: string;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  verificationStatus: {
    email: boolean;
    phone: boolean;
    identity: boolean;
  };
}

interface UseProfileOptions {
  initialData?: ProfileData;
}

export function useProfile(options: UseProfileOptions = {}) {
  const { initialData } = options;
  
  const [profile, setProfile] = useState<ProfileData>(
    initialData || {
      name: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      investmentPreferences: {
        categories: [],
        riskTolerance: 'moderate',
        minBudget: '',
        maxBudget: '',
      },
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      verificationStatus: {
        email: false,
        phone: false,
        identity: false,
      },
    }
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mock data
      const mockProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, USA',
        bio: 'Angel investor with 10+ years of experience in tech startups. Passionate about innovative solutions that address real-world problems.',
        avatarUrl: '/avatar.jpg',
        investmentPreferences: {
          categories: ['Software', 'AI', 'Healthcare'],
          riskTolerance: 'moderate',
          minBudget: '10000',
          maxBudget: '50000',
        },
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        verificationStatus: {
          email: true,
          phone: false,
          identity: false,
        },
      };
      
      setProfile(mockProfile);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (newProfile: Partial<ProfileData>) => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...newProfile,
      }));
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while saving'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const updateAvatar = useCallback(async (file: File) => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would upload the file to a server and get a URL back
      const avatarUrl = URL.createObjectURL(file);
      
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatarUrl,
      }));
      
      return avatarUrl;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while uploading'));
      return null;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setIsSaving(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real app, you would send both passwords to a server
      console.log(`Changing password to: ${newPassword}`); // Using newPassword to avoid unused parameter warning
      
      // This is just a mock implementation
      if (currentPassword === 'wrong') {
        throw new Error('Current password is incorrect');
      }
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while changing password'));
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    isSaving,
    error,
    updateProfile,
    updateAvatar,
    changePassword,
    refetch: fetchProfile,
  };
}
