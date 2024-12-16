export const fetchChannelPresentationVideo = async (channelId, apiKey) => {
  try {
    const channelEndpoint = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${apiKey}`;
    const channelResponse = await fetch(channelEndpoint);

    if (!channelResponse.ok) throw new Error('Hubo un problema al hacer fetch a la API');

    const channelData = await channelResponse.json();

    if (!channelData || !channelData.items || channelData.items.length === 0)
      throw new Error('No se encontra ron configuraciones de branding para el canal especificado.');

    const brandingSettings = channelData.items[0].brandingSettings;
    const featuredVideoId = brandingSettings.channel.unsubscribedTrailer;

    if (!featuredVideoId) throw new Error('El canal no tiene un video de presentación configurado.');

    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${featuredVideoId}&key=${apiKey}`);
    const videoData = await videoResponse.json();

    if (!videoData || !videoData.items || videoData.items.length === 0) throw new Error('No se encontró el video de presentación del canal.');

    const video = videoData.items[0];
    const thumbnailImageUrl = video.snippet.thumbnails.high.url;
    const videoUrl = `https://www.youtube.com/watch?v=${featuredVideoId}`;
    
    return { url:videoUrl,  thumbnail: thumbnailImageUrl };
  } catch (error) {
    throw new Error(`Error al obtener el video de presentación del canal: ${error.message}`);
  }
};
