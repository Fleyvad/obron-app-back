import { createClient } from '@supabase/supabase-js';

const bucketURL = process.env.SUPABASE_BUCKET_URL ?? '';
const bucketKey = process.env.SUPABASE_BUCKET_API_KEY ?? '';

export const supabase = createClient(bucketURL, bucketKey);

export const PROJECT_BUCKET_NAME = 'obron-imgs';
