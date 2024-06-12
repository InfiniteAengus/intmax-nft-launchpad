import Image from "next/image";
import Logo from "../../public/logo.svg";
import Link from "next/link";
import { ConnectBtn } from "@/components/ConnectButton";

const Header = () => {
  return (
    <header
      className="w-[800px] max-w-[calc(100%-32px)] rounded-full fixed top-4 z-[100] py-4 md:py-2 transition-all bg-componentBackground left-1/2 -translate-x-1/2"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.1) 8px 12px 16px, rgba(0, 0, 0, 0.1) 8px 4px 8px,rgba(0, 0, 0, 0.1) 2px 2px 4px",
      }}
    >
      <div className="container flex !flex-row items-center justify-between">
        <Link href="/">
          <Image
            src={Logo}
            alt="Intmax Logo"
            width={48}
            height={48}
            className="!h-[48px] !w-[48px] md:!h-[32px] md:!w-[32px]"
          />
        </Link>

        <div className="invisible h-[48px] w-[48px] md:hidden" />
        <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <ConnectBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
