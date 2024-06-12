import { PINATA_URL } from '@/config/env';

export const replacePinataUrl = (url: string) => {
  if (!url) {
    return '';
  }

  return url
    .replace('ipfs/', PINATA_URL)
    .replace('ipfs://', PINATA_URL)
    .replace('https://dweb.link/ipfs/', PINATA_URL)
    .replace('https://gateway.ipfs.io/ipfs/', PINATA_URL)
    .replace('https://gateway.pinata.cloud/ipfs/', PINATA_URL)
    .replace(/https:\/\/ipfs.*.*\/ipfs\//g, PINATA_URL)
    .replace(/https:\/\/*.*\.mypinata\.cloud\/ipfs\//g, PINATA_URL)
    .replace(/#/g, '%23');
};

export const isPinataUrl = (url: string) => {
  return (
    url.includes('ipfs/') ||
    url.includes('ipfs://') ||
    url.includes('https://dweb.link/ipfs/') ||
    url.includes('https://gateway.ipfs.io/ipfs/') ||
    url.includes('https://gateway.pinata.cloud/ipfs/') ||
    url.match(/https:\/\/ipfs.*.*\/ipfs\//) ||
    url.match(/https:\/\/*.*\.mypinata\.cloud\/ipfs\//)
  );
};
