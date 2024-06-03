export const fetchChannelPresentationVideo = async (channelId, apiKey) => {
  try {
    // busco la respuesta de mi canal con mi api y guardo en channelResponse
    const channelEndpoint = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${apiKey}`;
    const channelResponse = await fetch(channelEndpoint);
    // Convierto la respuesta de la API, que está en formato JSON, a un objeto JavaScript
    const channelData = await channelResponse.json();

    // Verificamos si la respuesta de la API contiene datos en el objeto `channelData` y si la propiedad `items` no está vacía.
    // La propiedad `items` debe ser un array con al menos un elemento que contenga las configuraciones de branding del canal.
    // Si cualquiera de estas condiciones no se cumple, lanzamos un error indicando que no se encontraron configuraciones de branding para el canal especificado.
    if (!channelData || !channelData.items || channelData.items.length === 0) throw new Error('No se encontra ron configuraciones de branding para el canal especificado.');

    const brandingSettings = channelData.items[0].brandingSettings;
    const featuredVideoId = brandingSettings.channel.unsubscribedTrailer;

    if (!featuredVideoId) throw new Error('El canal no tiene un video de presentación configurado.');

    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${featuredVideoId}&key=${apiKey}`);
    const videoData = await videoResponse.json();

    if (!videoData || !videoData.items || videoData.items.length === 0) throw new Error('No se encontró el video de presentación del canal.');

    const video = videoData.items[0];
    const thumbnailUrl = video.snippet.thumbnails.high.url;
    const videoUrl = `https://www.youtube.com/watch?v=${featuredVideoId}`;

    return { url: videoUrl, thumbnail: thumbnailUrl };
  } catch (error) {
    throw new Error('Error al obtener el video de presentación del canal.');
  }
};
