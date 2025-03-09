import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/config';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaCamera, FaSignOutAlt, FaEdit, FaSave, FaTimes, FaChevronRight } from 'react-icons/fa';

const Profile = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePicture: '',
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        // Get the current user
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;
        
        if (!user) {
          // Redirect to login if not authenticated
          navigate('/signin');
          return;
        }
        
        setUser(user);
        
        // Set profile data from user metadata
        setProfile({
          name: user.user_metadata?.name || '',
          email: user.email || '',
          profilePicture: user.user_metadata?.profile_picture || 'https://via.placeholder.com/150',
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(language === 'ar' ? 'حدث خطأ أثناء تحميل الملف الشخصي' : 'Error loading profile');
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate, language]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setError(language === 'ar' ? 'يجب أن يكون حجم الملف أقل من 2 ميجابايت' : 'File size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png|gif|webp)$/)) {
        setError(language === 'ar' ? 'يجب أن يكون الملف صورة (JPEG، PNG، GIF، أو WEBP)' : 'File must be an image (JPEG, PNG, GIF, or WEBP)');
        return;
      }
      
      setNewProfilePicture(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      setError('');
    }
  };

  const handleNameChange = (e) => {
    setProfile({ ...profile, name: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Update user metadata with new name
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          name: profile.name 
        }
      });
      
      if (updateError) throw updateError;
      
      // If there's a new profile picture, upload it
      if (newProfilePicture) {
        try {
          // Create a unique file name
          const fileExt = newProfilePicture.name.split('.').pop();
          const fileName = `${user.id}_${Date.now()}.${fileExt}`;
          
          // Upload the file
          const { data, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(fileName, newProfilePicture, {
              cacheControl: '3600',
              upsert: true,
              contentType: newProfilePicture.type
            });
          
          if (uploadError) {
            console.error('Profile picture upload error:', uploadError);
            // Continue with profile update even if picture upload fails
          } else {
            // Get the public URL
            const { data: urlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(fileName);
            
            // Update user metadata with new profile picture URL
            await supabase.auth.updateUser({
              data: { 
                profile_picture: urlData.publicUrl 
              }
            });
            
            // Update local state
            setProfile({
              ...profile,
              profilePicture: urlData.publicUrl
            });
            
            // Clear preview and new profile picture
            setPreviewUrl(null);
            setNewProfilePicture(null);
          }
        } catch (uploadError) {
          console.error('Error uploading profile picture:', uploadError);
          // Continue with profile update even if picture upload fails
        }
      }
      
      setSuccess(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully');
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(language === 'ar' ? 'حدث خطأ أثناء تحديث الملف الشخصي' : 'Error updating profile');
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setError(language === 'ar' ? 'حدث خطأ أثناء تسجيل الخروج' : 'Error signing out');
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setNewProfilePicture(null);
    setPreviewUrl(null);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#13547a] to-[#80d0c7] flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative bg-white shadow-lg sm:rounded-3xl p-10">
            <div className="flex flex-col items-center justify-center h-48">
              <div className="w-16 h-16 relative">
                <div className="absolute animate-ping w-16 h-16 rounded-full bg-blue-400 opacity-30"></div>
                <div className="relative animate-pulse w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                  <FaUser className="text-white text-2xl" />
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-800">
                {language === 'ar' ? 'جاري التحميل...' : 'Loading Profile...'}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13547a] to-[#80d0c7] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        
        {/* Main content container */}
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-6">
          {/* Header with profile picture */}
          <div className="flex flex-col items-center pb-6 border-b border-gray-200">
            <div className="relative group">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-28 h-28 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-emerald-500 shadow-xl"
              >
                <img
                  src={previewUrl || profile.profilePicture}
                  alt={language === 'ar' ? 'صورة الملف الشخصي' : 'Profile Picture'}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <label className="w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer group-hover:bg-opacity-70 transition-all duration-300">
                    <FaCamera className="text-white text-2xl" />
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            
            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              {profile.name || (language === 'ar' ? 'مستخدم' : 'User')}
            </h1>
            <p className="text-gray-500">{profile.email}</p>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 flex items-center px-5 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaEdit className="mr-2" />
                {language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}
              </button>
            ) : (
              <div className="text-sm text-blue-500 mt-2">
                {language === 'ar' ? 'وضع التحرير نشط' : 'Edit mode active'}
              </div>
            )}
          </div>
          
          {/* Notifications */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
            >
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="my-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded"
            >
              {success}
            </motion.div>
          )}
          
          {/* Profile form */}
          <div className="mt-6">
            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                {/* Name field */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <FaUser className="mr-2 text-blue-500" />
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={handleNameChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder={language === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                    />
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">
                        {profile.name || (language === 'ar' ? 'لم يتم تعيين' : 'Not set')}
                      </span>
                      <FaChevronRight className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Email field (read-only) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="flex items-center text-gray-700 text-sm font-medium mb-2">
                    <FaEnvelope className="mr-2 text-blue-500" />
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">{profile.email}</span>
                    <span className="text-xs text-gray-500">
                      {language === 'ar' ? 'لا يمكن تغييره' : 'Cannot be changed'}
                    </span>
                  </div>
                </div>
                
                {/* Action buttons */}
                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <FaSave className="mr-2" />
                          {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
                    >
                      <FaTimes className="mr-2" />
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Sign out button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              <FaSignOutAlt className="mr-2 text-red-500" />
              {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
