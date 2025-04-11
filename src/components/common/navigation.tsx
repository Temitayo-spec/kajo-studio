"use client";
import Image from "next/image";
import logo from "@/svgs/logo.svg";
import { FlipLink } from "./flip-link";
import { useTransitionRouter } from "next-view-transitions";
import Link from "next/link";
import { pageAnimation, pageAnimationTwo } from "@/helpers/animation";

const Navigation = ({ isHomePage = false }) => {
  const router = useTransitionRouter();

  const navItems = [
    { label: "Projects", href: "#" },
    { label: "Services", href: "#" },
    { label: "Studio", href: "/studio" },
    { label: "Journal", href: "#" },
  ];

  const NavItem = ({ item }: { item: { label: string; href: string } }) => (
    <li className="leading-[100%] font-semibold font-base">
      <FlipLink
        href={item.href}
        onClick={(e) => {
          e.preventDefault();
          router.push(item.href, {
            onTransitionReady: pageAnimationTwo,
          });
        }}
      >
        {item.label}
      </FlipLink>
    </li>
  );

  if (isHomePage) {
    return (
      <nav className="pt-12 px-[4.5rem] flex items-center justify-between">
        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </ul>

        <li className="leading-[100%] font-semibold font-base list-none">
          <FlipLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push("#", {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Contact
          </FlipLink>
        </li>
      </nav>
    );
  }

  return (
    <nav className="py-12">
      <div className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/", {
              onTransitionReady: pageAnimationTwo,
            });
          }}
        >
          <Image src={logo} alt="kajo logo" />
        </Link>

        <ul className="flex items-center gap-6">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </ul>

        <li className="leading-[100%] font-semibold font-base list-none">
          <FlipLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push("#", {
                onTransitionReady: pageAnimation,
              });
            }}
          >
            Contact
          </FlipLink>
        </li>
      </div>
    </nav>
  );
};

export default Navigation;
