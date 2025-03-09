import { supabase } from '../supabase/config';

const COLLECTION_NAME = "testimonials";

/**
 * Save a new testimonial to Supabase
 * @param {Object} testimonial - The testimonial object to save
 * @param {string} testimonial.name - Name of the person giving testimonial
 * @param {string} testimonial.profession - Profession of the person
 * @param {string} testimonial.photoUrl - URL to the person's photo
 * @param {string} testimonial.quote - The testimonial text
 * @param {string} testimonial.quoteFr - French version of the testimonial (optional)
 * @param {string} testimonial.quoteAr - Arabic version of the testimonial (optional)
 * @param {string} testimonial.nameFr - French version of the name (optional)
 * @param {string} testimonial.nameAr - Arabic version of the name (optional)
 * @param {string} testimonial.professionFr - French version of the profession (optional)
 * @param {string} testimonial.professionAr - Arabic version of the profession (optional)
 * @returns {Promise<Object>} - Result of the operation
 */
export const saveTestimonial = async (testimonial) => {
  try {
    const { data, error } = await supabase
      .from(COLLECTION_NAME)
      .insert([{ ...testimonial, created_at: new Date(), updated_at: new Date() }]);

    if (error) throw error;
    return { 
      success: true, 
      id: data[0].id,
      message: "Testimonial saved successfully" 
    };
  } catch (error) {
    console.error("Error saving testimonial:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to save testimonial" 
    };
  }
};

/**
 * Get all testimonials from Supabase
 * @returns {Promise<Array>} - Array of testimonials
 */
export const getTestimonials = async () => {
  try {
    const { data, error } = await supabase
      .from(COLLECTION_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { 
      success: true, 
      testimonials: data,
      message: "Testimonials retrieved successfully" 
    };
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return { 
      success: false, 
      testimonials: [],
      error: error.message,
      message: "Failed to retrieve testimonials" 
    };
  }
};

/**
 * Update an existing testimonial
 * @param {string} id - ID of the testimonial to update
 * @param {Object} updatedData - New data for the testimonial
 * @returns {Promise<Object>} - Result of the operation
 */
export const updateTestimonial = async (id, updatedData) => {
  try {
    const { data, error } = await supabase
      .from(COLLECTION_NAME)
      .update([{ id, ...updatedData, updated_at: new Date() }]);

    if (error) throw error;
    return { 
      success: true, 
      message: "Testimonial updated successfully" 
    };
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to update testimonial" 
    };
  }
};

/**
 * Delete a testimonial
 * @param {string} id - ID of the testimonial to delete
 * @returns {Promise<Object>} - Result of the operation
 */
export const deleteTestimonial = async (id) => {
  try {
    const { error } = await supabase
      .from(COLLECTION_NAME)
      .delete([id]);

    if (error) throw error;
    return { 
      success: true, 
      message: "Testimonial deleted successfully" 
    };
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return { 
      success: false, 
      error: error.message,
      message: "Failed to delete testimonial" 
    };
  }
};

/**
 * Add a new testimonial to Supabase
 * @param {Object} testimonialData - The testimonial object to add
 * @returns {Promise<Object>} - Result of the operation
 */
export const addTestimonial = async (testimonialData) => {
  try {
    const { ...testimonial } = testimonialData; 

    const { data, error } = await supabase
      .from(COLLECTION_NAME)
      .insert([{ ...testimonial, created_at: new Date() }]); 

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
};