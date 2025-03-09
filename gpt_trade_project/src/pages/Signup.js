import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/config';
import { useLanguage } from '../context/LanguageContext';
import { uploadProfilePicture } from '../supabase/config';

const Signup = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProfilePicture(file);
      setError('');
    } else {
      setError(language === 'ar' ? 'الرجاء اختيار ملف صورة صالح' : 'Please select a valid image file');
      setProfilePicture(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Register user with Supabase
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });

      console.log('Supabase sign-up response:', { data, signupError });

      if (signupError) throw signupError;

      // Check if user exists before accessing its id property
      if (!data || !data.user) {
        throw new Error('User is undefined after signup');
      }

      const uid = data.user.id;

      // If there's a profile picture, try to upload it but don't block signup if it fails
      if (profilePicture) {
        try {
          // Attempt to upload profile picture but don't throw errors
          const profileUrl = await uploadProfilePicture(profilePicture, uid);
          console.log('Profile picture upload result:', profileUrl);
          
          // Only try to update metadata if we got a URL back
          if (profileUrl) {
            try {
              const { error: updateError } = await supabase.auth.updateUser({
                data: { 
                  profile_picture: profileUrl 
                }
              });

              if (updateError) {
                console.error('Failed to update user metadata:', updateError);
              }
            } catch (metadataError) {
              console.error('Error updating user metadata:', metadataError);
            }
          }
        } catch (uploadError) {
          console.error('Profile picture upload failed:', uploadError);
          // Don't set error, just log it - we want to proceed with signup
        }
      }

      // Proceed with signup regardless of profile picture upload success
      setLoading(false);
      setSuccess(true);
      
      // Redirect to dashboard or home page after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setError(error.message || (language === 'ar' ? 'حدث خطأ أثناء التسجيل' : 'An error occurred during registration'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {language === 'ar' ? 'إنشاء حساب' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'الاسم' : 'Full Name'}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email address'}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'صورة الملف الشخصي' : 'Profile Picture (optional)'}
              </label>
              <div className="mt-1">
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (language === 'ar' ? 'جاري التسجيل...' : 'Creating account...') : (language === 'ar' ? 'إنشاء حساب' : 'Sign up')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
