"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownUp, ChevronDown, Settings, Search } from "lucide-react";
import WalletConnectModal from "./WalletConnectModal"; // Импортируем компонент модального окна

// Mock blockchain networks
const chains = [
  {
    id: "ethereum",
    name: "Ethereum",
    logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
  {
    id: "unichain",
    name: "Unichain",
    logo: "https://app.uniswap.org/assets/unichain-logo-B-lwXybJ.png",
  },

  {
    id: "base",
    name: "Base",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoCAYAAAB65WHVAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA5BSURBVHgB7d09jB3lFYDhj4gKitBAStYpAxJLASlZpwXJhgJK23SRkAARJR220yVSZFsitaGEBqTgNjYtFFkknDLYrWmMFNM6Pnd8ccBe7/zPmZnnkdAa0959OXO+mbmPlNdu3y4ApPOLAkBKAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSAg2QlEADJCXQAEkJNEBSjxZI5onHq392d+78fKyUnadKefqp6r/Fn+Pv4r9v//0gN29V/4Rr3939eaP6u+9vVX+Ov9/8c6NAOo+U127fLjCBbYR3j5Ty3M7dID/+8OgOaf/bO/H+ofr5xdUq2vvXCkxGoBlNBHjv2SrGe89MF+Kmrly9F+0ItmmbsQg0g9kG+diL96bjJYhAR7Qj2FeuCjbDEWh6s11ZRJBPHl1OkA8T03WE+qPLViL0S6DpJCJ8/IVSTvxuWVNyW9vpOmIdP6ELgaaV2CGfuDMlH39RlA8Ssf7wShVraxDaEGhqixC//Uop77wsyk1tp+oPLxeoTaA5VEzLp9+oftLNdgVy9hNTNYcTaA4UB32xxhDmYcQ0LdQ8jEDzE9s1xsm9+dynPHeffVnKhc8dKnI/geZHscawX57OZvXxsVBzj0CzWWWcft3EnIXVB1sCvWIO/3ITagR6hWJSvviWMM9BvHnv/KVq9cH6CPSKuI95vmKKfvdidaDIegj0SsS0HFOzPfO8WXusi0AvXEzK27szWIaIc0TaU4nLJ9ALZmpeNtP08gn0Qp1709S8BqbpZRPohYlp+dM/Vl8jxXqc+cSdHksk0AsS7804f8odGmsV0/TR01YeS/KLwiLESuPDt8R5zeLq6fLZ6h3dLIMJeuasNHgQK49lMEHPWEQ5JiZx5ufOvF7dweOKat5M0DNl30wd9tLzZoKeoXjznH0zdWz30u6FnyeBnpmI85k3CtS2jXR86zrzItAzEndqiDNtbCL9Z3d4zI1Az0Qc+HgykC5iJfbpn6rzC+ZBoGcg4nzSLxU9ifMLkZ4HgU5OnBmCSM+DQCcmzgxJpPMT6KTEmTGIdG4CnVDcSifOjCUeeHILXk4CnYz7nBlb3N0Rt+B5mCUfgU4kvtBVnJnCJtKeOExHoJOIFx7FpSZMZftmRK8QyEOgE9j+YsDUYlA4Z1BIQ6An5tKSbOKA+rRVWwoCPbGYVsSZbOJ90t7bMT2BnpDb6cgs7sU3PExLoCcSuz53bJDZ5uVKDg0nJdATcCjIXMQgEVd6TEOgJxAfeJeOzMU7r9hHT0WgRxYPo9g7Mzf20dMQ6BHFB/yMy0VmKPbQEWnGJdAjuuiLXpmxvWeqdQfjEeiRxFojPuAwZ85PxiXQI4gPtJNwliCuAD0KPh6BHoGpgyWJOzpcDY5DoAcWqw13bbA0zlPGIdADs9pgieKK0IHh8AR6QHHPs9UGS/X2yz7fQxPogWwmjJcLLFasOFwhDkugB+JgkDVw++iwBHoAEWYHg6yFl/sPR6AH4LKPNYkJ2hQ9DIHumemZNTJFD0Oge2Z6Zo1M0cMQ6B6ZnlkzU3T/BLpHpmfWzBTdP4HuiekZTNF9E+ie+EogqCZo7+joj0D35G1PDcKGd3T0R6B7EKsNTw1CJYYVU3Q/BLoHJ/YKcFfE+eReoQcC3VFMznvPFuD/HPttoQcC3ZFb6+B+brnrh0B35EMID+bKsjuB7iDi7HAQHsydTd0JdAcnPJgCB4rDQleY3Qh0Bz588HAe4OpGoFuy3oDDucrsRqBb8sGDw1lzdCPQLfnQQT3WHO0JdAu7R6w3oK5jAt2aQLdgeob6Ypgx0LQj0C0ce6EADRz3O9OKQDe0OfTwhBQ08tyRQgsC3dDuTgEaclDYjkA35IMGzcWVpz10cwLd0HM7BWhh7zeFhgS6od1fF6CFXXvoxgS6gfiAPfFYAVp4ye2pjQl0qc8BIbS3GXB8V2EjAt2AQEM3DgqbEegGHBBCN7tPFxoQ6AYcEEI3DgqbEeiaYnfmgBC6seJoRqBrsn+G7qwJmxHomnaeLEBHJuhmBLomHyzoh9+l+gS6Jm/jgn5YF9Yn0DU5IIR++F2qT6Br8gQU9MOKoz6BrmnnVwXogWGnvkcLtTz/XoHazp3y7vCD/FKgaxPomq7dKFDb97cKB7DiqM+KAxiVQ8L6BBoYlR10fQINkJRAA6MyQdcn0MCoBLo+gQZISqABkhJogKQEGiApgQZISqCBUd30GHxtAg2MSqDrE2iApAQaGNW17wo1CTRAUt4HXZN32NKEl9IfzLuy6xPomv71N++xhT748ov6rDhquvnfAvTAXRz1CXRN/q8P/fC7VJ9A13TdyTP0wl0c9Ql0Tf6vD/24+UOhJoGuSaChH/vfFmoS6Jr2rxegI3FuRqBrMkFDd9YbzQh0TXFrkA8XdPO1CboRgW5g/z8F6GD/WqEBgW7g62sF6MCqsBmBbsABB3Rz5WqhAYFuwJ0c0J4BpzmBbiA+YA4KoR375+YEuiEHhdDOF9YbjQl0Qw4KoR0TdHMC3dBnXxagobh7ww66OYFuyBQAzbnybEegG4onCq98U4AGXHm2I9AtOOyAZtz/3I5At+DDBvXF7tkThO0IdAsRaPdDQz2uONsT6JY++mcBarB/bk+gW/Khg8PFasNKsD2BbsmaAw4nzt0IdAfWHPBwH10udCDQHVhzwMGsN7oT6A6sOeBg4tydQHd04R8FeICznxQ6EuiOPvuqAD8T07OHU7oT6I7iKSnv5oCfcjjYD4HuwYVLBbgrJucPBboXAt2DuJvDYSFUHA72R6B74rAQKg4H+yPQPTl/yRQNsdpwONgfge5JvMjfk4WsncPBfgl0j847LGTFYvds/9wvge5RXNqZIFirsx8XeibQPTvjgIQVMj0PQ6B7ZopmjUzPwxDoAZiiWRPT83AEegAxRZsoWItTHxQGItADcV80a+C+52EJ9EDivmhPF7J0nhoclkAPKHbRpguW6qzP9+AEemD2cyxRhPmMc5bBCfTA4nTbdxeyNFYb4xDoEbx70YEhyxEHg973PA6BHoHb7liKzWfZ9DwagR7J+c99NRbz52BwXAI9olN/t+pgvqw2xifQI7LqYK6sNqYh0COLVYe7Opgbq41pCPQE4t5oH3bm4sLnVhtTEegJxGPgHmBhDmKQeOdiYSICPZF4gOVdH3wSi0Hi6OnChAR6QrGP9nJ/srKKm55ATywuH/0SkE0cCjrMnp5AT2x7Gen+aLKIMHsRUg4CnUBM0EffLzC5+Cw6wM5DoJPY/9YvBtPaDAqnq6s6chDoROJeU08aMoXtqs15SC4CnUx8C4tIMyZxzkugE4pIu/2OscT9+LFiIx+BTurkByLN8OLcw2PceQl0YiLNkMQ5P4FOTqQZgjjPg0DPgEjTJ3GeD4GeiYh0vPYR2tq+RVGc5+PRwmzEezvil+z0GwUa2d5K526NeTFBz4z7pGkq7m9+/g/iPEcCPUMR6Vf/4gVLHC6i7CGU+RLomYo3jj3/nl88DhYHy+I8bwI9Y9uX2+xfK/AT8T7nOFj24qN5E+iZ2+wX37OXphJBjvWX9zkvwyPltdu3C4tw8mgp594s5YnHCisU++ZX/2qlsSQCvTA7T5Vy+Wz1k/WIe+R9+/byWHEsTExPR35v5bEWm/ub3xfnpTJBL9jeM6VcfMs0vVRxJ88pB4GLJtAL98Tjdw6MXi/l7VcKCxFBjnc4e2R7+QR6JUzTy2BqXheBXpmYpr3LY36237Z95WphRQR6hWKKjlCfOFpILibluEPj/CVT8xoJ9Iodf7GUc6esPbKKHfO7F4V5zQSazQMup18X6iyufFM9qm2dgUDzI6GeljDzcwLNfYR6XMLMQQSaAwn1sGLHHK8EFWYOItAcKu6hjli766M7d2XQhEBTW0zSJ/eqUJuqm4k1xoVL1bQszNQl0LSynaqPvVg9Ts794uGSWGGYlmlLoOlsG+q4r3rtIsQR5Xgk226ZrgSaXh2/G+qXnlnPGiTWF19crYIsyvRJoBnM7pFqFXLsherPS1mFxOoiQvzFnTB/9pX1BcMRaEYTsY5Qb6brJ6s/ZxfxjSDHhBxfKXXl375SivEINJOJiXp3pwp1BPu5nWkn7QhvfEP69RtVjPevVz9hKgJNOhHo2F/Hl99ugn3n59NPVX8ff978vBvxh+25Y/rdrh+2f772XSnf37o3Gce/b/4xFZOQQAMk5UtjAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZISaICkBBogKYEGSEqgAZL6H7tSzSwpZ6/hAAAAAElFTkSuQmCC",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    logo: "https://app.uniswap.org/assets/arbitrum-logo-BlOPIBPb.png",
  },
  {
    id: "polygon",
    name: "Polygon",
    logo: "https://app.uniswap.org/assets/polygon-logo-CoeDsL2n.png",
  },
  {
    id: "optimism",
    name: "OP Mainnet",
    logo: "https://app.uniswap.org/assets/optimism-logo-DbbQCEZl.png",
  },
  {
    id: "bnbchain",
    name: "BNB Chain",
    logo: "https://app.uniswap.org/assets/bnb-logo-0mkMPUtV.png",
  },
  {
    id: "avalanche",
    name: "Avalanche",
    logo: "https://app.uniswap.org/assets/avalanche-logo-DoXP_Ctq.png",
  },
  {
    id: "worldchain",
    name: "World Chain",
    logo: "https://app.uniswap.org/assets/world-chain-logo-Coc0ZAs4.png",
  },
  {
    id: "zksync",
    name: "ZKsync",
    logo: "https://app.uniswap.org/assets/zksync-logo-DYossEkm.png",
  },
  {
    id: "soneium",
    name: "Soneium",
    logo: "https://app.uniswap.org/assets/soneium-logo-tsqWSZUZ.png",
  },
  {
    id: "zorachain",
    name: "Zora Network",
    logo: "https://app.uniswap.org/assets/zora-logo-CUWX4jbN.png",
  },
  {
    id: "celo",
    name: "Celo",
    logo: "https://app.uniswap.org/assets/celo-logo-BEWR5K71.png",
  },
  {
    id: "blast",
    name: "Blast",
    logo: "https://app.uniswap.org/assets/blast-logo-tsBpLCGc.png",
  },
];

// Mock token data with real icons and USD prices
const tokens = [
  //UNICHAIN
  {
    symbol: "UNI",
    name: "Uniswap",
    price: "$12.34",
    priceUSD: 12.34,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    chain: "unichain",
    volume24h: 7500000,
  },
  {
    symbol: "UNX",
    name: "UniX",
    price: "$0.45",
    priceUSD: 0.45,
    change: "+3.21%",
    logo: "https://assets.coingecko.com/coins/images/20674/standard/bt_pfp_ba.png?1734378274",
    chain: "unichain",
    volume24h: 3200000,
  },
  {
    symbol: "UPT",
    name: "UniPower Token",
    price: "$1.23",
    priceUSD: 1.23,
    change: "-0.56%",
    logo: "https://s3.coinmarketcap.com/static/img/portraits/6316a9896eac787c457ad950.png",
    chain: "unichain",
    volume24h: 1800000,
  },
  {
    symbol: "UND",
    name: "UniDollar",
    price: "$0.99",
    priceUSD: 0.99,
    change: "+0.10%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/5694.png",
    chain: "unichain",
    volume24h: 4200000,
  },
  {
    symbol: "UNB",
    name: "UniBit",
    price: "$56.78",
    priceUSD: 56.78,
    change: "+2.34%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/30515.png",
    chain: "unichain",
    volume24h: 2900000,
  },
  {
    symbol: "UNC",
    name: "UniCoin",
    price: "$3.21",
    priceUSD: 3.21,
    change: "-1.23%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/4113.png",
    chain: "unichain",
    volume24h: 1500000,
  },
  {
    symbol: "UNG",
    name: "UniGold",
    price: "$123.45",
    priceUSD: 123.45,
    change: "+0.45%",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAz1BMVEVHcEyuh03Bm13Mp2bXsm/Xsm+7lVi7lVjEnl/KpGTOqWjMp2azjFGuhky1jlKrhEvFoGCwiU+1j1O5k1a+mFrBm13Enl+1jlOmf0aqg0mshUyshUuuh02uh02xi1CviE25k1a9l1rEnl+thkyxi1CmfUWyi1C1jlKUazayi1Cgd0GgeEGOZTKAViWJXyuUazeWbTizjFG+mVuPZjKYcDrDnV6/mVuxik/Io2PNqGfSrGrIo2PLpmbNqGjPqmjZtXHYtHDSrmzXs2/cuHTbt3Mt+iiXAAAARXRSTlMABUdqbzEavf///5dWhY9jFEP/3prtgyzS/9+39P8w////1al0fv/cFzs5/00cDkMmamBw/8cin1KkDrs61+RDhr6uwFlgjj3gAAABFklEQVR4AWIYLICRiZmFhRWrFKAYekCyIIaiAHq/bdt2297/ltpJ9axgTiHOQ7lSrdbqDXqz2Wp3ctGkC/T6g+GoOkZiMp3N5ovlqgWsgfKm3d7u9vTderHZLA/HwyE6nJ4W5/42nFC9c+hybJZxPSxmm/MFGddbP3K84X56zGabSQ4Unq/yYBsaIPd4PGad9wfU9/MGJj+m2x6z3GN6jzfo4Z3M+OM3/vFzpencjjRGUoPwu02Q6IotEBITV9cWyUaTGYDcE+Skg23yEnlGSJ7Vao1GvJG/kTNlr5bjSLWaWpMQ0lQeRFfRESrU63UDEaObA6HJpgVAMep2vGmXnDKooutZoBzPNZGRLOnVEv5QkNHF/wkATsEbS/f8jgoAAAAASUVORK5CYII=",
    chain: "unichain",
    volume24h: 2100000,
  },
  {
    symbol: "UNS",
    name: "UniStable",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/23081.png",
    chain: "unichain",
    volume24h: 3800000,
  },
  {
    symbol: "UNF",
    name: "UniFarm",
    price: "$0.78",
    priceUSD: 0.78,
    change: "+4.56%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/9262.png",
    chain: "unichain",
    volume24h: 1200000,
  },
  {
    symbol: "UNL",
    name: "UniLend",
    price: "$5.67",
    priceUSD: 5.67,
    change: "+1.89%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/7412.png",
    chain: "unichain",
    volume24h: 2500000,
  },
  // Ethereum (10 tokens)
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$3,421.50",
    priceUSD: 3421.5,
    change: "+2.45%",
    logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    chain: "ethereum",
    volume24h: 15000000,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: "$1.00",
    priceUSD: 1.0,
    change: "+0.01%",
    logo: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    chain: "ethereum",
    volume24h: 12000000,
  },
  {
    symbol: "USDT",
    name: "Tether",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
    chain: "ethereum",
    volume24h: 18000000,
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    price: "$67,234.12",
    priceUSD: 67234.12,
    change: "+1.23%",
    logo: "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857",
    chain: "ethereum",
    volume24h: 8000000,
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    price: "$12.34",
    priceUSD: 12.34,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    chain: "ethereum",
    volume24h: 5000000,
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: "$18.45",
    priceUSD: 18.45,
    change: "+3.21%",
    logo: "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
    chain: "ethereum",
    volume24h: 3000000,
  },
  {
    symbol: "DAI",
    name: "Dai",
    price: "$1.00",
    priceUSD: 1.0,
    change: "+0.02%",
    logo: "https://assets.coingecko.com/coins/images/9956/standard/Badge_Dai.png?1696509996",
    chain: "ethereum",
    volume24h: 2500000,
  },
  {
    symbol: "AAVE",
    name: "Aave",
    price: "$102.34",
    priceUSD: 102.34,
    change: "+1.56%",
    logo: "https://assets.coingecko.com/coins/images/12645/standard/AAVE.png?1696512452",
    chain: "ethereum",
    volume24h: 2000000,
  },
  {
    symbol: "MKR",
    name: "Maker",
    price: "$2,345.67",
    priceUSD: 2345.67,
    change: "+0.89%",
    logo: "https://assets.coingecko.com/coins/images/1364/standard/Mark_Maker.png?1696502423",
    chain: "ethereum",
    volume24h: 1500000,
  },
  {
    symbol: "SNX",
    name: "Synthetix",
    price: "$3.45",
    priceUSD: 3.45,
    change: "-0.23%",
    logo: "https://assets.coingecko.com/coins/images/3406/standard/SNX.png?1696504103",
    chain: "ethereum",
    volume24h: 1000000,
  },

  // Arbitrum (10 tokens)
  {
    symbol: "ARB",
    name: "Arbitrum",
    price: "$1.23",
    priceUSD: 1.23,
    change: "+0.87%",
    logo: "https://assets.coingecko.com/coins/images/16547/standard/arb.jpg?1721358242",
    chain: "arbitrum",
    volume24h: 2500000,
  },
  {
    symbol: "GMX",
    name: "GMX",
    price: "$45.67",
    priceUSD: 45.67,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/18323/standard/arbit.png?1696517814",
    chain: "arbitrum",
    volume24h: 1800000,
  },
  {
    symbol: "RDNT",
    name: "Radiant Capital",
    price: "$0.23",
    priceUSD: 0.23,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/26536/standard/Radiant-Logo-200x200.png?1696525610",
    chain: "arbitrum",
    volume24h: 1500000,
  },
  {
    symbol: "MAGIC",
    name: "Magic",
    price: "$0.78",
    priceUSD: 0.78,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/18623/standard/magic.png?1696518095",
    chain: "arbitrum",
    volume24h: 1200000,
  },
  {
    symbol: "GNS",
    name: "Gains Network",
    price: "$5.67",
    priceUSD: 5.67,
    change: "+3.45%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/13663.png",
    chain: "arbitrum",
    volume24h: 900000,
  },
  {
    symbol: "STG",
    name: "Stargate Finance",
    price: "$0.67",
    priceUSD: 0.67,
    change: "+0.56%",
    logo: "https://assets.coingecko.com/coins/images/24413/standard/STG_LOGO.png?1696523595",
    chain: "arbitrum",
    volume24h: 800000,
  },
  {
    symbol: "DPX",
    name: "Dopex",
    price: "$12.34",
    priceUSD: 12.34,
    change: "-0.78%",
    logo: "https://assets.coingecko.com/coins/images/16652/standard/DPX_%281%29.png?1696516213",
    chain: "arbitrum",
    volume24h: 700000,
  },
  {
    symbol: "JONES",
    name: "Jones DAO",
    price: "$2.34",
    priceUSD: 2.34,
    change: "+1.23%",
    logo: "https://assets.coingecko.com/coins/images/23290/standard/3c8c2ed8-afb3-4b67-9937-5493acd88b50.jpg?1696522508",
    chain: "arbitrum",
    volume24h: 600000,
  },
  {
    symbol: "SPA",
    name: "Sperax",
    price: "$0.0123",
    priceUSD: 0.0123,
    change: "+12.34%",
    logo: "https://assets.coingecko.com/coins/images/12232/standard/sperax_logo.jpg?1696512065",
    chain: "arbitrum",
    volume24h: 500000,
  },
  {
    symbol: "VSTA",
    name: "Vesta Finance",
    price: "$0.45",
    priceUSD: 0.45,
    change: "-2.34%",
    logo: "https://assets.coingecko.com/coins/images/23306/standard/vesta-finance.png?1696522523",
    chain: "arbitrum",
    volume24h: 400000,
  },

  // Polygon (10 tokens)
  {
    symbol: "MATIC",
    name: "Polygon",
    price: "$0.78",
    priceUSD: 0.78,
    change: "+1.25%",
    logo: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745",
    chain: "polygon",
    volume24h: 4000000,
  },
  {
    symbol: "QUICK",
    name: "QuickSwap",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/25393/standard/quickswap.png?1696524525",
    chain: "polygon",
    volume24h: 1200000,
  },
  {
    symbol: "DFYN",
    name: "Dfyn Network",
    price: "$0.045",
    priceUSD: 0.045,
    change: "+3.21%",
    logo: "https://assets.coingecko.com/coins/images/15368/standard/SgqhfWz4_400x400_%281%29.jpg?1696515016",
    chain: "polygon",
    volume24h: 900000,
  },
  {
    symbol: "SAND",
    name: "The Sandbox",
    price: "$0.45",
    priceUSD: 0.45,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/12129/standard/sandbox_logo.jpg?1696511971",
    chain: "polygon",
    volume24h: 800000,
  },
  {
    symbol: "GHST",
    name: "Aavegotchi",
    price: "$1.23",
    priceUSD: 1.23,
    change: "+0.56%",
    logo: "https://assets.coingecko.com/coins/images/12467/standard/GHST.png?1696512286",
    chain: "polygon",
    volume24h: 700000,
  },
  {
    symbol: "BAL",
    name: "Balancer",
    price: "$4.56",
    priceUSD: 4.56,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/11683/standard/Balancer.png?1696511572",
    chain: "polygon",
    volume24h: 600000,
  },
  {
    symbol: "DPI",
    name: "DeFi Pulse Index",
    price: "$102.34",
    priceUSD: 102.34,
    change: "-0.78%",
    logo: "https://assets.coingecko.com/coins/images/12465/standard/defi_pulse_index_set.png?1696512284",
    chain: "polygon",
    volume24h: 500000,
  },
  {
    symbol: "STMATIC",
    name: "Staked MATIC",
    price: "$0.79",
    priceUSD: 0.79,
    change: "+0.12%",
    logo: "https://assets.coingecko.com/coins/images/24185/standard/stMATIC.png?1696523373",
    chain: "polygon",
    volume24h: 400000,
  },
  {
    symbol: "agEUR",
    name: "agEUR",
    price: "$1.08",
    priceUSD: 1.08,
    change: "+0.03%",
    logo: "https://assets.coingecko.com/coins/images/32925/standard/eur.png?1699826217",
    chain: "polygon",
    volume24h: 300000,
  },

  // Base (10 токенов)
  {
    symbol: "BASE",
    name: "Base",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "data:image/png;base64,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",
    chain: "base",
    volume24h: 5000000,
  },
  {
    symbol: "AERO",
    name: "Aerodrome",
    price: "$0.34",
    priceUSD: 0.34,
    change: "+12.34%",
    logo: "https://assets.coingecko.com/coins/images/31745/standard/token.png?1696530564",
    chain: "base",
    volume24h: 4000000,
  },
  {
    symbol: "DEGEN",
    name: "Degen",
    price: "$0.0056",
    priceUSD: 0.0056,
    change: "+45.67%",
    logo: "https://assets.coingecko.com/coins/images/34515/standard/android-chrome-512x512.png?1706198225",
    chain: "base",
    volume24h: 3000000,
  },
  {
    symbol: "USDbC",
    name: "USD Base Coin",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/31164/standard/baseusdc.jpg?1696529993",
    chain: "base",
    volume24h: 2500000,
  },
  {
    symbol: "cbETH",
    name: "Coinbase Wrapped Staked ETH",
    price: "$3,456.78",
    priceUSD: 3456.78,
    change: "+1.23%",
    logo: "https://assets.coingecko.com/coins/images/27008/standard/cbeth.png?1709186989",
    chain: "base",
    volume24h: 2000000,
  },
  {
    symbol: "SNX",
    name: "Synthetix",
    price: "$3.45",
    priceUSD: 3.45,
    change: "-0.23%",
    logo: "https://assets.coingecko.com/coins/images/3406/standard/SNX.png?1696504103",
    chain: "base",
    volume24h: 1500000,
  },
  {
    symbol: "MKR",
    name: "Maker",
    price: "$2,345.67",
    priceUSD: 2345.67,
    change: "+0.89%",
    logo: "https://assets.coingecko.com/coins/images/1364/standard/Mark_Maker.png?1696502423",
    chain: "base",
    volume24h: 1000000,
  },
  {
    symbol: "COMP",
    name: "Compound",
    price: "$56.78",
    priceUSD: 56.78,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/10775/standard/COMP.png?1696510737",
    chain: "base",
    volume24h: 900000,
  },
  {
    symbol: "AAVE",
    name: "Aave",
    price: "$102.34",
    priceUSD: 102.34,
    change: "+1.56%",
    logo: "https://assets.coingecko.com/coins/images/12645/standard/aave-token-round.png?1720472354",
    chain: "base",
    volume24h: 800000,
  },
  {
    symbol: "CRV",
    name: "Curve DAO",
    price: "$0.56",
    priceUSD: 0.56,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/12124/standard/Curve.png?1696511967",
    chain: "base",
    volume24h: 700000,
  },

  // OP Mainnet (10 токенов)
  {
    symbol: "OP",
    name: "Optimism",
    price: "$2.34",
    priceUSD: 2.34,
    change: "+3.45%",
    logo: "https://assets.coingecko.com/coins/images/25244/standard/Optimism.png?1696524385",
    chain: "optimism",
    volume24h: 5000000,
  },
  // BNB Chain (10 токенов)
  {
    symbol: "BNB",
    name: "BNB",
    price: "$585.20",
    priceUSD: 585.2,
    change: "+1.25%",
    logo: "https://assets.coingecko.com/coins/images/825/standard/bnb-icon2_2x.png?1696501970",
    chain: "bnbchain",
    volume24h: 15000000,
  },
  {
    symbol: "CAKE",
    name: "PancakeSwap",
    price: "$2.34",
    priceUSD: 2.34,
    change: "-0.56%",
    logo: "https://assets.coingecko.com/coins/images/12632/standard/pancakeswap-cake-logo_%281%29.png?1696512446",
    chain: "bnbchain",
    volume24h: 5000000,
  },
  {
    symbol: "XVS",
    name: "Venus",
    price: "$12.34",
    priceUSD: 12.34,
    change: "+3.45%",
    logo: "https://assets.coingecko.com/coins/images/12677/standard/XVS_Token.jpg?1727454303",
    chain: "bnbchain",
    volume24h: 3000000,
  },
  {
    symbol: "ALPACA",
    name: "Alpaca Finance",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/14165/standard/Logo200.png?1696513649",
    chain: "bnbchain",
    volume24h: 2000000,
  },
  {
    symbol: "BUSD",
    name: "Binance USD",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/31273/standard/new_binance-peg-busd.png?1696530096",
    chain: "bnbchain",
    volume24h: 18000000,
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: "$0.45",
    priceUSD: 0.45,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/975/standard/cardano.png?1696502090",
    chain: "bnbchain",
    volume24h: 1500000,
  },
  {
    symbol: "DOT",
    name: "Polkadot",
    price: "$6.78",
    priceUSD: 6.78,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/12171/standard/polkadot.png?1696512008",
    chain: "bnbchain",
    volume24h: 1200000,
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: "$18.45",
    priceUSD: 18.45,
    change: "+3.21%",
    logo: "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
    chain: "bnbchain",
    volume24h: 1000000,
  },
  {
    symbol: "AAVE",
    name: "Aave",
    price: "$102.34",
    priceUSD: 102.34,
    change: "+1.56%",
    logo: "https://assets.coingecko.com/coins/images/12645/standard/AAVE.png?1696512452",
    chain: "bnbchain",
    volume24h: 900000,
  },
  {
    symbol: "SXP",
    name: "Swipe",
    price: "$0.34",
    priceUSD: 0.34,
    change: "-2.34%",
    logo: "https://assets.coingecko.com/coins/images/9368/standard/swipe.png?1696509481",
    chain: "bnbchain",
    volume24h: 800000,
  },

  // Avalanche (10 токенов)
  {
    symbol: "AVAX",
    name: "Avalanche",
    price: "$34.56",
    priceUSD: 34.56,
    change: "+4.56%",
    logo: "https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png?1696512369",
    chain: "avalanche",
    volume24h: 8000000,
  },
  {
    symbol: "JOE",
    name: "JoeToken",
    price: "$0.45",
    priceUSD: 0.45,
    change: "+1.23%",
    logo: "https://assets.coingecko.com/coins/images/17569/standard/LFJ_JOE_Logo.png?1727200941",
    chain: "avalanche",
    volume24h: 3000000,
  },
  {
    symbol: "PNG",
    name: "Pangolin",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/14023/standard/PNG_token.png?1696513750",
    chain: "avalanche",
    volume24h: 2000000,
  },
  {
    symbol: "QI",
    name: "BENQI",
    price: "$0.023",
    priceUSD: 0.023,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/16362/standard/GergDDN3_400x400.jpg?1696515961",
    chain: "avalanche",
    volume24h: 1500000,
  },
  {
    symbol: "XAVA",
    name: "Avalaunch",
    price: "$0.56",
    priceUSD: 0.56,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/15466/standard/avalaunch.png?1696515112",
    chain: "avalanche",
    volume24h: 1200000,
  },
  {
    symbol: "SHERPA",
    name: "Sherpa",
    price: "$0.78",
    priceUSD: 0.78,
    change: "+0.56%",
    logo: "https://assets.coingecko.com/coins/images/17811/thumb/sherpa.png?1629335076",
    chain: "avalanche",
    volume24h: 1000000,
  },
  {
    symbol: "HUSKY",
    name: "Husky",
    price: "$0.00012",
    priceUSD: 0.00012,
    change: "+12.34%",
    logo: "https://assets.coingecko.com/coins/images/40122/standard/photo_2024-09-08_20.43.56_%281%29.jpeg?1725898016",
    chain: "avalanche",
    volume24h: 900000,
  },
  {
    symbol: "SPORE",
    name: "Spore",
    price: "$0.00034",
    priceUSD: 0.00034,
    change: "-5.67%",
    logo: "https://assets.coingecko.com/coins/images/14470/standard/spore-logo-cg.png?1749577313",
    chain: "avalanche",
    volume24h: 800000,
  },
  {
    symbol: "MIM",
    name: "Magic Internet Money",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/16786/standard/mimlogopng.png?1696516494",
    chain: "avalanche",
    volume24h: 700000,
  },
  {
    symbol: "YAK",
    name: "Yak Token",
    price: "$12.34",
    priceUSD: 12.34,
    change: "+3.45%",
    logo: "https://assets.coingecko.com/coins/images/17654/standard/yieldyak.png?1696517185",
    chain: "avalanche",
    volume24h: 600000,
  },

  // ZKsync (10 токенов)
  {
    symbol: "ZKS",
    name: "ZKSwap",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/31633/standard/200x200_Black.png?1747800050",
    chain: "zksync",
    volume24h: 5000000,
  },
  // World Chain (10 токенов)
  {
    symbol: "WRLD",
    name: "World Token",
    price: "$0.045",
    priceUSD: 0.045,
    change: "+8.76%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/13502.png",
    chain: "worldchain",
    volume24h: 2500000,
  },
  {
    symbol: "WETH",
    name: "Wrapped Ether",
    price: "$3,421.50",
    priceUSD: 3421.5,
    change: "+2.45%",
    logo: "https://assets.coingecko.com/coins/images/2518/standard/weth.png?1696503332",
    chain: "worldchain",
    volume24h: 1800000,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: "$1.00",
    priceUSD: 1.0,
    change: "+0.01%",
    logo: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    chain: "worldchain",
    volume24h: 1500000,
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    price: "$67,234.12",
    priceUSD: 67234.12,
    change: "+1.23%",
    logo: "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857",
    chain: "worldchain",
    volume24h: 1200000,
  },
  {
    symbol: "WLD",
    name: "Worldcoin",
    price: "$4.56",
    priceUSD: 4.56,
    change: "-3.45%",
    logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/13502.png",
    chain: "worldchain",
    volume24h: 900000,
  },
  {
    symbol: "DIMO",
    name: "DIMO",
    price: "$0.23",
    priceUSD: 0.23,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/28383/standard/square_coin_720.png?1732072773",
    chain: "worldchain",
    volume24h: 800000,
  },
  {
    symbol: "RNDR",
    name: "Render Token",
    price: "$7.89",
    priceUSD: 7.89,
    change: "+1.23%",
    logo: "https://assets.coingecko.com/coins/images/11636/standard/rndr.png?1696511519",
    chain: "worldchain",
    volume24h: 700000,
  },
  {
    symbol: "ACS",
    name: "ACryptoS",
    price: "$0.56",
    priceUSD: 0.56,
    change: "-0.78%",
    logo: "https://assets.coingecko.com/coins/images/32721/standard/ACS.jpg?1699009686",
    chain: "worldchain",
    volume24h: 600000,
  },
  {
    symbol: "WFAI",
    name: "World Finance AI",
    price: "$0.0012",
    priceUSD: 0.0012,
    change: "+12.34%",
    logo: "https://assets.coingecko.com/coins/images/30606/standard/waifuai.jpg?1696529476",
    chain: "worldchain",
    volume24h: 500000,
  },
  {
    symbol: "WSTETH",
    name: "Wrapped stETH",
    price: "$3,456.78",
    priceUSD: 3456.78,
    change: "+1.56%",
    logo: "https://assets.coingecko.com/coins/images/18834/standard/wstETH.png?1696518299",
    chain: "worldchain",
    volume24h: 400000,
  },

  // Soneium (10 токенов)
  {
    symbol: "SONE",
    name: "Soneium",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/53814/standard/20250116-173015.png?1737432919",
    chain: "soneium",
    volume24h: 3000000,
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    price: "$0.78",
    priceUSD: 0.78,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/34188/standard/jup.png?1700000000",
    chain: "soneium",
    volume24h: 2500000,
  },
  {
    symbol: "RAY",
    name: "Raydium",
    price: "$1.23",
    priceUSD: 1.23,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/markets/images/649/standard/raydium.jpeg?1706864594",
    chain: "soneium",
    volume24h: 2000000,
  },
  {
    symbol: "ORCA",
    name: "Orca",
    price: "$3.45",
    priceUSD: 3.45,
    change: "+0.56%",
    logo: "https://assets.coingecko.com/coins/images/17547/standard/Orca_Logo.png?1696517159",
    chain: "soneium",
    volume24h: 1800000,
  },
  {
    symbol: "MNGO",
    name: "Mango",
    price: "$0.045",
    priceUSD: 0.045,
    change: "-2.34%",
    logo: "https://assets.coingecko.com/coins/images/14773/standard/token-mango.png?1696514442",
    chain: "soneium",
    volume24h: 1500000,
  },
  {
    symbol: "BONK",
    name: "Bonk",
    price: "$0.000023",
    priceUSD: 0.000023,
    change: "+8.76%",
    logo: "https://assets.coingecko.com/coins/images/28600/standard/bonk.jpg?1696527684",
    chain: "soneium",
    volume24h: 1200000,
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    price: "$0.45",
    priceUSD: 0.45,
    change: "+3.45%",
    logo: "https://assets.coingecko.com/coins/images/31924/standard/pyth.png?1701245725",
    chain: "soneium",
    volume24h: 1000000,
  },
  {
    symbol: "JTO",
    name: "Jito",
    price: "$2.34",
    priceUSD: 2.34,
    change: "-0.78%",
    logo: "https://assets.coingecko.com/coins/images/33228/standard/jto.png?1701137022",
    chain: "soneium",
    volume24h: 900000,
  },
  {
    symbol: "WEN",
    name: "Wen",
    price: "$0.00012",
    priceUSD: 0.00012,
    change: "+15.67%",
    logo: "https://assets.coingecko.com/coins/images/34856/standard/wen-logo-new.jpg?1741334229",
    chain: "soneium",
    volume24h: 800000,
  },
  {
    symbol: "DUKO",
    name: "Duko",
    price: "$0.00034",
    priceUSD: 0.00034,
    change: "-5.67%",
    logo: "https://assets.coingecko.com/coins/images/35301/standard/WhatsApp_Image_2024-02-14_at_18.46.11.jpeg?1708084869",
    chain: "soneium",
    volume24h: 700000,
  },

  // Zora Network (10 токенов)
  {
    symbol: "ZORA",
    name: "Zora",
    price: "$0.23",
    priceUSD: 0.23,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/54693/standard/zora.jpg?1741094751",
    chain: "zorachain",
    volume24h: 2000000,
  },
  // ... продолжаем аналогично для Celo и Blast ...

  // Celo (10 токенов)
  {
    symbol: "CELO",
    name: "Celo",
    price: "$0.78",
    priceUSD: 0.78,
    change: "+1.25%",
    logo: "https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg?1696511069",
    chain: "celo",
    volume24h: 3000000,
  },
  // ... ещё 9 токенов для Celo ...

  // Blast (10 токенов)
  {
    symbol: "BLAST",
    name: "Blast",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/35494/standard/Blast.jpg?1719385662",
    chain: "blast",
    volume24h: 4000000,
  },
  // Zora Network (10 токенов)
  {
    symbol: "ZORA",
    name: "Zora Network",
    price: "$2.34",
    priceUSD: 2.34,
    change: "+5.67%",
    logo: "https://cryptologos.cc/logos/zora-zora-logo.png",
    chain: "zorachain",
    volume24h: 3500000,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$3,421.50",
    priceUSD: 3421.5,
    change: "+2.45%",
    logo: "https://assets.coingecko.com/coins/images/54693/standard/zora.jpg?1741094751",
    chain: "zorachain",
    volume24h: 2800000,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: "$1.00",
    priceUSD: 1.0,
    change: "+0.01%",
    logo: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    chain: "zorachain",
    volume24h: 2200000,
  },
  {
    symbol: "NOUNS",
    name: "Nouns",
    price: "$45.67",
    priceUSD: 45.67,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/nft_contracts/images/391/standard/nouns.png?1707287296",
    chain: "zorachain",
    volume24h: 1800000,
  },
  {
    symbol: "MINT",
    name: "Public Mint",
    price: "$0.023",
    priceUSD: 0.023,
    change: "+12.34%",
    logo: "https://assets.coingecko.com/coins/images/53483/standard/Main_Square.png?1749134131",
    chain: "zorachain",
    volume24h: 1500000,
  },
  {
    symbol: "ZORB",
    name: "Zorb",
    price: "$0.56",
    priceUSD: 0.56,
    change: "+3.45%",
    logo: "https://assets.geckoterminal.com/1ewfosycls5yphdjkieq8mkr43gk",
    chain: "zorachain",
    volume24h: 1200000,
  },
  {
    symbol: "ZNS",
    name: "ZNS Domain",
    price: "$0.12",
    priceUSD: 0.12,
    change: "-2.34%",
    logo: "https://assets.geckoterminal.com/676zp08szxepokgi7fwfwyt2yhut",
    chain: "zorachain",
    volume24h: 900000,
  },
  {
    symbol: "ZRO",
    name: "Zerion",
    price: "$0.78",
    priceUSD: 0.78,
    change: "+0.56%",
    logo: "https://assets.coingecko.com/coins/images/28206/standard/ftxG9_TJ_400x400.jpeg?1696527208",
    chain: "zorachain",
    volume24h: 800000,
  },
  {
    symbol: "ZFT",
    name: "Zora Frames Token",
    price: "$0.045",
    priceUSD: 0.045,
    change: "+8.76%",
    logo: "https://assets.geckoterminal.com/earogo7gntb4u1gvk85e7p7rn7hh",
    chain: "zorachain",
    volume24h: 700000,
  },
  {
    symbol: "ZLP",
    name: "Zora LP",
    price: "$1.23",
    priceUSD: 1.23,
    change: "-0.78%",
    logo: "https://assets.coingecko.com/coins/images/55381/standard/zlp.png?1745702685",
    chain: "zorachain",
    volume24h: 600000,
  },

  // Celo (10 токенов)
  {
    symbol: "CELO",
    name: "Celo",
    price: "$0.78",
    priceUSD: 0.78,
    change: "+1.25%",
    logo: "https://assets.coingecko.com/coins/images/11090/standard/InjXBNx9_400x400.jpg?1696511069",
    chain: "celo",
    volume24h: 5000000,
  },
  {
    symbol: "cUSD",
    name: "Celo Dollar",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/13161/standard/icon-celo-dollar-color-1000-circle-cropped.png?1696512801",
    chain: "celo",
    volume24h: 4000000,
  },
  {
    symbol: "cEUR",
    name: "Celo Euro",
    price: "$1.08",
    priceUSD: 1.08,
    change: "+0.03%",
    logo: "https://assets.coingecko.com/coins/images/16756/standard/CEUR.png?1696516329",
    chain: "celo",
    volume24h: 3500000,
  },
  {
    symbol: "MOO",
    name: "Moola Market",
    price: "$0.023",
    priceUSD: 0.023,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/17719/standard/MOO_Logo_blue.png?1696517246",
    chain: "celo",
    volume24h: 3000000,
  },
  {
    symbol: "UBE",
    name: "Ubeswap",
    price: "$0.045",
    priceUSD: 0.045,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/36950/standard/ubeswap.png?1712898123",
    chain: "celo",
    volume24h: 2500000,
  },
  {
    symbol: "POOF",
    name: "Poof Token",
    price: "$0.00012",
    priceUSD: 0.00012,
    change: "+12.34%",
    logo: "https://assets.geckoterminal.com/iy75xifcqqomhxaoaoc2sie04l4b",
    chain: "celo",
    volume24h: 2000000,
  },
  {
    symbol: "MCUSD",
    name: "Moola Celo Dollar",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/22380/standard/McUSD_Blue_128x128_Square.jpg?1696521724",
    chain: "celo",
    volume24h: 1800000,
  },
  {
    symbol: "SUSHI",
    name: "SushiSwap",
    price: "$1.23",
    priceUSD: 1.23,
    change: "+2.34%",
    logo: "https://assets.coingecko.com/coins/images/12271/standard/512x512_Logo_no_chop.png?1696512164",
    chain: "celo",
    volume24h: 1500000,
  },
  {
    symbol: "MOBI",
    name: "Mobius Money",
    price: "$0.0056",
    priceUSD: 0.0056,
    change: "-5.67%",
    logo: "https://assets.coingecko.com/coins/images/18467/standard/MOBI-200.png?1696517953",
    chain: "celo",
    volume24h: 1200000,
  },
  {
    symbol: "CELR",
    name: "Celer Network",
    price: "$0.023",
    priceUSD: 0.023,
    change: "+3.45%",
    logo: "https://assets.coingecko.com/coins/images/4379/standard/Celr.png?1696504978",
    chain: "celo",
    volume24h: 1000000,
  },

  // Blast (10 токенов)
  {
    symbol: "BLAST",
    name: "Blast Token",
    price: "$0.12",
    priceUSD: 0.12,
    change: "+5.67%",
    logo: "https://assets.coingecko.com/coins/images/35494/standard/Blast.jpg?1719385662",
    chain: "blast",
    volume24h: 6000000,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$3,421.50",
    priceUSD: 3421.5,
    change: "+2.45%",
    logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    chain: "blast",
    volume24h: 5000000,
  },
  {
    symbol: "USDB",
    name: "Blast USD",
    price: "$1.00",
    priceUSD: 1.0,
    change: "0.00%",
    logo: "https://assets.coingecko.com/coins/images/39627/standard/usd_plus.png?1723181444",
    chain: "blast",
    volume24h: 4500000,
  },
  {
    symbol: "BLAZE",
    name: "BlazeSwap",
    price: "$0.23",
    priceUSD: 0.23,
    change: "+8.76%",
    logo: "https://assets.coingecko.com/markets/images/1188/standard/blazeswap.jpg?1706865200",
    chain: "blast",
    volume24h: 4000000,
  },
  {
    symbol: "YIELD",
    name: "Yield Protocol",
    price: "$0.78",
    priceUSD: 0.78,
    change: "-1.23%",
    logo: "https://assets.coingecko.com/coins/images/14220/standard/yield.png?1696513935",
    chain: "blast",
    volume24h: 3500000,
  },
  {
    symbol: "BLASTOFF",
    name: "BlastOff",
    price: "$0.00034",
    priceUSD: 0.00034,
    change: "+15.67%",
    logo: "https://assets.coingecko.com/coins/images/37828/standard/profile-3_1.png?1715669157",
    chain: "blast",
    volume24h: 3000000,
  },
  {
    symbol: "GAS",
    name: "Gas DAO",
    price: "$0.00012",
    priceUSD: 0.00012,
    change: "-2.34%",
    logo: "https://assets.coingecko.com/coins/images/22086/standard/SjrgK6sf_400x400.jpg?1696521429",
    chain: "blast",
    volume24h: 2500000,
  },
  {
    symbol: "BLASTUP",
    name: "BlastUp",
    price: "$0.045",
    priceUSD: 0.045,
    change: "+3.45%",
    logo: "https://assets.coingecko.com/coins/images/36054/standard/blastup_icon_logo.png?1710403683",
    chain: "blast",
    volume24h: 2000000,
  },
  {
    symbol: "BLASTER",
    name: "Blaster",
    price: "$0.56",
    priceUSD: 0.56,
    change: "+0.56%",
    logo: "https://assets.coingecko.com/coins/images/35828/standard/Untitled_design_%284%29.png?1709887696",
    chain: "blast",
    volume24h: 1800000,
  },
];

