import axios, { AxiosError } from 'axios';

const client = axios.create({
  baseURL: '/api/youtube',
});

export async function downloadYoutubeVideo(videoId: string) {
  try {
    const response = await client.get(
      `/download-video?youtubeVideoId=${videoId}`,
      {
        responseType: 'blob',
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'video.mp4');
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err: AxiosError | any) {
    if (err instanceof AxiosError) {
      return 'Verifique se o link enviado é uma stream ou o video está invalido';
    }
  }
}
