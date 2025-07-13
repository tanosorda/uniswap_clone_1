"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const popularTokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$3,421.50",
    change: "+2.45%",
    changeValue: "+$81.84",
    logo: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
    volume: "$2.1B",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    price: "$1.0001",
    change: "+0.01%",
    changeValue: "+$0.0001",
    logo: "https://assets.coingecko.com/coins/images/6319/standard/usdc.png?1696506694",
    volume: "$1.8B",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    price: "$67,234",
    change: "+1.23%",
    changeValue: "+$817.50",
    logo: "https://assets.coingecko.com/coins/images/7598/standard/wrapped_bitcoin_wbtc.png?1696507857",
    volume: "$890M",
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    price: "$12.34",
    change: "+5.67%",
    changeValue: "+$0.66",
    logo: "https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669",
    volume: "$245M",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: "$18.45",
    change: "+3.21%",
    changeValue: "+$0.59",
    logo: "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
    volume: "$178M",
  },
  {
    symbol: "AAVE",
    name: "Aave",
    price: "$156.78",
    change: "-1.45%",
    changeValue: "-$2.31",
    logo: "https://assets.coingecko.com/coins/images/12645/standard/aave-token-round.png?1720472354",
    volume: "$98M",
  },
];

export default function PopularTokens() {
  return (
    <div className="w-full">
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Popular tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {popularTokens.map((token, index) => (
              <div
                key={token.symbol}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-muted-foreground w-6">
                      {index + 1}
                    </span>
                    <img
                      src={token.logo}
                      alt={token.name}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHRleHQgeD0iNiIgeT0iOCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+JHt0b2tlbi5zeW1ib2wuc3Vic3RyaW5nKDAsIDIpfTwvdGV4dD4KPC9zdmc+Cjwvc3ZnPgo=`;
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {token.name}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-lg">{token.price}</div>
                  <div className="text-sm text-muted-foreground">
                    Vol: {token.volume}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`flex items-center space-x-1 ${
                      token.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {token.change.startsWith("+") ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium">{token.change}</span>
                  </div>
                  <div
                    className={`text-sm ${
                      token.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {token.changeValue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
