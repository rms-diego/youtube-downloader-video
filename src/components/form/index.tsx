'use client';
import { useAppContext } from '@/context/youtubeContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { downloadYoutubeVideo } from '@/services/fetchApi';

export function Form() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const { handleSetYoutubeVideoId } = useAppContext();

  function handleYoutubeUrl({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;

    setYoutubeUrl(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!youtubeUrl) {
      handleSetYoutubeVideoId('');
      return alert('COLOCA A URL ANIMAL');
    }

    const youtubeVideoId = handleSetYoutubeVideoId(youtubeUrl);
    await downloadYoutubeVideo(youtubeVideoId);
    setYoutubeUrl('');
  }

  return (
    <form
      className="flex gap-4"
      onSubmit={handleSubmit}
    >
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
        placeholder="https://www.youtube.com/watch?v=..."
        type="text"
        value={youtubeUrl}
        onChange={handleYoutubeUrl}
      />

      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 border border-black"
        type="submit"
      >
        Download
      </button>
    </form>
  );
}
