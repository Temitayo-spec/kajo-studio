'use client';
import Image from "next/image";
import logo from "@/svgs/logo.svg";
import { FlipLink } from "./flip-link";
import { useTransitionRouter } from "next-view-transitions";

const Header = () => {
  const router = useTransitionRouter();

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1500,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  return (
    <nav className="py-12">
      <div className="w-[90%] max-w-[1440px] mx-auto flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            router.push("/", {
              onTransitionReady: slideInOut,
            });
          }}
        >
          <Image src={logo} alt="kajo logo" />
        </a>

        <ul className="flex items-center gap-6">
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
              Projects
            </FlipLink>
          </li>
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
              Services
            </FlipLink>
          </li>
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink
              href="/studio"
              onClick={(e) => {
                e.preventDefault();
                router.push("/studio", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
              Studio
            </FlipLink>
          </li>
          <li className="leading-[100%] font-semibold font-base">
            <FlipLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/", {
                  onTransitionReady: slideInOut,
                });
              }}
            >
              Journal
            </FlipLink>
          </li>
        </ul>

        <li className="leading-[100%] font-semibold font-base list-none">
          <FlipLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              router.push("/", {
                onTransitionReady: slideInOut,
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

export default Header;
