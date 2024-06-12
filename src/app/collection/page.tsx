"use client";

import CollectionCard from "@/components/CollectionCard";
import { GRAPHQL_SERVER } from "@/config/env";
import { allCollectionsWithVariablesQueryDocument } from "@/lib/graphql/queries";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export default function Collection() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => request(GRAPHQL_SERVER, allCollectionsWithVariablesQueryDocument, { first: 10 }),
  });

  return (
    <div className='container items-center space-y-8 md:space-y-4'>
      <h4 className='text-2xl font-bold'>Explore collections</h4>

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
    </div>
  );
}
