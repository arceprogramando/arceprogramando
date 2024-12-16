import { fetchChannelPresentationVideo } from './helpers/fetchChannelPresentation.js';
import { fetchLastVideos } from './helpers/fetchLastVideos.js';


export const fetchAndGenerateThumbnails = async (channelId, apiKey) => {
  try {

    if (!channelId && !apiKey) throw new Error('No existe el id del canal ni la apiKey');
    if (!channelId) throw new Error('No existe el id del canal');
    if (!apiKey) throw new Error('No existe la apiKey del canal');

    const presentationVideo = await fetchChannelPresentationVideo(channelId, apiKey);
    const lastVideos = await fetchLastVideos(channelId, apiKey);

    return { presentationVideo, lastVideos };
  } catch (error) {
    throw new Error(`Ocurrió un problema: ${error.message}`);
  }
};
