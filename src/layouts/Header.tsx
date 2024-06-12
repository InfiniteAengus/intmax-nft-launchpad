import Image from 'next/image';
import Link from 'next/link';

import { ConnectBtn } from '@/components/ConnectButton';

import Logo from '../../public/logo.svg';

const Header = () => {
  return (
    <header
      className='fixed left-1/2 top-4 z-[100] w-[800px] max-w-[calc(100%-32px)] -translate-x-1/2 rounded-full bg-componentBackground py-4 transition-all md:py-2'
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.1) 8px 12px 16px, rgba(0, 0, 0, 0.1) 8px 4px 8px,rgba(0, 0, 0, 0.1) 2px 2px 4px',
      }}>
      <div className='container flex !flex-row items-center justify-between'>
        <Link href='/'>
          <Image
            src={Logo}
            alt='Intmax Logo'
            width={48}
            height={48}
            className='!h-[36px] w-auto md:!h-[24px]'
          />
        </Link>

        <div className='invisible h-[48px] w-[48px] md:hidden' />
        <div className='z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
          <ConnectBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
