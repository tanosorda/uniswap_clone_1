"use client";

import { useEffect, useState } from "react";

const ICONS = [
  {
    src: "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    delay: "0s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/29850/standard/pepe-token.jpeg?1696528776",
    delay: "3s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400",
    delay: "6s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    delay: "3s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/11939/standard/shiba.png?1696511800",
    delay: "6s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756",
    delay: "3s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    delay: "6s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/17980/standard/photo_2024-09-10_17.09.00.jpeg?1725963446",
    delay: "3s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/26375/standard/sui-ocean-square.png?1727791290",
    delay: "6s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/16547/standard/arb.jpg?1721358242",
    delay: "3s",
  },
  {
    src: "https://assets.coingecko.com/coins/images/44/standard/xrp-symbol-white-128.png?1696501442",
    delay: "6s",
  },
];

export default function FloatingIconsBackground() {
  const [icons, setIcons] = useState<typeof ICONS | null>(null);

  useEffect(() => {
    const randomized = ICONS.map((icon) => ({
      ...icon,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 95}%`,
    }));
    setIcons(randomized);
  }, []);

  if (!icons) return null; // до монтирования ничего не рендерим

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {icons.map((icon, i) => (
        <img
          key={i}
          src={icon.src}
          className="absolute w-20 h-20 opacity-30 blur-sm animate-floating"
          style={{
            top: icon.top,
            left: icon.left,
            animationDelay: icon.delay,
          }}
          alt={`floating icon ${i}`}
        />
      ))}
    </div>
  );
}
