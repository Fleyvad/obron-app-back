import { createClient } from '@supabase/supabase-js';

const bucketURL = process.env.SUPABASE_BUCKET_URL as string;
const bucketKey = process.env.SUPABASE_BUCKET_API_KEY as string;

export const supabase = createClient(bucketURL, bucketKey);

export const PROJECT_BUCKET_NAME = 'obron-imgs';
