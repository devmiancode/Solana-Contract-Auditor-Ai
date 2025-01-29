import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Eye, ExternalLink } from "lucide-react"
import { processCapsuleData } from "@/components/conexion/dappsearch";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';

interface CapsuleData {
  name: string;
  type: string;
  unlockDate: Date | string | null;
  heirAddresses: string[];
  fundAmount: string;
  fundType: string;
  hasDowntime: boolean;
  downtimeWallet?: string;
  downtimeUnit?: string;
  balance?: number;
  isFundLockingEnabled: boolean;
  fundInputType: "amount" | "percentage";
  fundPercentage: string;
}

interface CapsuleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  capsuleData: CapsuleData;
  isDemo?: boolean;
  validateForm: () => { isValid: boolean; errors: string[] };
  walletAddress: string;
}

export function CapsuleReviewModal({
  isOpen,
  onClose,
  onConfirm,
  capsuleData,
  isDemo = false,
  validateForm,
}: CapsuleReviewModalProps) {
  const [showAddresses, setShowAddresses] = useState(false);
  const { connection } = useConnection();
  const wallet = useWallet();
  
  const { 
    name, 
    type, 
    unlockDate, 
    fundAmount, 
    fundType, 
    heirAddresses, 
    hasDowntime, 
    downtimeWallet, 
    downtimeUnit, 
    balance,
    isFundLockingEnabled,
    fundInputType,
    fundPercentage
  } = capsuleData;

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not set";
    if (typeof date === 'string') {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(new Date(date));
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  const formatDowntime = () => {
    if (!hasDowntime) return "Disabled";
    return `${downtimeWallet} ${downtimeUnit}${Number(downtimeWallet) > 1 ? 's' : ''}`;
  };

  const calculateDistribution = () => {
    const numHeirs = heirAddresses.length;
    if (fundType === "SOL") {
      return (Number(fundAmount) / numHeirs).toFixed(3);
    } else {
      const percentage = Number(fundAmount);
      const totalAmount = (balance || 0) * (percentage / 100);
      return (totalAmount / numHeirs).toFixed(3);
    }
  };

  const handleConfirmTransaction = async () => {
    const validation = validateForm();
    if (!validation.isValid) {
      console.error("❌ Validación fallida:", validation.errors);
      return;
    }

    try {
      if (!wallet.publicKey) {
        console.error("❌ Wallet no conectada: publicKey es undefined");
        throw new Error("Por favor, conecta tu wallet antes de continuar");
      }

      console.log("🔄 Estado inicial:", {
        walletConnected: wallet.connected,
        walletPublicKey: wallet.publicKey.toString()
      });

      const devnetConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
      console.log("🔑 Wallet conectada:", wallet.publicKey.toString());
      console.log("🌐 Conexión establecida con devnet:", devnetConnection.rpcEndpoint);

      console.log("📝 Datos a procesar:", {
        unlockDate: unlockDate,
        fundAmount: fundAmount,
        fundType: fundType,
        numHeirs: heirAddresses.length,
        heirAddresses: heirAddresses,
        fundInputType: fundInputType,
        fundPercentage: fundPercentage,
        balance: balance
      });

      await processCapsuleData(devnetConnection, wallet, {
        unlockDate: unlockDate,
        fundAmount: fundAmount,
        heirAddresses: heirAddresses,
        fundInputType: fundInputType,
        fundPercentage: fundPercentage,
        balance: balance
      });

      console.log("✅ Proceso completado exitosamente");
      onClose();
      onConfirm();
    } catch (err) {
      const error = err as Error;
      console.error("❌ Error detallado en handleConfirmTransaction:", {
        mensaje: error.message,
        nombre: error.name,
        walletStatus: {
          connected: wallet.connected
        }
      });
      throw error;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black to-gray-900 border-blue-400/50 text-blue-400 shadow-lg shadow-purple-600/20">
          <DialogHeader className="border-purple-600/30 pb-4">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              {isDemo ? "Capsule Review Demo" : "Capsule Summary & Review"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4 grid-cols-1">
            <Card className="bg-black/60 border-purple-600/30 hover:bg-black/70 transition-all duration-300 transform hover:scale-[1.02] w-full">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white border-purple-600/30 pb-2">
                  Capsule Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-purple-600 font-medium">Name:</span>
                    <span className="text-sm sm:text-base text-white font-bold">{name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-purple-600 font-medium">Type:</span>
                    <Badge variant="outline" className="bg-purple-600/20 text-white border-purple-600/50">
                      {type}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-purple-600 font-medium">Fund Locking:</span>
                    <span className="text-sm sm:text-base text-white font-bold">
                      {isFundLockingEnabled ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/60 border-purple-600/30 hover:bg-black/70 transition-all duration-300 transform hover:scale-[1.02] w-full">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white border-purple-600/30 pb-2">
                  Unlock Settings
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Unlock Date:</span>
                    <span className="text-white">{formatDate(unlockDate)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm sm:text-base text-purple-600 font-medium">Downtime Check:</span>
                    <div className="flex items-center text-sm sm:text-base text-white">
                      <Clock className="w-4 h-4" />
                      <span className="ml-2">{formatDowntime()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/60 border-purple-600/30 hover:bg-black/70 transition-all duration-300 transform hover:scale-[1.02] w-full">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white border-purple-600/30 pb-2">
                  Fund Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white">{fundType === "SOL" ? "Amount" : "Percentage"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total {fundType === "SOL" ? "Amount" : "Percentage"}:</span>
                    <span className="text-white">{fundAmount} {fundType === "SOL" ? "SOL" : "%"}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Distribution:</span>
                      <div className="flex flex-col items-end">
                        <span className="text-white">≈ {calculateDistribution()} SOL each</span>
                        {fundType !== "SOL" && (
                          <span className="text-sm text-gray-400">({(Number(fundAmount) / heirAddresses.length).toFixed(2)}% each)</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Heirs:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{heirAddresses.length} address(es)</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowAddresses(true)}
                          className="h-8 w-8 p-0 hover:bg-white/10"
                        >
                          <Eye className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmTransaction}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none"
              disabled={isDemo}
            >
              {isDemo ? "Demo Mode" : "Confirm & Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddresses} onOpenChange={setShowAddresses}>
        <DialogContent className="sm:max-w-[800px] bg-gradient-to-br from-black to-gray-900 border-blue-400/50 text-blue-400">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl font-bold text-center text-white">
              Heir Addresses
            </DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              List of heir wallet addresses
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {heirAddresses.map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-blue-400/20 hover:bg-black/40 transition-all"
                >
                  <span className="text-white text-lg font-medium break-all mr-4">{address}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(`https://explorer.solana.com/address/${address}?cluster=devnet`, '_blank')}
                    className="h-10 min-w-[40px] p-2 hover:bg-white/10 flex items-center gap-2"
                  >
                    <span className="text-white text-sm hidden sm:inline">View in Explorer</span>
                    <ExternalLink className="h-5 w-5 text-white" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setShowAddresses(false)}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 text-lg"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

