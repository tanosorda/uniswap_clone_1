"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import WalletConnectModal from "./WalletConnectModal";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <img
                src="https://assets.coingecko.com/coins/images/12504/standard/uniswap-logo.png?1720676669"
                alt=""
              />
            </div>
            <span className="text-xl font-bold text-gradient">Uniswap</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" className="text-primary font-medium">
              Swap
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Tokens
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              NFTs
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              Pool
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Charts</DropdownMenuItem>
                <DropdownMenuItem>Analytics</DropdownMenuItem>
                <DropdownMenuItem>Help Center</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Right side controls */}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                className="justify-start text-primary font-medium"
              >
                Swap
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                Tokens
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                NFTs
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                Pool
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                Charts
              </Button>
            </nav>

            <div className="flex flex-col space-y-2 pt-4 border-t border-border/40">
              <Button variant="outline" size="sm" className="justify-start">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                Ethereum
              </Button>
              <Button
                className="gradient-pink text-white font-medium"
                onClick={() => setIsWalletModalOpen(true)}
              >
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={() => {}}
      />
    </header>
  );
}
