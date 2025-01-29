import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Lock, Globe, Users, Image } from "lucide-react"

type PrivacyOption = "public" | "private" | "dao" | "nft"

interface CapsulePrivacySelectorProps {
  selectedPrivacy: PrivacyOption
  onPrivacyChange: (privacy: PrivacyOption) => void
}

export function CapsulePrivacySelector({ selectedPrivacy, onPrivacyChange }: CapsulePrivacySelectorProps) {
  return (
    <div className="space-y-4" style={{ zIndex: 0 }}>
      <Label className="text-lg font-semibold text-[#ffffff]">Capsule Privacy</Label>
      <RadioGroup value={selectedPrivacy} onValueChange={onPrivacyChange as (value: string) => void}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { value: "public", label: "Public", icon: Globe },
            { value: "private", label: "Private", icon: Lock },
            { value: "dao", label: "DAO Shared", icon: Users },
            { value: "nft", label: "NFT Gated Access", icon: Image },
          ].map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className={`flex items-center space-x-3 cursor-pointer p-4 rounded-lg transition-colors ${
                selectedPrivacy === option.value
                  ? "bg-gradient-to-r from-blue-400 to-purple-600 text-white"
                  : "bg-black/30 border border-blue-400/30 hover:bg-blue-400/10"
              }`}
            >
              <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
              <option.icon className={`w-5 h-5 ${selectedPrivacy === option.value ? "text-white" : "text-white"}`} />
              <span className={selectedPrivacy === option.value ? "text-white font-semibold" : "text-white"}>
                {option.label}
              </span>
            </Label>
          ))}
        </div>
      </RadioGroup>
    </div>
  )
}

