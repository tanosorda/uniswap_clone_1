import Header from "@/components/Header";
import SwapInterface from "@/components/SwapInterface";
import PopularTokens from "@/components/PopularTokens";
import PoolsSection from "@/components/PoolsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Swap anytime,
              <br />
              <span className="text-gradient">anywhere.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              The largest on-chain marketplace: buy and sell cryptocurrencies on
              Ethereum and in more than 12 other blockchains.
            </p>
          </div>

          <SwapInterface />

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-gradient">$1.5T+</div>
              <div className="text-muted-foreground">Volume traded</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-gradient">200+</div>
              <div className="text-muted-foreground">Integrations</div>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl font-bold text-gradient">4,000+</div>
              <div className="text-muted-foreground">Community delegates</div>
            </div>
          </div>
        </div>

        {/* Tokens and Pools Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-16">
          <PopularTokens />
          <PoolsSection />
        </div>
      </main>
    </div>
  );
}
