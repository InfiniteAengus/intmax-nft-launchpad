interface Collection {
  AssetCount: number;
  BannerImage: string | null;
  ChainId: number;
  CollectionName: string | null;
  CollectionSymbol: string | null;
  ContractAddress: string;
  CreatedAt: string;
  CreatorInfo: User | null;
  Description: string | null;
  ExternalUrl: string | null;
  Id: number;
  ImageUrl: string | null;
  OwnerCount: number;
  Wallet: string;
}
