import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const youtubeVideoId = searchParams.get('youtubeVideoId');

  if (!youtubeVideoId) {
    const errorResponse = JSON.stringify({
      message: 'must be send youtube url',
    });

    return new NextResponse(errorResponse, { status: 400 });
  }

  const videoInfos = await ytdl.getInfo(
    `http://www.youtube.com/watch?v=${youtubeVideoId}`
  );

  if (videoInfos.videoDetails && videoInfos.videoDetails.isLiveContent) {
    const errorResponse = JSON.stringify({
      message: 'does not suporte live streams',
    });

    return new NextResponse(errorResponse, { status: 400 });
  }

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
    'Content-Disposition': `attachment; filename="${randomUUID()}.mp4"`,
    'Content-Type': 'video/mp4',
  };

  return new NextResponse(videoBuffer, { headers });
}
