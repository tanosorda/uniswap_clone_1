"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, ExternalLink, QrCode } from "lucide-react";

interface WalletOption {
  name: string;
  icon: string;
  description: string;
  qrCode: string;
}

const wallets: WalletOption[] = [
  {
    name: "Uniswap Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRkZGRkUiLz4KPHBhdGggZD0iTTE2IDI0LjVDMjAuNjY4IDI0LjUgMjQuNSAyMC42NjggMjQuNSAxNkMyNC41IDExLjMzMiAyMC42NjggNy41IDE2IDcuNUMxMS4zMzIgNy41IDcuNSAxMS4zMzIgNy41IDE2QzcuNSAyMC42NjggMTEuMzMyIDI0LjUgMTYgMjQuNVoiIGZpbGw9IiNGRjAwNzgiLz4KPHBhdGggZD0iTTE2IDIwLjVDMTguNDg1IDIwLjUgMjAuNSAxOC40ODUgMjAuNSAxNkMyMC41IDEzLjUxNSAxOC40ODUgMTEuNSAxNiAxMS41QzEzLjUxNSAxMS41IDExLjUgMTMuNTE1IDExLjUgMTZDMTEuNSAxOC40ODUgMTMuNTE1IDIwLjUgMTYgMjAuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
    description: "Connect using Uniswap Wallet",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iNjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
  },
  {
    name: "WalletConnect",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4NSIgdmlld0JveD0iMCAwIDMwMCAxODUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MS40MzggNjcuNUMxMDYuNzM4IDIyLjIgMTkzLjI2MiAyMi4yIDIzOC41NjIgNjcuNUwyNDUuMTI1IDc0LjA2MjVDMjQ3LjEyNSA3Ni4wNjI1IDI0Ny4xMjUgNzkuMDYyNSAyNDUuMTI1IDgxLjA2MjVMMjI5IDk3LjE4NzVDMjI4IDk4LjE4NzUgMjI2LjUgOTguMTg3NSAyMjUuNSA5Ny4xODc1TDIxNi4zMTIgODhDMTg2LjY4NyA1OC4zNzUgMTEzLjMxMiA1OC4zNzUgODMuNjg3IDg4TDc0LjUgOTcuMTg3NUM3My41IDk4LjE4NzUgNzIgOTguMTg3NSA3MSA5Ny4xODc1TDU0Ljg3NSA4MS4wNjI1QzUyLjg3NSA3OS4wNjI1IDUyLjg3NSA3Ni4wNjI1IDU0Ljg3NSA3NC4wNjI1TDYxLjQzOCA2Ny41WiIgZmlsbD0iIzM5NzZGRiIvPgo8L3N2Zz4K",
    description: "Connect using WalletConnect protocol",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iNjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjEwMCIgeT0iMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
  },
  {
    name: "Coinbase Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMwMDUyRkYiLz4KPHBhdGggZD0iTTEwIDEyQzEwIDEwLjg5NTQgMTAuODk1NCAxMCAxMiAxMEgyMEMyMS4xMDQ2IDEwIDIyIDEwLjg5NTQgMjIgMTJWMjBDMjIgMjEuMTA0NiAyMS4xMDQ2IDIyIDIwIDIySDEyQzEwLjg5NTQgMjIgMTAgMjEuMTA0NiAxMCAyMFYxMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
    description: "Connect to your Coinbase Wallet",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwNTJGRiIvPgo8cmVjdCB4PSI4MCIgeT0iNDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwNTJGRiIvPgo8cmVjdCB4PSIxMjAiIHk9IjQwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiMwMDUyRkYiLz4KPC9zdmc+",
  },
  {
    name: "Binance Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0JBMkYiLz4KPHBhdGggZD0iTTEyIDEwTDE2IDE0TDIwIDEwTDIyIDEyTDE2IDE4TDEwIDEyTDEyIDEwWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTEwIDIwTDE0IDE2TDEwIDEyTDEyIDEwTDE4IDE2TDEyIDIyTDEwIDIwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+",
    description: "Connect to your Binance Wallet",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI2MCIgeT0iNjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0YzQkEyRiIvPgo8cmVjdCB4PSIxMDAiIHk9IjYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGM0JBMkYiLz4KPHJlY3QgeD0iMTQwIiB5PSI2MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRjNCQTJGIi8+Cjwvc3ZnPgo=",
  },
  {
    name: "Trust Wallet",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMzMkJFRkYiLz4KPHBhdGggZD0iTTIyIDEyLjVMOCAyMEwxMiAyNEwyNiAxNi41TDIyIDEyLjVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
    description: "Connect to your Trust Wallet",
    qrCode: "https://randomqr.com/assets/images/randomqr-256.png",
  },
  {
    name: "MetaMask",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGRjYwMjkiLz4KPHBhdGggZD0iTTIwLjEyNSAxNC4zNzVMMTYgOC41TDExLjg3NSAxNC4zNzVMMTAgMTMuMTI1TDE2IDRMOS41IDExLjVMNy43NSAyMy41TDE2IDI4TDI0LjI1IDIzLjVMMjIuNSAxMS41TDE2IDRMMjIgMTMuMTI1TDIwLjEyNSAxNC4zNzVaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
    description: "Connect to your MetaMask",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI3MCIgeT0iNzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0ZGNjAyOSIvPgo8cmVjdCB4PSIxMDAiIHk9IjcwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRjYwMjkiLz4KPHJlY3QgeD0iMTMwIiB5PSI3MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkY2MDI5Ii8+Cjwvc3ZnPgo=",
  },
];

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void; // Новый пропс
}

export default function WalletConnectModal({
  isOpen,
  onClose,
  onConnect,
}: WalletConnectModalProps) {
  const [selectedWallet, setSelectedWallet] = useState<WalletOption | null>(
    null
  );
  const [showQR, setShowQR] = useState(false);

  const handleWalletSelect = (wallet: WalletOption) => {
    setSelectedWallet(wallet);
    setShowQR(true);
  };

  const handleBack = () => {
    setShowQR(false);
    setSelectedWallet(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!showQR ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold">
                Connect a wallet
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3 mt-4">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="w-full justify-start p-4 h-auto hover:bg-muted/50"
                  onClick={() => handleWalletSelect(wallet)}
                >
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-8 h-8 mr-4"
                  />
                  <div className="text-left">
                    <div className="font-semibold">{wallet.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {wallet.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            <div className="text-center text-sm text-muted-foreground mt-4">
              By connecting a wallet, you agree to Uniswap's{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="w-fit p-0 text-muted-foreground hover:text-foreground"
              >
                ← Back
              </Button>
              <DialogTitle className="text-center text-xl font-bold">
                {selectedWallet?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              {/* QR Code */}
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white rounded-xl border-2 border-muted">
                  <img
                    src={selectedWallet?.qrCode}
                    alt="QR Code"
                    className="w-48 h-48"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold mb-2">
                    Scan with {selectedWallet?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Open your {selectedWallet?.name} app and scan this QR code
                  </div>
                </div>
              </div>

              {/* Connection URI */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Connection URI</div>
                <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 text-xs truncate">
                    wc:a281567bb3e4f...@2?relay-protocol=irn
                  </code>
                  <Button size="sm" variant="ghost" className="p-1">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Alternative options */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open("#", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open {selectedWallet?.name} App
                </Button>
              </div>

              {/* Кнопка подтверждения подключения */}
              <Button className="w-full" onClick={onConnect}>
                I've connected
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                Make sure your wallet supports the Ethereum network
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
