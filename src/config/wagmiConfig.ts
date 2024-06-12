'use client';

import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { cookieStorage, createStorage, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';

import { PROJECT_ID } from './env';

const projectId = PROJECT_ID;

const supportedChains: Chain[] = [sepolia];

export const wagmiConfig = getDefaultConfig({
  appName: 'Intmax NFT launchpad',
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
