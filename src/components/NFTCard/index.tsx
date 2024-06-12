import { replacePinataUrl } from "@/helpers/pinata";
import Image from "next/image";

interface Props {
  nft: Record<string, any>;
}

const NFTCard: React.FC<Props> = ({ nft }) => {
  return (
    <div className='bg-componentBackground rounded-2xl p-1 w-full max-w-[320px] overflow-hidden'>
      <div className='relative m-1 aspect-[1.4] overflow-hidden rounded-xl'>
        <Image
          src={replacePinataUrl(nft.image) || "/images/img_error.png"}
          alt='nft'
          width={300}
          height={300}
          className='object-cover w-full h-full'
        />
      </div>
      <p className='px-2 py-2 font-semibold'>{nft.name || "<No Name>"}</p>
      <div className='p-2'>
        <p className='break-words overflow-hidden line-clamp-3 min-h-[45px] text-center text-xs text-textDescription whitespace-break-spaces'>
          {nft.description || "<No Desciption>"}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
