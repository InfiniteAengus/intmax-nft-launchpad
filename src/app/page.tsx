import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div className='container items-center space-y-8 md:space-y-4'>
      <h2 className='text-5xl text-center md:text-4xl'>
        Create, Explore & Collect <br />
        <strong>Digital Art NFTs</strong>
      </h2>
      <p className='text-center text-lg text-textDescription max-w-[800px]'>
        Create and explore digital arts on <strong className='text-white'>Intmax</strong> NFT Launchpad. It&apos;s
        designed for users to easily achieve their goals without worrying about the underlying technology, paving the
        way for widespread adoption.
      </p>
      <Image src='/images/hero.png' alt='Hero' width={400} height={400} />
      <Button>Discover</Button>
    </div>
  );
}
