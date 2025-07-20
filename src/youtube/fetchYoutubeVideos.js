import { fetchChannelPresentationVideo } from './helpers/fetchChannelPresentation.js';
import { fetchLastVideos } from './helpers/fetchLastVideos.js';

export const fetchAndGenerateThumbnails = async (channelId, apiKey) => {
  try {
    if (!channelId || typeof channelId !== 'string' || !channelId.trim()) {
      throw new Error(
        'El id del canal es requerido y debe ser un string válido.'
      );
    }
    if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
      throw new Error('La apiKey es requerida y debe ser un string válido.');
    }

    const [presentationVideo, lastVideos] = await Promise.all([
      fetchChannelPresentationVideo(channelId, apiKey),
      fetchLastVideos(channelId, apiKey),
    ]);

    return { presentationVideo, lastVideos };
  } catch (error) {
    throw new Error(`Ocurrió un problema: ${error.message}`);
  }
};
