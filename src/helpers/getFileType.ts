export const getFileType = (url: string) => {
  if (!url) return 'unknown';

  if (url.startsWith('data:image/svg')) {
    return 'base64';
  }

  if (url.startsWith('data:image')) {
    return 'image';
  }

  const extension = url.split('.').pop()?.toLowerCase() || '';
  const imageExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'bmp',
    'webp',
    'svg',
    'tiff',
  ];
  const videoExtensions = [
    'mp4',
    'webm',
    'ogv',
    'avi',
    'mov',
    'wmv',
    'flv',
    'mkv',
    'm4v',
  ];

  if (imageExtensions.includes(extension)) {
    return 'image';
  } else if (videoExtensions.includes(extension)) {
    return 'video';
  } else {
    return 'image';
  }
};
