export function getVideoId(urlString) {
  const videoUrl = new URL(urlString);
  const urlParameters = new URLSearchParams(videoUrl.search);
  const videoId = urlParameters.get("v");
  return videoId;
}
