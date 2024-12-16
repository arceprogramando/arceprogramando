export const fetchLastVideos = async (channelId, apiKey) => {
  try {
    const quantityVideos = 3;
    const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${quantityVideos}`;

    const response = await fetch(endpoint);

    const data = await response.json();

    if (!data || !data.items) throw new Error('No se encontraron videos para el canal especificado.');

    const lastVideos = data.items.map((item) => {
      const videoId = item.id.videoId;
      const thumbnailImageUrl = item.snippet.thumbnails.high.url;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      return { url: videoUrl, thumbnail: thumbnailImageUrl };
    });

    return lastVideos;
  } catch (error) {
    throw new Error('Error al hacer Fetch A los ultimos videos del canal');
  }
};
