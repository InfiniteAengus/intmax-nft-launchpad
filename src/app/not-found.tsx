import Link from "next/link";

import { NotFoundIcon } from "@/components/icons/not-found";

export default function NotFoundPage() {
  return (
    <div className='container items-center space-y-4 md:space-y-2 !max-w-[450px] text-center my-auto'>
      <h4 className='text-3xl font-bold'>Sorry, Page Not Found!</h4>
      <p className='text-textDescription'>
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
        spelling.
      </p>

      <NotFoundIcon className='h-[260px]' />
      <Link href='/' className='bg-primary rounded-md px-4 py-2 text-background font-bold !mt-8'>
        Go to Homepage
      </Link>
    </div>
  );
}
