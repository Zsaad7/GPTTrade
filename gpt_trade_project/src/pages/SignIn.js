import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/config';
import { useLanguage } from '../context/LanguageContext';

const SignIn = () => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      
      console.log('Email:', email);
      console.log('Password:', password);
      
      // Sign in with Supabase
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (signInError) {
        throw signInError;
      }
      
      console.log('Sign-in successful:', data);
      
      // Redirect to profile page on successful login
      navigate('/profile');
      
    } catch (error) {
      console.error('Sign-in error:', error);
      setError(language === 'ar' ? 'فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور.' : 'Sign-in failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </h2>
        </div>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md shadow-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label className="block text-sm mb-1">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 
                (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...') : 
                (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;