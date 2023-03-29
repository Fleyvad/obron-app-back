import { RequestHandler } from 'express';
import {
  PROJECT_BUCKET_NAME,
  supabase,
} from '../../database/supabase-client.js';
import log from '../../logger.js';

export const supabaseMiddleware: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  { email: string; picture: string }
> = async (req, res, next) => {
  const { email } = res.locals;
  const fileBuffer = req.file?.buffer;
  let projectPicture;

  if (fileBuffer !== undefined) {
    const fileName = `${email}${Date.now()}.webp`;
    const { error } = await supabase.storage
      .from(PROJECT_BUCKET_NAME)
      .upload(fileName, fileBuffer, {
        contentType: 'image/webp',
      });

    if (error === null) {
      const { data } = supabase.storage
        .from(PROJECT_BUCKET_NAME)
        .getPublicUrl(fileName);
      projectPicture = data.publicUrl;
      log.info('Public URL generated', data.publicUrl);

      res.locals.picture = projectPicture;
      log.info(res.locals.picture);
    }
  }

  next();
};
