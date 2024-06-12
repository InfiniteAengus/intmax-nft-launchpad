import Image from 'next/image';

type EmptyContentProps = {
  title?: string;
  imgUrl?: string;
  filled?: boolean;
  description?: string;
  action?: React.ReactNode;
};

export default function EmptyContent({
  title,
  imgUrl,
  action,
  description,
  ...other
}: EmptyContentProps) {
  return (
    <div
      className='flex flex-grow flex-col items-center justify-center px-3'
      {...other}>
      <Image
        alt='empty content'
        src={imgUrl || '/images/empty.svg'}
        width={100}
        height={100}
        className='max-w-[160px]'
      />

      {title && (
        <span className='mt-1 text-center text-lg font-semibold text-white'>
          {title}
        </span>
      )}

      {description && (
        <span className='mt-1 max-w-[420px] text-center text-sm text-textDescription'>
          {description}
        </span>
      )}

      {action && action}
    </div>
  );
}
