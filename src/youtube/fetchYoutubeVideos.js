import { fetchChannelPresentationVideo } from "./helpers/fetchChannelPresentation.js";
import { fetchLastVideos } from "./helpers/fetchLastVideos.js";

// creo y exporto una funcion para recuperar y utilizar las funciones para recuperar el video de presentacion actual y recuperar los ultimos videos

export const fetchAndGenerateThumbnails = async (channelId, apiKey) => {
  try {
    // validaciones para ver si existe el id del canal
    if (!channelId) throw new Error('No existe el id del canal');
    // validaciones para ver si existe la apiKey del canal
    if (!apiKey) throw new Error('No existe la apiKey del canal');

    // creo las constantes donde guardo la espera de la funcion asincrona
    const mainVideo = await fetchChannelPresentationVideo(channelId, apiKey);
    const lastVideos = await fetchLastVideos(channelId, apiKey);

    console.log('llego hasta aca')
    // y retorno las constantes con los datos recuperados en un objeto
    return { mainVideo, lastVideos };
  } catch (error) {
    throw new Error(`Ocurrió un problema: ${error.message}`);
  }
};
