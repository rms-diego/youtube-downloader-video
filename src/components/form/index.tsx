'use client';
import { useAppContext } from '@/context/youtubeContext';
import { ChangeEvent, FormEvent, useState } from 'react';
import { downloadYoutubeVideo } from '@/services/fetchApi';
import { Spinner } from '../spinner';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

export function Form() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessageAlert, setErrorMessageAlert] = useState<string>('');
  const { handleSetYoutubeVideoId } = useAppContext();

  function handleYoutubeUrl({ target }: ChangeEvent<HTMLInputElement>) {
    const { value } = target;

    setYoutubeUrl(value);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading((prevState) => !prevState);

    if (!youtubeUrl) {
      setIsLoading((prevState) => !prevState);
      handleSetYoutubeVideoId('');
      setErrorMessageAlert('Insira a url para fazer a pesquisa');
      return setShowAlert((prevState) => !prevState);
    }

    if (!youtubeUrl.includes('https://www.youtube.com/watch?v=')) {
      setYoutubeUrl('');
      setIsLoading((prevState) => !prevState);
      setErrorMessageAlert('Url digitada invalida');
      return setShowAlert((prevState) => !prevState);
    }

    const youtubeVideoId = handleSetYoutubeVideoId(youtubeUrl);
    const errorMessage = await downloadYoutubeVideo(youtubeVideoId);

    if (errorMessage) {
      setIsLoading((prevState) => !prevState);
      setErrorMessageAlert(
        'Url inserida pode ser uma live stream ou video invalido'
      );
      return setShowAlert((prevState) => !prevState);
    }

    setYoutubeUrl('');
    setIsLoading((prevState) => !prevState);
  }

  function handleCloseAlert() {
    setErrorMessageAlert('');
    setShowAlert((prevState) => !prevState);
  }

  return (
    <>
      {showAlert && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex justify-between items-center">
            {errorMessageAlert}
            <Button onClick={handleCloseAlert}>Ok</Button>
          </AlertDescription>
        </Alert>
      )}

      {isLoading && <Spinner />}
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
    </>
  );
}
