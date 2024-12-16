import dotenv from 'dotenv';
import { fetchAndGenerateThumbnails } from './youtube/fetchYoutubeVideos.js';
import { updateReadme } from './readme/updateReadme.js';

dotenv.config();

const channelId = process.env.CHANNEL_ID;
const apiKey = process.env.YOUTUBE_API_KEY;

const thumbnails = await fetchAndGenerateThumbnails(channelId, apiKey);
await updateReadme(thumbnails);
