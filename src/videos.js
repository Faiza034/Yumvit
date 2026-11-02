// ====== ADD YOUR VIDEO ADS HERE ======
// Option 1: your own MP4 file. Put it (and an optional poster image) in public/videos/
//   { title: "Yumvit in 15 seconds", src: file("ad1.mp4"), poster: file("ad1.jpg") }
// Option 2: a YouTube video (use the ID from the link: youtube.com/watch?v=THE_ID)
//   { title: "Why parents choose Yumvit", youtube: "THE_ID" }
//   For YouTube Shorts add:  vertical: true
//
// The section hides itself automatically while this list is empty.

const file = (name) => `${import.meta.env.BASE_URL}videos/${name}`;

export const VIDEOS = [
  { title: "Strawberry fun with Yumvit", src: file("ad1.mp4"), poster: file("ad1.jpg") },
  { title: "Meet Yumvit", src: file("ad2.mp4"), poster: file("ad2.jpg") },
  // { title: "Another ad", youtube: "YOUR_YOUTUBE_ID", vertical: true },
];

export { file };
