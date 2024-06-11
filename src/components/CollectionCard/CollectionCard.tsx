import React, { useMemo } from "react";
import cn from "classnames";
import Skeleton from "react-loading-skeleton";

import { formatLargeNumber } from "@/helpers/formatNumber";
import { shortenAddress } from "@/helpers/shortenAddress";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  collection: Collection;
  className?: string;
}

const CollectionCard: React.FC<Props> = ({ collection, className }) => {
  const router = useRouter();

  const handleItemClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/collection/${collection?.ChainId}/${collection?.ContractAddress}`);
  };

  const ready = useMemo(() => Object.keys(collection).length !== 0, [collection]);

  return (
    <div
      className={cn("max-w-[500px] overflow-hidden rounded-2xl border border-border bg-componentBackground", className)}
    >
      {ready ? (
        <Link
          href={`/collection/${collection?.ChainId}/${collection?.ContractAddress}`}
          draggable='false'
          onDragStart={(e) => {
            e.preventDefault();
          }}
        >
          <div className='relative m-1 aspect-[1.4] overflow-hidden rounded-xl' onClick={handleItemClick}>
            <Image
              src={collection.ImageUrl || collection.BannerImage || "/images/img_error.png"}
              alt='collection'
              width={300}
              height={300}
              className='object-cover w-full h-full'
            />
          </div>

          <div className='p-2'>
            <div className='flex justify-between'>
              <div>
                <p className='line-clamp-1 font-bold text-xl'>{collection.CollectionName}</p>
                <div className='mt-1 flex items-center gap-2 text-sm text-textDescription font-semibold'>
                  <p>{collection.CreatorInfo ? collection.CreatorInfo.Name : shortenAddress(collection.Wallet)}</p>
                </div>
              </div>
            </div>

            <p className='mt-3 line-clamp-3 min-h-[55px] text-center text-sm text-textDescription'>
              {collection.Description || "<No Desciption>"}
            </p>

            <div className='mt-3 flex items-center justify-around text-center text-sm'>
              <div>
                <p className='font-bold'>{collection.AssetCount || 0}</p>
                <p className='text-textDescription'>Items</p>
              </div>
              <div>
                <p className='font-bold'>{formatLargeNumber(collection.OwnerCount || 0)}</p>
                <p className='text-textDescription'>Owners</p>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <>
          <div className='aspect-[1.4]'>
            <div className='h-full w-full'>
              <Skeleton enableAnimation width='100%' height='100%' />
            </div>
          </div>
          <div className='p-[0.5rem_1rem]'>
            <Skeleton enableAnimation />
            <Skeleton enableAnimation />
            <Skeleton enableAnimation width='100%' height='50px' />
            <Skeleton enableAnimation width='100%' height='25px' className='mt-2' />
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionCard;
