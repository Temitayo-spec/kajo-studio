import Image from "next/image";
import logo from "@/svgs/logo.svg";
import { FlipLink } from "./flip-link";

const Header = () => {
  return (
    <nav className="py-12">
      <div className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between">
        <div>
          <Image src={logo} alt="kajo logo" />
        </div>

        <ul className="flex items-center gap-6">
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink href="#">Projects</FlipLink>
          </li>
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink href="#">Services</FlipLink>
          </li>
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink href="/studio">Studio</FlipLink>
          </li>
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink href="#">Journal</FlipLink>
          </li>
        </ul>

        <li className="leading-[100%] font-semibold font-base list-none">
          <FlipLink href="#">Contact</FlipLink>
        </li>
      </div>
    </nav>
  );
};

export default Header;
