import { Form } from '@/components/form';
import { EmbedYoutube } from '@/components/showEmbed';

export default function Home() {
  return (
    <main className="w-full max-w-3xl h-[100vh] flex justify-center items-center mx-auto px-4">
      <section className="w-full flex flex-col gap-5">
        <section className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Download Youtube Video</h1>
          <p className="text-sm leading-none text-gray-500">
            Adicione a url do video
          </p>

          <Form />
        </section>

        <EmbedYoutube className="self-center" />
      </section>
    </main>
  );
}
