import fs from 'fs/promises';

export const updateReadme = async (data) => {
  try {
    const { mainVideo, lastVideos } = data;

    let youtubeContent = `<div class="Youtube-Content">

# Canal de YouTube - Video de Presentación

<a href='${mainVideo.url}' target='_blank'>
  <img width='40%' src='${mainVideo.thumbnail}' alt='Video Presentación' />
</a>

## Últimos Videos de mi [canal de youtube](https://www.youtube.com/channel/UC3Dnra3CWle6GRayNRWiS1g)
`;

    lastVideos.forEach((video, index) => {
      youtubeContent += `
<a href='${video.url}' target='_blank'>
  <img width='30%' src='${video.thumbnail}' alt='Últimos videos ${index + 1}' />
</a>`;
    });

    youtubeContent += `
</div>`;

    let readmeContent = await fs.readFile('README.md', 'utf8');

    const youtubeSectionRegex = /<div class="Youtube-Content">[\s\S]*?<\/div>/;
    if (youtubeSectionRegex.test(readmeContent)) {
      readmeContent = readmeContent.replace(youtubeSectionRegex, youtubeContent);
    } else {
      readmeContent += `\n${youtubeContent}`;
    }

    await fs.writeFile('README.md', readmeContent, 'utf8');
    console.log('README.md actualizado exitosamente');
  } catch (error) {
    throw new Error('Error al actualizar el README.md');
  }
};
