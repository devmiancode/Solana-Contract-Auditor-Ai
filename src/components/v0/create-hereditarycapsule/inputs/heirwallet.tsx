import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

interface HeirWalletProps {
  newHeirAddress: string;
  heirAddresses: string[];
  hasAttemptedSubmit: boolean;
  fundInputType: "amount" | "percentage";
  fundAmount: string;
  fundPercentage: string;
  onNewHeirAddressChange: (value: string) => void;
  onAddHeirAddress: () => void;
  onRemoveHeirAddress: (address: string) => void;
}

export function HeirWallet({
  newHeirAddress,
  heirAddresses,
  hasAttemptedSubmit,
  fundInputType,
  fundAmount,
  fundPercentage,
  onNewHeirAddressChange,
  onAddHeirAddress,
  onRemoveHeirAddress
}: HeirWalletProps) {
  return (
    <div className="w-full md:w-1/2 space-y-4">
      <div>
        <Label htmlFor="heir-address" className="text-white text-xl font-semibold">
          Heir's Wallet Addresses
        </Label>
        <div className="flex space-x-2 mt-2">
          <Input
            id="heir-address"
            type="text"
            placeholder="Enter heir's wallet address"
            value={newHeirAddress}
            onChange={(e) => onNewHeirAddressChange(e.target.value)}
            className="flex-grow bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white placeholder-white/50 focus:text-white"
            maxLength={44}
          />
          <Button onClick={onAddHeirAddress} className="bg-blue-500 text-white whitespace-nowrap">
            Add Heir
          </Button>
        </div>
      </div>
      
      {/* Contenedor dinámico para las wallets */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        {heirAddresses.map((address, index) => {
          const shareAmount = fundInputType === "amount" 
            ? (Number(fundAmount) / heirAddresses.length).toFixed(2)
            : (Number(fundPercentage) / heirAddresses.length).toFixed(2);
          
          return (
            <div
              key={index}
              className="flex items-center justify-between bg-black/30 p-2 rounded border border-blue-400/20"
            >
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-white truncate">{address}</span>
                <span className="text-blue-400 whitespace-nowrap">
                  ({shareAmount} {fundInputType === "amount" ? "SOL" : "%"})
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveHeirAddress(address)}
                className="text-red-500 hover:text-red-700 hover:bg-red-200/10 shrink-0 ml-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          );
        })}
      </div>
      
      {hasAttemptedSubmit && heirAddresses.length === 0 && (
        <p className="text-red-500 text-sm">At least one heir address is required.</p>
      )}
      <p className="text-white text-sm">
        {fundInputType === "amount"
          ? `The specified amount will be equally divided among ${heirAddresses.length} heir(s).`
          : `The specified percentage will be equally divided among ${heirAddresses.length} heir(s).`}
      </p>
    </div>
  )
}
