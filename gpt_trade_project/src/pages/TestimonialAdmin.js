import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  saveTestimonial, 
  getTestimonials, 
  updateTestimonial, 
  deleteTestimonial 
} from '../services/testimonialService';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const TestimonialAdmin = () => {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameFr: '',
    nameAr: '',
    profession: '',
    professionFr: '',
    professionAr: '',
    photoUrl: '',
    quote: '',
    quoteFr: '',
    quoteAr: ''
  });

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to fetch testimonials
  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const result = await getTestimonials();
      if (result.success) {
        setTestimonials(result.testimonials);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let result;
      
      if (editingId) {
        // Update existing testimonial
        result = await updateTestimonial(editingId, formData);
        if (result.success) {
          setSuccess("Testimonial updated successfully!");
          setEditingId(null);
        } else {
          setError(result.message);
        }
      } else {
        // Save new testimonial
        result = await saveTestimonial(formData);
        if (result.success) {
          setSuccess("Testimonial added successfully!");
        } else {
          setError(result.message);
        }
      }
      
      // Reset form and refresh testimonials list
      resetForm();
      fetchTestimonials();
    } catch (err) {
      console.error("Error saving testimonial:", err);
      setError("Failed to save testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit testimonial
  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setFormData({
      name: testimonial.name || '',
      nameFr: testimonial.nameFr || '',
      nameAr: testimonial.nameAr || '',
      profession: testimonial.profession || '',
      professionFr: testimonial.professionFr || '',
      professionAr: testimonial.professionAr || '',
      photoUrl: testimonial.photoUrl || '',
      quote: testimonial.quote || '',
      quoteFr: testimonial.quoteFr || '',
      quoteAr: testimonial.quoteAr || ''
    });
  };

  // Handle delete testimonial
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setIsLoading(true);
      try {
        const result = await deleteTestimonial(id);
        if (result.success) {
          setSuccess("Testimonial deleted successfully!");
          fetchTestimonials();
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.error("Error deleting testimonial:", err);
        setError("Failed to delete testimonial");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      nameFr: '',
      nameAr: '',
      profession: '',
      professionFr: '',
      professionAr: '',
      photoUrl: '',
      quote: '',
      quoteFr: '',
      quoteAr: ''
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to main site button */}
        <div className="flex justify-end mb-6">
          <Link 
            to="/" 
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg transition-all duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {language === 'ar' ? 'العودة إلى الموقع الرئيسي' : 'Retour au site principal'}
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {language === 'ar' ? 'إدارة الشهادات' : 'Gestion des Témoignages'}
          </h1>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded mb-6">
            <p>{success}</p>
          </div>
        )}

        {/* Testimonial Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-6">
            {editingId 
              ? (language === 'ar' ? 'تعديل الشهادة' : 'Modifier le témoignage') 
              : (language === 'ar' ? 'إضافة شهادة جديدة' : 'Ajouter un nouveau témoignage')}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Fields */}
              <div>
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'الاسم (الإنجليزية)' : 'Nom (Anglais)'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'الاسم (الفرنسية)' : 'Nom (Français)'}
                </label>
                <input
                  type="text"
                  name="nameFr"
                  value={formData.nameFr}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'الاسم (العربية)' : 'Nom (Arabe)'}
                </label>
                <input
                  type="text"
                  name="nameAr"
                  value={formData.nameAr}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              {/* Profession Fields */}
              <div>
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'المهنة (الإنجليزية)' : 'Profession (Anglais)'}
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'المهنة (الفرنسية)' : 'Profession (Français)'}
                </label>
                <input
                  type="text"
                  name="professionFr"
                  value={formData.professionFr}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'المهنة (العربية)' : 'Profession (Arabe)'}
                </label>
                <input
                  type="text"
                  name="professionAr"
                  value={formData.professionAr}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              {/* Photo URL */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'رابط الصورة' : 'URL de la photo'}
                </label>
                <input
                  type="url"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
              
              {/* Quote Fields */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'الشهادة (الإنجليزية)' : 'Témoignage (Anglais)'}
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white h-24"
                  required
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'الشهادة (الفرنسية)' : 'Témoignage (Français)'}
                </label>
                <textarea
                  name="quoteFr"
                  value={formData.quoteFr}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white h-24"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-2">
                  {language === 'ar' ? 'الشهادة (العربية)' : 'Témoignage (Arabe)'}
                </label>
                <textarea
                  name="quoteAr"
                  value={formData.quoteAr}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-2 text-white h-24"
                ></textarea>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
                >
                  {language === 'ar' ? 'إلغاء' : 'Annuler'}
                </button>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                {isLoading 
                  ? (language === 'ar' ? 'جاري الحفظ...' : 'Enregistrement...') 
                  : editingId 
                    ? (language === 'ar' ? 'تحديث' : 'Mettre à jour') 
                    : (language === 'ar' ? 'حفظ' : 'Enregistrer')}
              </button>
            </div>
          </form>
        </div>

        {/* Testimonials List */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-6">
            {language === 'ar' ? 'قائمة الشهادات' : 'Liste des témoignages'}
          </h2>
          
          {isLoading && !testimonials.length ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-400">
                {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
              </p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {language === 'ar' ? 'لا توجد شهادات حتى الآن' : 'Aucun témoignage pour le moment'}
            </div>
          ) : (
            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-gray-800 rounded-xl p-4"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <img 
                        src={testimonial.photoUrl} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=8B5CF6&color=fff`;
                        }}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-indigo-300">{testimonial.profession}</p>
                      <p className="text-gray-300 mt-2">{testimonial.quote}</p>
                    </div>
                    
                    <div className="flex-shrink-0 ml-4 space-y-2">
                      <button
                        onClick={() => handleEdit(testimonial)}
                        className="block w-full px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        {language === 'ar' ? 'تعديل' : 'Modifier'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="block w-full px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        {language === 'ar' ? 'حذف' : 'Supprimer'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialAdmin; 