import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';

export const configurarFfmpeg = () => {
  if (ffmpegPath && ffprobePath) {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath.path);
    console.log('Caminho do FFmpeg e FFprobe configurados com sucesso.');
  } else {
    console.error('FFmpeg ou FFprobe não foram encontrados. Verifique a instalação.');
  }
}