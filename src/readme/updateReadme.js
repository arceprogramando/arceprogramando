import fs from 'fs/promises';

export const updateReadme = async (data) => {
  try {
    const { presentationVideo, lastVideos } = data;

    let youtubeContent = `<div class="Youtube-Content">
  
# Canal de YouTube

## Video de Presentación

[![Presentación](${presentationVideo.thumbnail})](${presentationVideo.url})

## Últimos Videos de mi [Canal De Youtube](https://www.youtube.com/channel/UC3Dnra3CWle6GRayNRWiS1g)
`;

    lastVideos.forEach((video, index) => {
      youtubeContent += `
<a href='${video.url}' target='_blank'>
  <img width='30%' src='${video.thumbnail}' alt='Últimos videos ${index + 1}' />
</a>`;
    });

    youtubeContent += `
</div>`;

    let readmeContent;

    try {
      readmeContent = await fs.readFile('README.md', 'utf8');
    } catch {
      readmeContent = '';
    }

    const youtubeSectionRegex = /<div class="Youtube-Content">[\s\S]*?<\/div>/;

    if (youtubeSectionRegex.test(readmeContent)) {
      readmeContent = readmeContent.replace(youtubeSectionRegex, youtubeContent);
    } else {
      readmeContent += `${youtubeContent}`;
    }

    await fs.writeFile('README.md', readmeContent, 'utf8');
  } catch (error) {
    throw new Error(`Error al actualizar el README.md: ${error.message}`);
  }
};
