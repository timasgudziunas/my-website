"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export type HomeLinkMenuItem = {
  title: string;
  href: string;
  imgUrl: string;
};

type HomeLinkMenuProps = {
  items: HomeLinkMenuItem[];
  /** Static preview image shown before any link has been hovered. */
  defaultImgUrl: string;
};

/**
 * A link list where hovering a title stacks its image into a tilted preview
 * pane, animated in with GSAP. Adapted from a 21st.dev reference component:
 * event wiring moved from querySelectorAll/addEventListener (whose cleanup
 * never actually ran) to React onMouseEnter handlers made GSAP-cleanup-safe
 * via useGSAP's contextSafe.
 */
export default function HomeLinkMenu({
  items,
  defaultImgUrl,
}: HomeLinkMenuProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const lastHoveredIndexRef = useRef<number | null>(null);

  const { contextSafe } = useGSAP({ scope: sectionRef });

  // contextSafe() returns a function that only ever runs from the
  // onMouseEnter handlers below, never during render; the rule can't
  // statically verify that for a GSAP context-safe callback, per
  // @gsap/react's documented pattern for event-handler-driven tweens.
  // eslint-disable-next-line react-hooks/refs
  const handleHover = contextSafe((index: number) => {
    if (index === lastHoveredIndexRef.current) return;

    const previewContainer = previewContainerRef.current;
    if (!previewContainer) return;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add(
      "temp-image",
      "absolute",
      "rotate-[-30deg]",
      "-left-1/2",
      "top-[125%]"
    );

    const img = document.createElement("img");
    img.src = items[index].imgUrl;
    img.alt = "";
    img.classList.add("h-full", "w-full", "object-fill");
    imgContainer.appendChild(img);
    previewContainer.appendChild(imgContainer);

    gsap.to(imgContainer, {
      top: "0%",
      left: "0%",
      rotate: 0,
      duration: 1.25,
      ease: "power3.out",
      onComplete: () => {
        gsap.delayedCall(2, () => {
          const allImgContainers =
            previewContainer.querySelectorAll(".temp-image");
          if (allImgContainers.length > 1) {
            Array.from(allImgContainers)
              .slice(0, -1)
              .forEach((container) => {
                setTimeout(() => {
                  container.remove();
                }, 2000);
              });
          }
        });
      },
    });

    lastHoveredIndexRef.current = index;
  });

  return (
    <section
      ref={sectionRef}
      className="flex h-full w-full items-center gap-16 p-20 max-md:p-5"
    >
      <div className="flex-1">
        <ul className="flex flex-1 flex-col gap-6 text-5xl font-medium max-md:gap-2 max-md:text-3xl">
          {items.map((item, index) => (
            <li key={item.title}>
              <Link
                href={item.href}
                onMouseEnter={() => handleHover(index)}
                className="block text-neutral-400 transition hover:text-neutral-950"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div
        ref={previewContainerRef}
        className="relative left-1/2 max-w-90 min-w-48 flex-2 rotate-15 [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] max-md:max-w-64"
      >
        <img
          src={defaultImgUrl}
          className="h-full w-full object-fill"
          alt=""
        />
        <div className="absolute top-[125%] -left-1/2 h-full w-full rotate-[-30deg]">
          <img
            src={items[1]?.imgUrl ?? defaultImgUrl}
            className="h-full w-full object-fill"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