interface TokenSelectorProps {
  selectedToken: string;
  onTokenChange: (token: string) => void;
  amount: string;
  onAmountChange: (amount: string) => void;
  label: string;
  balance?: string;
}

function TokenSelector({
  selectedToken,
  onTokenChange,
  amount,
  onAmountChange,
  label,
  balance,
}: TokenSelectorProps) {
  const token = tokens.find((t) => t.symbol === selectedToken) || tokens[0];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChain, setSelectedChain] = useState("ethereum");
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);

  const filteredTokens = useMemo(() => {
    return tokens
      .filter((token) => {
        const matchesChain = token.chain === selectedChain;
        const matchesSearch =
          token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          token.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesChain && matchesSearch;
      })
      .sort((a, b) => b.volume24h - a.volume24h);
  }, [searchTerm, selectedChain]);

  const popularTokens = useMemo(() => {
    return tokens
      .filter((token) => token.chain === selectedChain)
      .sort((a, b) => b.volume24h - a.volume24h)
      .slice(0, 4);
  }, [selectedChain]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">{label}</span>
        {balance && (
          <span className="text-sm text-muted-foreground">
            Balance: {balance}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-3 p-4 rounded-xl border bg-card/50">
        <div className="flex-1">
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="border-0 bg-transparent text-3xl font-semibold p-0 h-auto focus-visible:ring-0"
          />
          <div className="text-sm text-muted-foreground mt-1">
            {amount && !isNaN(Number(amount)) && Number(amount) > 0
              ? `≈ $${(
                  Number(amount) *
                  Number(token.price.replace("$", "").replace(",", ""))
                ).toLocaleString()}`
              : "$0.00"}
          </div>
        </div>
        <Select value={selectedToken} onValueChange={onTokenChange}>
          <SelectTrigger className="w-auto border-0 bg-muted/50 hover:bg-muted">
            <div className="flex items-center space-x-2">
              <img
                src={token.logo}
                alt={token.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRleHQgeD0iNiIgeT0iOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+JHt0b2tlbi5zeW1ib2wuc3Vic3RyaW5nKDAsIDIpfTwvdGV4dD4KPC9zdmc+Cjwvc3ZnPgo=`;
                }}
              />
              <div className="text-left">
                <div className="font-semibold">{token.symbol}</div>
                <div className="text-xs text-muted-foreground">
                  {token.name}
                </div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </div>
          </SelectTrigger>
          <SelectContent className="p-0 h-[600px]">
            <div className="sticky top-0 z-10 bg-background p-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search token"
                  className="pl-10 pr-24 py-5 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-3 top-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsChainDropdownOpen(!isChainDropdownOpen);
                    }}
                    className="flex items-center space-x-1 bg-muted/50 hover:bg-muted px-2 py-1 rounded-lg"
                  >
                    <img
                      src={chains.find((c) => c.id === selectedChain)?.logo}
                      alt="Chain"
                      className="w-5 h-5 rounded-full"
                    />
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isChainDropdownOpen && (
                    <div
                      className="absolute right-0 mt-1 w-48 bg-background border rounded-lg shadow-lg z-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {chains.map((chain) => (
                        <div
                          key={chain.id}
                          className="flex items-center p-2 hover:bg-muted cursor-pointer"
                          onClick={() => {
                            setSelectedChain(chain.id);
                            setIsChainDropdownOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <img
                            src={chain.logo}
                            alt={chain.name}
                            className="w-5 h-5 rounded-full mr-2"
                          />
                          <span>{chain.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              <div className="p-3">
                <h3 className="text-sm text-muted-foreground mb-3">
                  Popular tokens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTokens.map((token) => (
                    <SelectItem
                      key={token.symbol}
                      value={token.symbol}
                      className="h-auto p-0"
                    >
                      <div className="flex items-center px-3 py-2 hover:bg-muted/50 rounded-lg">
                        <img
                          src={token.logo}
                          alt={token.name}
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <span className="font-medium">{token.symbol}</span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm text-muted-foreground mb-3">
                  Токены по объему за 24 ч
                </h3>
                {filteredTokens.map((token) => (
                  <SelectItem
                    key={token.symbol}
                    value={token.symbol}
                    className="h-auto py-2"
                  >
                    <div className="flex items-center w-full">
                      <img
                        src={token.logo}
                        alt={token.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">
                          {token.name}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{token.price}</div>
                        <div
                          className={`text-xs ${
                            token.change.startsWith("+")
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {token.change}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </div>
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function SwapInterface() {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [isConnected, setIsConnected] = useState(false); // Изменено на состояние
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false); // Состояние для модального окна

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  useEffect(() => {
    if (fromAmount && Number(fromAmount) > 0) {
      const fromTokenData = tokens.find((t) => t.symbol === fromToken);
      const toTokenData = tokens.find((t) => t.symbol === toToken);

      if (fromTokenData && toTokenData) {
        const convertedAmount =
          (Number(fromAmount) * fromTokenData.priceUSD) / toTokenData.priceUSD;
        setToAmount(convertedAmount.toFixed(6));
      }
    } else {
      setToAmount("");
    }
  }, [fromAmount, fromToken, toToken]);

  // Обработчик успешного подключения кошелька
  const handleWalletConnect = () => {
    setIsConnected(true);
    setIsWalletModalOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Swap</h2>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <TokenSelector
            selectedToken={fromToken}
            onTokenChange={setFromToken}
            amount={fromAmount}
            onAmountChange={setFromAmount}
            label="From"
            balance="1.2345"
          />

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwapTokens}
              className="rounded-full w-10 h-10 p-0 border-4 border-background shadow-md hover:shadow-lg transition-all"
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <TokenSelector
            selectedToken={toToken}
            onTokenChange={setToToken}
            amount={toAmount}
            onAmountChange={setToAmount}
            label="To"
          />

          {fromAmount && Number(fromAmount) > 0 && (
            <div className="p-3 rounded-xl bg-muted/30 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rate</span>
                <span>
                  1 {fromToken} = 3,421.50 {toToken}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Network fee</span>
                <span>~$12.34</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price impact</span>
                <span className="text-green-500">&lt;0.01%</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Max slippage</span>
            <div className="flex items-center space-x-1">
              {["0.1", "0.5", "1.0"].map((value) => (
                <Button
                  key={value}
                  variant={slippage === value ? "default" : "outline"}
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={() => setSlippage(value)}
                >
                  {value}%
                </Button>
              ))}
            </div>
          </div>

          {!isConnected ? (
            <Button
              className="dr-dre w-full gradient-pink text-white font-medium py-3 text-lg hover:opacity-90"
              // onClick={() => setIsWalletModalOpen(true)}
            >
              Connect Wallet
            </Button>
          ) : fromAmount && Number(fromAmount) > 0 ? (
            <Button className="w-full gradient-pink text-white font-medium py-3 text-lg hover:opacity-90">
              Swap {fromToken} for {toToken}
            </Button>
          ) : (
            <Button disabled className="w-full py-3 text-lg">
              Enter an amount
            </Button>
          )}

          {fromAmount && Number(fromAmount) > 0 && (
            <div className="text-xs text-muted-foreground text-center">
              By swapping, I agree to Uniswap's{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and acknowledge that I have read the{" "}
              <a href="#" className="text-primary hover:underline">
                Uniswap protocol disclaimer
              </a>
              .
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно подключения кошелька */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  );
}
