import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const youtubeVideoId = searchParams.get('youtubeVideoId');
  const videoQuality = searchParams.get('videoQuality');

  if (!youtubeVideoId) {
    const errorResponse = JSON.stringify({
      message: 'must be send youtube url',
    });

    return new NextResponse(errorResponse, { status: 400 });
  }

  const videoInfos = await ytdl.getInfo(
    `http://www.youtube.com/watch?v=${youtubeVideoId}`
  );

  const videoOptions: ytdl.chooseFormatOptions = {
    quality: 'highest',
    filter: 'audioandvideo',
  };

  const format = ytdl.chooseFormat(videoInfos.formats, videoOptions);

  const videoStream = ytdl.downloadFromInfo(videoInfos, { format });

  const chunks: Uint8Array[] = [];
  for await (const chunk of videoStream) {
    chunks.push(chunk);
  }
  const videoBuffer = Buffer.concat(chunks);

  const headers = {
    'Content-Disposition': `attachment; filename="video.mp4"`,
    'Content-Type': 'video/mp4',
  };

  return new NextResponse(videoBuffer, { headers });
}
