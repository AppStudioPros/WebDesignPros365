export default function VideoSchema({ videos }: {
  videos: Array<{
    title: string;
    description: string;
    url: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
  }>;
}) {
  const videoObjects = videos.map((video) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.description,
    contentUrl: video.url,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    ...(video.duration && { duration: video.duration }),
    publisher: {
      "@type": "Organization",
      name: "Web Design Pros 365",
      logo: {
        "@type": "ImageObject",
        url: "https://www.webdesignpros365.com/logo.png",
      },
    },
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(videoObjects).replace(/</g, '\\u003c'),
      }}
    />
  );
}
