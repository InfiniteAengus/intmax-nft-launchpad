import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { formatLargeNumber } from '@/helpers/formatNumber';
import { replacePinataUrl } from '@/helpers/pinata';
import { shortenAddress } from '@/helpers/shortenAddress';

interface Props {
  collection: Collection;
  className?: string;
}

const CollectionCard: React.FC<Props> = ({ collection, className }) => {
  const router = useRouter();

  const handleItemClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/collection/${collection?.ContractAddress}`);
  };

  const ready = useMemo(
    () => Object.keys(collection).length !== 0,
    [collection]
  );

  return (
    <div
      className={cn(
        'max-w-[500px] overflow-hidden rounded-2xl border border-border bg-componentBackground',
        className
      )}>
      {ready ? (
        <Link
          href={`/collection/${collection?.ContractAddress}`}
          draggable='false'
          onDragStart={(e) => {
            e.preventDefault();
          }}>
          <div
            className='relative m-1 aspect-[1.4] overflow-hidden rounded-xl'
            onClick={handleItemClick}>
            <Image
              src={replacePinataUrl(
                collection.BannerImage || '/images/img_error.png'
              )}
              alt='collection'
              width={300}
              height={300}
              className='h-full w-full object-cover blur-sm'
            />

            <Image
              src={replacePinataUrl(
                collection.ImageUrl || '/images/img_error.png'
              )}
              alt='logo'
              width={50}
              height={50}
              className='aspect-1 absolute left-1/2 top-1/2 z-10 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-border object-cover'
            />
          </div>

          <div className='p-2'>
            <div className='flex justify-between'>
              <div>
                <p className='line-clamp-1 text-xl font-bold'>
                  {collection.CollectionName}
                </p>
                <div className='mt-1 flex items-center gap-2 text-sm font-semibold text-textDescription'>
                  <p>
                    {collection.CreatorInfo
                      ? collection.CreatorInfo.Name
                      : shortenAddress(collection.Wallet)}
                  </p>
                </div>
              </div>
            </div>

            <p className='mt-3 line-clamp-3 min-h-[45px] text-center text-xs text-textDescription'>
              {collection.Description || '<No Desciption>'}
            </p>

            <div className='mt-3 flex items-center justify-around text-center text-sm'>
              <div>
                <p className='font-bold'>{collection.AssetCount || 0}</p>
                <p className='text-textDescription'>Items</p>
              </div>
              <div>
                <p className='font-bold'>
                  {formatLargeNumber(collection.OwnerCount || 0)}
                </p>
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
            <Skeleton
              enableAnimation
              width='100%'
              height='25px'
              className='mt-2'
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionCard;
