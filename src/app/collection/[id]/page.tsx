"use client";

import NFTCard from "@/components/NFTCard";
import { GRAPHQL_SERVER } from "@/config/env";
import { replacePinataUrl } from "@/helpers/pinata";
import { collectionWithVariablesQueryDocument, nftsWithVariablesQueryDocument } from "@/lib/graphql/queries";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Image from "next/image";
import { useMemo } from "react";

export default function Collection({ params }: { params: any }) {
  const {
    data: nfts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["nfts", params.id],
    queryFn: () => fetchNFTs(params.id),
  });

  const { data } = useQuery({
    queryKey: ["collection", params.id],
    queryFn: () => request(GRAPHQL_SERVER, collectionWithVariablesQueryDocument, { collectionId: params.id }),
  });

  const collectionData = useMemo(() => {
    return data?.collectionCreateds[0];
  }, [data]);

  const fetchNFTs = async (id: any) => {
    const { minteds } = await request(GRAPHQL_SERVER, nftsWithVariablesQueryDocument, { collectionId: id });

    const updatedMintedData = [...minteds];

    for (let i = 0; i < updatedMintedData.length; i++) {
      const data = await fetch(replacePinataUrl(updatedMintedData[i].tokenURI));
      const metadata = await data.json();
      updatedMintedData[i] = { ...updatedMintedData[i], ...metadata };
    }

    return updatedMintedData;
  };

  return (
    <div className='container items-center space-y-8 md:space-y-4'>
      <div className='w-full relative'>
        <Image
          src={replacePinataUrl(collectionData?.banner || "")}
          alt='banner'
          width='100'
          height='100'
          className='w-full h-[200px] object-cover rounded-xl'
        />
        <div className='absolute inset-0 h-full w-full z-0 bg-gradient-linear' />
        <div className='absolute z-10 bottom-0 w-full p-4 space-y-4'>
          <Image
            src={replacePinataUrl(collectionData?.logo || "")}
            alt='logo'
            width={100}
            height={100}
            className='rounded-full border border-white'
          />
          <p className='font-bold'>{collectionData?.name}</p>
        </div>
      </div>
      <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-4'>
        {nfts && nfts.map((nft) => <NFTCard nft={nft} key={nft.tokenId} />)}
      </div>
    </div>
  );
}
