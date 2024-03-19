import axios from 'axios';

const client = axios.create({
  baseURL: '/api/youtube',
});

export async function downloadYoutubeVideo(videoId: string) {
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
}
