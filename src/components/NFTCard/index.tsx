import Image from 'next/image';

import { replacePinataUrl } from '@/helpers/pinata';

interface Props {
  nft: Record<string, any>;
}

const NFTCard: React.FC<Props> = ({ nft }: Props) => {
  return (
    <div className='w-full max-w-[320px] overflow-hidden rounded-2xl bg-componentBackground p-1'>
      <div className='relative m-1 aspect-[1.4] overflow-hidden rounded-xl'>
        <Image
          src={replacePinataUrl(nft.image) || '/images/img_error.png'}
          alt='nft'
          width={300}
          height={300}
          className='h-full w-full object-cover'
        />
      </div>
      <p className='px-2 py-2 font-semibold'>{nft.name || '<No Name>'}</p>
      <div className='p-2'>
        <p className='line-clamp-3 min-h-[45px] overflow-hidden whitespace-break-spaces break-words text-center text-xs text-textDescription'>
          {nft.description || '<No Desciption>'}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
