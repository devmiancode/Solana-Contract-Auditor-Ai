import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FundAmountProps {
  fundAmount: string;
  balance: number;
  hasAttemptedSubmit: boolean;
  onAmountChange: (value: string) => void;
}

export function FundAmount({ 
  fundAmount, 
  balance, 
  hasAttemptedSubmit, 
  onAmountChange 
}: FundAmountProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="fund-amount" className="text-white text-xl font-semibold">
        Fund Amount
      </Label>
      <div className="flex space-x-2">
        <Input
          id="fund-amount"
          type="number"
          min="0"
          step="0.000000001"
          max={balance}
          placeholder={`Enter amount (max ${balance.toFixed(9)} SOL)`}
          value={fundAmount}
          onChange={(e) => onAmountChange(e.target.value)}
          className="flex-grow bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white placeholder-white/50 focus:text-white"
        />
      </div>
      {hasAttemptedSubmit && (!fundAmount.trim() || Number(fundAmount) <= 0) && (
        <p className="text-red-500 text-sm mt-1">Fund amount must be greater than 0.</p>
      )}
      {hasAttemptedSubmit && Number(fundAmount) > balance && (
        <p className="text-red-500 text-sm mt-1">Amount cannot exceed wallet balance ({balance} SOL).</p>
      )}
    </div>
  )
}
