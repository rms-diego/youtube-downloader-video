'use client';
import { useAppContext } from '@/context/youtubeContext';

export function EmbedYoutube() {
  const { youtubeVideoId } = useAppContext();

  return (
    youtubeVideoId && (
      <iframe
        width={560}
        height={320}
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        title="YouTube video player"
      />
    )
  );
}
