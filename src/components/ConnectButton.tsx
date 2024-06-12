"use client";

import { useEffect, useRef } from "react";
import { useConnectModal, useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
import { middleEllipsis } from "@/lib/utils";
import { WalletIcon } from "./icons/wallet";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(address ?? "");

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        className='btn bg-primary rounded-full p-3 text-background'
        onClick={async () => {
          // Disconnecting wallet first because sometimes when is connected but the user is not connected
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        {isConnecting ? <>...</> : <WalletIcon className='w-5 h-5' />}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className='btn' onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className='max-w-5xl w-full flex items-center justify-between gap-3'>
      <button className='btn' onClick={openChainModal}>
        Switch Networks
      </button>
      <div
        className='flex justify-center items-center p-2 border border-border bg-primary font-mono font-bold gap-x-2 cursor-pointer rounded-full'
        onClick={async () => openAccountModal?.()}
      >
        <div
          role='button'
          tabIndex={1}
          className='h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'
          style={{
            backgroundColor,
            boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
          }}
        >
          {emoji}
        </div>
      </div>
    </div>
  );
};
