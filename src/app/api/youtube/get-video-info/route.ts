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

  const availableQualityDownloads: Array<{ qualityLabel: string }> = [];

  for (const video of videoInfos.formats) {
    if (video.qualityLabel) {
      availableQualityDownloads.push({ qualityLabel: video.qualityLabel });
    }
  }

  const uniqueValuesSet = new Set();
  const uniqueValuesArray: Array<{ qualityLabel: string }> = [];
  for (const availableVideos of availableQualityDownloads) {
    if (!uniqueValuesSet.has(availableVideos.qualityLabel)) {
      uniqueValuesSet.add(availableVideos.qualityLabel);
      uniqueValuesArray.push(availableVideos);
    }
  }

  const biggerThumbnailImageIndex =
    videoInfos.videoDetails.thumbnail.thumbnails.length - 1;

  const videoThumbnail =
    videoInfos.videoDetails.thumbnail.thumbnails[biggerThumbnailImageIndex].url;

  const formatResponse = {
    videoThumbnail,
    availableQualityDownloads: uniqueValuesArray,
  };

  return new NextResponse(JSON.stringify(formatResponse));
}
