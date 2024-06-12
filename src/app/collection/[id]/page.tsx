'use client';

import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import EmptyContent from '@/components/EmptyContent';
import NFTCard from '@/components/NFTCard';
import Spinner from '@/components/Spinner';
import { GRAPHQL_SERVER } from '@/config/env';
import { replacePinataUrl } from '@/helpers/pinata';
import {
  collectionWithVariablesQueryDocument,
  nftsWithVariablesQueryDocument,
} from '@/lib/graphql/queries';

export default function Collection({ params }: { params: any }) {
  const { data: nfts, isLoading: isNFTsLoading } = useQuery({
    queryKey: ['nfts', params.id],
    queryFn: () => fetchNFTs(params.id),
  });

  const { data, isLoading: isCollectionLoading } = useQuery({
    queryKey: ['collection', params.id],
    queryFn: () =>
      request(GRAPHQL_SERVER, collectionWithVariablesQueryDocument, {
        collectionId: params.id,
      }),
  });

  const collectionData = useMemo(() => {
    return data?.collectionCreateds[0];
  }, [data]);

  const fetchNFTs = async (id: any) => {
    const { minteds } = await request(
      GRAPHQL_SERVER,
      nftsWithVariablesQueryDocument,
      { collectionId: id }
    );

    const updatedMintedData = [...minteds];

    for (let i = 0; i < updatedMintedData.length; i++) {
      const data = await fetch(replacePinataUrl(updatedMintedData[i].tokenURI));
      const metadata = await data.json();
      updatedMintedData[i] = { ...updatedMintedData[i], ...metadata };
    }

    return updatedMintedData;
  };

  return (
    <div className='container flex-grow items-center space-y-8 md:space-y-4'>
      {isNFTsLoading || isCollectionLoading ? (
        <div className='flex flex-grow flex-col items-center justify-center space-y-2'>
          <Spinner />
          <p className='text-sm text-textDescription'>Loading nfts..</p>
        </div>
      ) : (
        <>
          <div className='relative w-full'>
            <Image
              src={replacePinataUrl(collectionData?.banner || '')}
              alt='banner'
              width='100'
              height='100'
              className='h-[200px] w-full rounded-xl object-cover'
            />
            <div className='absolute inset-0 z-0 h-full w-full bg-gradient-linear' />
            <div className='absolute bottom-0 z-10 w-full space-y-4 p-4'>
              <Image
                src={replacePinataUrl(collectionData?.logo || '')}
                alt='logo'
                width={100}
                height={100}
                className='rounded-full border border-white'
              />
              <div>
                <p className='font-bold'>{collectionData?.name}</p>
                <p className='text-textDescription'>Items: {nfts?.length} </p>
              </div>
            </div>

            <div className='absolute bottom-0 right-0 z-10 space-y-4 p-4'>
              <Link
                href={`/collection/${params.id}/mint`}
                className='!mt-8 rounded-md bg-primary px-4 py-2 font-bold text-background'>
                Mint an NFT
              </Link>
            </div>
          </div>

          {nfts && nfts.length === 0 && (
            <EmptyContent
              title='No NFTs found on this collection'
              description='No nfts are minted on this collection. Please mint new nfts'
            />
          )}

          <div className='grid grid-cols-5 gap-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1'>
            {nfts && nfts.map((nft) => <NFTCard nft={nft} key={nft.tokenId} />)}
          </div>
        </>
      )}
    </div>
  );
}
