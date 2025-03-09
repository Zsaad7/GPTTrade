import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey
  });
}

console.log('Initializing Supabase with URL:', supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize storage bucket
const initializeStorage = async () => {
  try {
    console.log('Checking for existing buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }

    console.log('Existing buckets:', buckets);
    const avatarBucket = buckets?.find(bucket => bucket.name === 'avatars');

    if (!avatarBucket) {
      console.log('Creating avatars bucket...');
      try {
        const { data, error } = await supabase.storage.createBucket('avatars', {
          public: true, // Make bucket public
          fileSizeLimit: 1024 * 1024 * 2 // 2MB
        });
        
        if (error) {
          console.error('Error creating bucket:', error);
          // Continue even if bucket creation fails
          // The bucket might already exist or be created by another process
        } else {
          console.log('Bucket created successfully:', data);
        }
      } catch (err) {
        console.error('Error creating bucket:', err);
        // Continue execution even if bucket creation fails
      }
    }
  } catch (error) {
    console.error('Storage initialization error:', error);
    // Continue execution even if storage initialization fails
  }
};

// Initialize storage immediately
console.log('Starting storage initialization...');
initializeStorage().then(() => {
  console.log('Storage initialization complete');
}).catch(err => {
  console.error('Storage initialization failed:', err);
});

/**
 * Upload a profile picture to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} userId - The user ID to associate with the file
 * @returns {Promise<string>} - The URL of the uploaded file or a placeholder
 */
export const uploadProfilePicture = async (file, userId) => {
  try {
    console.log('Starting profile picture upload:', { userId });
    
    if (!file) {
      console.log('No file provided, returning placeholder');
      return 'https://via.placeholder.com/150';
    }

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    
    console.log('Uploading file:', fileName);
    
    // Try to upload the file to the avatars bucket
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });
      
      if (error) {
        console.error('Upload error:', error);
        // Return placeholder instead of throwing
        return 'https://via.placeholder.com/150';
      }
      
      // Get the public URL for the file
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      console.log('Upload successful, URL:', urlData?.publicUrl);
      return urlData?.publicUrl || 'https://via.placeholder.com/150';
    } catch (uploadError) {
      console.error('Upload attempt failed:', uploadError);
      return 'https://via.placeholder.com/150';
    }
  } catch (error) {
    console.error('Profile picture upload error:', error);
    // Return placeholder instead of throwing
    return 'https://via.placeholder.com/150';
  }
};
