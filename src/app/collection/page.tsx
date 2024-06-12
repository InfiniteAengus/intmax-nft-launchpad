"use client";

import CollectionCard from "@/components/CollectionCard/CollectionCard";
import { GRAPHQL_SERVER } from "@/config/env";
import { graphql } from "@/lib/gql";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";
import Image from "next/image";

const allCollectionsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allCollectionsWithVariablesQuery($first: Int!) {
    collectionCreateds(first: $first) {
      banner
      logo
      collectionId
      name
      symbol
    }
  }
`);

export default function Collection() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["all-collection"],
    queryFn: async () => request(GRAPHQL_SERVER, allCollectionsWithVariablesQueryDocument, { first: 10 }),
  });
  console.log(data?.collectionCreateds);

  return (
    <div className="container items-center space-y-8 md:space-y-4">
      <Image src="/images/hero.png" alt="Hero" width={400} height={400} />
      {data &&
        data.collectionCreateds.map((collection) => (
          <CollectionCard
            key={collection.collectionId}
            className="w-full max-w-[360px]"
            collection={{
              AssetCount: 4,
              BannerImage: collection.banner,
              ChainId: 1,
              CollectionName: collection.name,
              CollectionSymbol: collection.symbol,
              ContractAddress: "0x0000",
              CreatedAt: "",
              CreatorInfo: "",
              Description: "",
              ExternalUrl: "",
              Id: 123,
              ImageUrl: "",
              OwnerCount: 5,
              Wallet: "0x0000",
            }}
          />
        ))}
    </div>
  );
}
