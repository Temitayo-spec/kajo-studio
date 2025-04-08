import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PRELOADER_IMAGES } from "@/constants/images";
import Image from "next/image";

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);
  const digit3Ref = useRef(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const digit3 = digit3Ref.current as HTMLElement | null;
    if (digit3) {
      digit3.innerHTML = "";
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 10; j++) {
          const div = document.createElement("div");
          div.className =
            "num flex items-center justify-center h-32 md:h-40 text-6xl";
          div.textContent = j.toString();
          digit3.appendChild(div);
        }
      }
      const finalDigit = document.createElement("div");
      finalDigit.className =
        "num flex items-center justify-center h-32 md:h-40 text-6xl";
      finalDigit.textContent = "0";
      digit3.appendChild(finalDigit);
    }

    const animateDigit = (
      digit: HTMLElement | null,
      duration: number,
      delay: number = 0
    ) => {
      if (!digit) return;
      const nums = digit.querySelectorAll(".num");
      if (nums.length === 0) return;

      const numHeight = nums[0].clientHeight;
      const totalDistance = (nums.length - 1) * numHeight;

      return gsap.to(digit, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    };

    const totalDuration = 6;

    const animateImages = () => {
      imagesRef.current.forEach((image, index) => {
        if (!image) return;

        const imageDelay = (index / PRELOADER_IMAGES.length) * totalDuration;

        gsap.fromTo(
          image,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: totalDuration / PRELOADER_IMAGES.length,
            delay: imageDelay,
            ease: "power3.inOut",
          }
        );
      });

      const d1 = animateDigit(
        digit1Ref.current as unknown as HTMLElement,
        2,
        5
      );
      const d2 = animateDigit(digit2Ref.current as unknown as HTMLElement, 6);
      const d3 = animateDigit(digit3Ref.current as unknown as HTMLElement, 5);

      console.log(d1, d2, d3);

      gsap.delayedCall(totalDuration + 0.5, () => {
        const tl = gsap.timeline();

        tl.to(
          imagesRef.current.filter(Boolean),
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            duration: 1,
            stagger: 0.05,
            ease: "power3.inOut",
          },
          0
        );

        tl.to(
          [digit1Ref.current, digit2Ref.current, digit3Ref.current],
          {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setTimeout(() => {
                onComplete();
              }, 500);
            },
          },
          0
        );

        tl.to(".preloader-container", {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            const el = document.querySelector(".preloader-container");
            if (el) el.remove();
          },
        });
      });
    };

    const imageElements = imagesRef.current.filter(Boolean);
    const loadPromises = imageElements.map((img) => {
      return new Promise((resolve) => {
        if (img && img.complete) {
          resolve(true);
        } else {
          (img as HTMLImageElement).onload = () => resolve(true);
          (img as HTMLImageElement).onerror = () => resolve(true);
        }
      });
    });

    Promise.all(loadPromises).then(() => {
      animateImages();
    });

    return () => {
      gsap.killTweensOf([
        digit1Ref.current,
        digit2Ref.current,
        digit3Ref.current,
        imagesRef.current,
      ]);
    };
  }, []);

  return (
    <div className="preloader-container flex items-center justify-center w-full h-screen bg-black text-white font-anton-sc uppercase fixed overflow-hidden z-[999999]">
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative overflow-hidden h-[500px] w-100">
          {PRELOADER_IMAGES.map((image, index) => (
            <Image
              key={index}
              ref={(el) => {
                imagesRef.current[index] = el;
              }}
              src={image}
              alt={`Preloader Image ${index}`}
              priority
              quality={100}
              className="object-cover absolute w-full h-full"
              style={{
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              }}
            />
          ))}
        </div>
        <div className="absolute bottom-6 right-6 flex flex-col items-center justify-center z-10">
          <div className="flex items-center justify-center">
            <div className="relative h-32 w-10 md:h-40 overflow-hidden">
              <div ref={digit1Ref} className="absolute w-full digit-1">
                {[0, 1].map((digit) => (
                  <div
                    key={digit}
                    className="flex items-center justify-center h-32 md:h-40 text-6xl num"
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-32 w-10 md:h-40 overflow-hidden">
              <div ref={digit2Ref} className="absolute w-full digit-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center h-32 md:h-40 text-6xl num"
                  >
                    {digit}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-32 w-10 md:h-40 overflow-hidden">
              <div ref={digit3Ref} className="absolute w-full digit-3" />
            </div>
            <div className="text-6xl">%</div>
          </div>
        </div>
      </div>
    </div>
  );
};
