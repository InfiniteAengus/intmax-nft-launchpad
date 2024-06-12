import { graphql } from "../gql";

export const allCollectionsWithVariablesQueryDocument = graphql(/* GraphQL */ `
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

export const collectionWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query collectionWithVariablesQuery($collectionId: BigInt!) {
    collectionCreateds(where: { collectionId: $collectionId }) {
      banner
      logo
      collectionId
      name
      symbol
    }
  }
`);

export const nftsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query nftsWithVariablesQuery($collectionId: BigInt!) {
    minteds(where: { collectionId: $collectionId }) {
      collectionId
      tokenId
      owner
      tokenURI
    }
  }
`);
