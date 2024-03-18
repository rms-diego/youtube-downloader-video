'use client';
import { useAppContext } from '@/context/youtubeContext';

export function EmbedYoutube({ ...rest }) {
  const { youtubeVideoId } = useAppContext();

  return (
    youtubeVideoId && (
      <iframe
        {...rest}
        width={560}
        height={320}
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        title="YouTube video player"
      />
    )
  );
}
