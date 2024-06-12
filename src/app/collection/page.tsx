"use client";

import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Link from "next/link";

import CollectionCard from "@/components/CollectionCard";
import EmptyContent from "@/components/EmptyContent";
import Spinner from "@/components/Spinner";
import { GRAPHQL_SERVER } from "@/config/env";
import { allCollectionsWithVariablesQueryDocument } from "@/lib/graphql/queries";

export default function Collection() {
  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => request(GRAPHQL_SERVER, allCollectionsWithVariablesQueryDocument, { first: 10 }),
  });

  return (
    <div className='container items-center space-y-8 md:space-y-4 flex-grow'>
      <h4 className='text-2xl font-bold'>Explore collections</h4>

      {isLoading ? (
        <div className='items-center justify-center flex flex-col space-y-2 flex-grow'>
          <Spinner />
          <p className='text-sm text-textDescription'>Loading collections..</p>
        </div>
      ) : (
        <>
          {data && data.collectionCreateds.length === 0 && (
            <EmptyContent
              title='No Collections'
              description='No collections are minted on this platform. Please create your own new collection'
              action={
                <>
                  <Link
                    href='/create-collection'
                    className='bg-primary rounded-md px-4 py-2 text-background font-bold !mt-8'
                  >
                    Create a collection
                  </Link>
                </>
              }
            />
          )}

          <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-4'>
            {data &&
              data.collectionCreateds.map((collection) => (
                <CollectionCard
                  key={collection.collectionId}
                  className='w-full max-w-[360px]'
                  collection={{
                    AssetCount: 4,
                    BannerImage: collection.banner,
                    ChainId: 1,
                    CollectionName: collection.name,
                    CollectionSymbol: collection.symbol,
                    ContractAddress: collection.collectionId,
                    CreatedAt: "",
                    CreatorInfo: "",
                    Description:
                      "NFT marketplaces are specialized platforms that facilitate the buying, selling, and creation of Non-Fungible Tokens (NFTs), which are unique digital assets representing ownership of distinct and scarce items, both tangible and intangible.",
                    ExternalUrl: "",
                    Id: 123,
                    ImageUrl: collection.logo,
                    OwnerCount: 5,
                    Wallet: "0x0000",
                  }}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
