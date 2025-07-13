"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

const topPools = [
  {
    pair: "ETH/USDC",
    fee: "0.05%",
    apr: "15.2%",
    tvl: "$125M",
    volume24h: "$45M",
    token1Logo:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    token2Logo:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
  },
  {
    pair: "USDC/USDT",
    fee: "0.01%",
    apr: "8.7%",
    tvl: "$89M",
    volume24h: "$78M",
    token1Logo:
      "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    token2Logo:
      "https://assets.coingecko.com/coins/images/325/standard/Tether.png?1696501661",
  },
  {
    pair: "ETH/WBTC",
    fee: "0.30%",
    apr: "12.4%",
    tvl: "$67M",
    volume24h: "$23M",
    token1Logo:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    token2Logo:
      "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857",
  },
  {
    pair: "UNI/ETH",
    fee: "0.30%",
    apr: "22.1%",
    tvl: "$34M",
    volume24h: "$12M",
    token1Logo:
      "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    token2Logo:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
  },
];

export default function PoolsSection() {
  return (
    <div className="w-full">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Top pools</CardTitle>
          <Button className="gradient-pink text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Liquidity
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 text-sm font-medium text-muted-foreground">
                    Pool
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                    TVL
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                    Volume 24H
                  </th>
                  <th className="text-right py-3 text-sm font-medium text-muted-foreground">
                    APR
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPools.map((pool, index) => (
                  <tr
                    key={pool.pair}
                    className="border-b border-border/20 hover:bg-muted/20 transition-colors cursor-pointer"
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <span className="text-2xl">
                            <img
                              src={pool.token1Logo}
                              className="w-6 h-6 rounded-full"
                            />
                          </span>
                          <span className="text-2xl ml-2">
                            <img
                              src={pool.token2Logo}
                              className="w-6 h-6 rounded-full"
                            />
                          </span>
                        </div>

                        <div>
                          <div className="font-semibold">{pool.pair}</div>
                          <Badge variant="secondary" className="text-xs">
                            {pool.fee}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 font-medium">{pool.tvl}</td>
                    <td className="text-right py-4 font-medium">
                      {pool.volume24h}
                    </td>
                    <td className="text-right py-4">
                      <span className="font-semibold text-green-500">
                        {pool.apr}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
