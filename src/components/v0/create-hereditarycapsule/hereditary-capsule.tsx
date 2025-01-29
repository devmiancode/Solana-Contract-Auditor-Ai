"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import styles from "@/app/css/toggle-switch.module.css"
import {
  ArrowRight,
  Wallet,
  DollarSign,
  Link,
  MessageSquare,
  Image,
  Calendar,
  ArrowLeft,
  Plus,
  Percent,
  X,
} from "lucide-react"
import Header from "@/components/v0/v0-components/header"
import { DatePicker } from "@/components/v0/create-hereditarycapsule/inputs/date-picker"
import { AIInsightsPanel } from "@/components/v0/create-hereditarycapsule/aioptions"
import { CapsuleReviewModal } from "@/components/v0/create-hereditarycapsule/capsulesummaryreview"
import { PopUp } from "@/components/v0/create-hereditarycapsule/confirmationpopup"
import { Textarea } from "@/components/ui/textarea"
import GeometricShape from "@/components/ui/geometricshape"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import CapsuleTypeCard from "@/components/v0/v0-components/capsuletypescards"
import BackGlowingButton from "@/components/ui/backglowingbutton"
import TooltipInfo from "@/components/ui/tooltipInfo"
import AI_button from "@/components/ui/aibutton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { FundAmount } from "./inputs/fundamount"
import { HeirWallet } from "./inputs/heirwallet"


const capsuleTypes = [
  {
    id: "hereditary",
    title: "Hereditary wallet",
    description:
      "Securely transfers crypto assets to heirs after a set inactivity period, ensuring decentralized inheritance.",
    icon: DollarSign
  },
  {
    id: "smart-contract",
    title: "Smart Contract Execution",
    description: "Automate blockchain actions by scheduling smart contract executions at a future date.",
    icon: Link
  },
  {
    id: "message",
    title: "Time-Released Message",
    description: "Send encrypted messages to your future self or loved ones, unlocking at a specified date.",
    icon: MessageSquare
  },
  {
    id: "nft",
    title: "NFT Time Vault",
    description: "Securely lock and release NFTs at a future date for collectors, gifts, or legacy preservation.",
    icon: Image
  }
]

interface HereditaryCapsuleData {
  name: string;
  unlockDate: Date | null;
  hasDowntime: boolean;
  isPrivate: boolean;
  transferType: 'full' | 'percentage';
  amount: number;
  heirWalletAddress: string;
  description: string;
  downtimeWallet: string;
  downtimeUnit: string;
}

export default function CreateCapsulePage() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)
  const [fundAmount, setFundAmount] = useState("")
  const [fundPercentage, setFundPercentage] = useState("")
  const [unlockDate, setUnlockDate] = useState<Date | null>(null)
  const [selectedAction] = useState("auto-send")
  const [transactionConfirmed, setTransactionConfirmed] = useState(false)
  const [capsuleId, setCapsuleId] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [externalLink, setExternalLink] = useState("")
  const [capsulePrivacy, setCapsulePrivacy] = useState<"public" | "private" | "dao" | "nft">("private")
  const [whitelistedAddresses, setWhitelistedAddresses] = useState<string[]>([])
  const [uploadedContent, setUploadedContent] = useState<string | File | null>(null)
  const [walletType, setWalletType] = useState<"Phantom" | "Solflare" | "Ledger">("Phantom")
  const [walletAddress, setWalletAddress] = useState("7x4JxRXVE4YVHwjVPf2CT9mFkXmNVdgBFhcLWxmxmH7q")
  const [solBalance, setSolBalance] = useState(2.5)
  const [transactionType, setTransactionType] = useState<"Token Transfer" | "Smart Contract Call" | "DAO Execution">(
    "Smart Contract Call",
  )
  const [network, setNetwork] = useState<"Devnet" | "Testnet" | "Mainnet">("Devnet")
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [capsuleName, setCapsuleName] = useState("")
  const [heirAddresses, setHeirAddresses] = useState<string[]>([])
  const [newHeirAddress, setNewHeirAddress] = useState("")
  const [showConfirmationDesign, setShowConfirmationDesign] = useState(false)
  const [messageContent, setMessageContent] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isHeirAddressFocused, setIsHeirAddressFocused] = useState(false)
  const [isCapsulaNameFocused, setIsCapsulaNameFocused] = useState(false)
  const [fundInputType, setFundInputType] = useState<"amount" | "percentage">("amount")
  const [downtimeWallet, setDowntimeWallet] = useState("")
  const [downtimeUnit, setDowntimeUnit] = useState<string>("month")
  const [isDowntimeWalletEnabled, setIsDowntimeWalletEnabled] = useState(false)
  const [isFundLockingEnabled, setIsFundLockingEnabled] = useState(false)
  const [capsuleData, setCapsuleData] = useState<HereditaryCapsuleData>({
    name: '',
    unlockDate: null,
    hasDowntime: false,
    isPrivate: true,
    transferType: 'full',
    amount: 0,
    heirWalletAddress: '',
    description: '',
    downtimeWallet: '',
    downtimeUnit: ''
  })
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false)
  const [balance, setBalance] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)

  useEffect(() => {
    setIsFormValid(
      validateHeirAddresses() &&
        capsuleName.trim() !== "" &&
        ((fundInputType === "amount" && fundAmount.trim() !== "" && Number(fundAmount) > 0) ||
          (fundInputType === "percentage" &&
            fundPercentage.trim() !== "" &&
            Number(fundPercentage) > 0 &&
            Number(fundPercentage) <= 100)),
    )
  }, [heirAddresses, capsuleName, fundAmount, fundPercentage, fundInputType])

  useEffect(() => {
    if (showConfirmationDesign || selectedType === null) {
      window.scrollTo(0, 0)
    }
  }, [showConfirmationDesign, selectedType])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const getBalance = async () => {
      if (connected && publicKey) {
        try {
          const devnetConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
          const balanceInLamports = await devnetConnection.getBalance(publicKey);
          const balanceInSOL = balanceInLamports / 1e9;
          console.log('Balance actual en devnet:', balanceInSOL, 'SOL');
          setBalance(balanceInSOL);
        } catch (error) {
          console.error('Error al obtener balance:', error);
        }
      }
    };

    getBalance();
  }, [publicKey, connected]);

  const validateHeirAddress = (address: string) => {
    const alphanumericRegex = /^[a-zA-Z0-9]{44}$/
    return alphanumericRegex.test(address)
  }

  const validateHeirAddresses = () => {
    return heirAddresses.every(validateHeirAddress)
  }

  const addHeirAddress = () => {
    if (validateHeirAddress(newHeirAddress) && !heirAddresses.includes(newHeirAddress)) {
      setHeirAddresses([...heirAddresses, newHeirAddress])
      setNewHeirAddress("")
    }
  }

  const removeHeirAddress = (addressToRemove: string) => {
    setHeirAddresses(heirAddresses.filter((address) => address !== addressToRemove))
  }

  const handleInputChange = (field: keyof HereditaryCapsuleData, value: any) => {
    setCapsuleData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    const errors: string[] = [];

    // Validar nombre de la cápsula
    if (!capsuleName.trim()) {
      errors.push("Capsule name is required");
    }

    // Validar fecha de desbloqueo completa
    if (!unlockDate || !unlockDate.getHours() || !unlockDate.getMinutes()) {
      errors.push("Valid unlock date required");
    }

    // Validar cantidad o porcentaje
    if (fundInputType === "amount") {
      if (!fundAmount.trim() || Number(fundAmount) <= 0) {
        errors.push("Fund amount must be greater than 0");
      } else if (Number(fundAmount) > balance) {
        errors.push("Fund amount cannot exceed wallet balance");
      }
    } else {
      if (!fundPercentage.trim() || Number(fundPercentage) <= 0 || Number(fundPercentage) > 100) {
        errors.push("Fund percentage must be between 0 and 100");
      }
    }

    // Validar tiempo de inactividad si downtime wallet está activo
    if (capsuleData.hasDowntime && (!downtimeWallet || Number(downtimeWallet) <= 0)) {
      errors.push("Downtime period is required when downtime wallet is enabled");
    }

    // Validar al menos una wallet
    if (heirAddresses.length === 0) {
      errors.push("At least one heir wallet address is required");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  useEffect(() => {
    if (hasAttemptedSubmit) {
      const { isValid } = validateForm();
      setIsFormValid(isValid);
    }
  }, [
    capsuleName,
    unlockDate,
    fundAmount,
    fundPercentage,
    fundInputType,
    heirAddresses,
    downtimeWallet,
    capsuleData.hasDowntime,
    hasAttemptedSubmit
  ]);

  const handleCreateCapsule = () => {
    setHasAttemptedSubmit(true);
    const validation = validateForm();
    
    if (validation.isValid) {
      setIsReviewModalOpen(true);
    } else {
      // Mostrar errores en consola (opcional)
      validation.errors.forEach(error => {
        console.error(error);
      });
    }
  }

  const handleConfirmTransaction = () => {
    // Validación final
    const validation = validateForm();
    if (!validation.isValid) {
      console.error("Validation failed:", validation.errors);
      return;
    }

    // Preparar los datos de la cápsula en el formato correcto
    const newCapsule = {
      id: Date.now(), // Generar un ID único
      name: capsuleName,
      unlockDate: unlockDate?.toISOString() || new Date().toISOString(),
      status: "Locked",
      type: "Hereditary",
      content: `Distribution: ${fundInputType === "amount" ? 
        `${fundAmount} SOL` : 
        `${fundPercentage}% of wallet balance (≈${(Number(balance) * Number(fundPercentage) / 100).toFixed(3)} SOL)`}`,
      description: `Heirs: ${heirAddresses.length}\nDowntime: ${capsuleData.hasDowntime ? `${downtimeWallet} ${downtimeUnit}(s)` : 'Disabled'}\nFund Locking: ${isFundLockingEnabled ? 'Enabled' : 'Disabled'}`,
      visibility: "Private" as const,
      isPublic: false,
      isLocked: true,
      canExtend: true,
      timeLeft: "Calculating...",
      formattedDate: unlockDate?.toLocaleDateString() || new Date().toLocaleDateString(),
      heirAddresses: heirAddresses,
      fundAmount: fundAmount,
      fundPercentage: fundPercentage,
      fundInputType: fundInputType,
      downtimeEnabled: capsuleData.hasDowntime,
      downtimeWallet: downtimeWallet,
      downtimeUnit: downtimeUnit,
      isFundLockingEnabled: isFundLockingEnabled
    };

    // Guardar la nueva cápsula en localStorage
    localStorage.setItem("newCapsule", JSON.stringify(newCapsule));
    
    setIsReviewModalOpen(false);
    setIsConfirmationPopupVisible(true);
  }

  const handleCloseConfirmationPopup = () => {
    setIsConfirmationPopupVisible(false)
    handleCreateAnotherCapsule()
  }

  const handleFileUpload = (file: File) => {
    setUploadedFile(file)
    setUploadedContent(file)
  }

  const handleLinkChange = (link: string) => {
    setExternalLink(link)
  }

  const handleAddWhitelistAddress = (address: string) => {
    setWhitelistedAddresses([...whitelistedAddresses, address])
  }

  const handleRemoveWhitelistAddress = (address: string) => {
    setWhitelistedAddresses(whitelistedAddresses.filter((a) => a !== address))
  }

  const handleSuggestedDateSelect = (date: Date, formattedDate: string) => {
    setUnlockDate(date)
  }

  const handleBackToCapsuleSelection = () => {
    setSelectedType(null)
  }

  const handleCapsuleReviewClick = () => {
    setIsReviewModalOpen(true)
  }

  const getBackgroundImage = () => {
    return "bg-transparent"
  }

  const handleCreateAnotherCapsule = () => {
    setSelectedType(null)
    setCapsuleName("")
    setFundAmount("")
    setFundPercentage("")
    setUnlockDate(new Date())
    setHeirAddresses([])
    setNewHeirAddress("")
    setMessageContent("")
    setUploadedFile(null)
    setExternalLink("")
    setCapsulePrivacy("private")
    setShowConfirmationDesign(false)
    setFundInputType("amount")
    setDowntimeWallet("")
    setDowntimeUnit("month")
    setIsDowntimeWalletEnabled(false)
    setIsFundLockingEnabled(false)
  }

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      setAmount(numValue);
      setCapsuleData(prev => ({ ...prev, amount: numValue }));
      setFundAmount(value);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={`min-h-screen ${getBackgroundImage()} relative`}>
      <div className="sphere-gradient sphere-gradient-1"></div>
      <div className="sphere-gradient sphere-gradient-2"></div>
      <div className="relative z-10 bg-transparent min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-32 relative z-10">
          {showConfirmationDesign ? (
            <PopUp
              isVisible={isConfirmationPopupVisible}
              onClose={handleCloseConfirmationPopup}
            />
          ) : (
            <>
              {!selectedType ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                  >
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-purple-600">
                      Create Your Time Capsule
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl text-white max-w-3xl mx-auto mb-8">
                      Choose a capsule type to begin your journey through time
                    </p>
                    <Suspense fallback={<div className="h-[200px] bg-gray-800 animate-pulse rounded-lg"></div>}>

                    </Suspense>
                  </motion.div>

                  <div className="flex justify-center mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
                      {capsuleTypes.map((type, index) => (
                        <motion.div
                          key={type.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <CapsuleTypeCard
                            id={type.id}
                            title={type.title}
                            description={type.description}
                            icon={type.icon}
                            onClick={() => setSelectedType(type.id)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                  >
                    <BackGlowingButton onClick={handleBackToCapsuleSelection} className="w-full max-w-md text-sm" />
                    <h2 className="text-3xl font-bold mt-6 text-white">
                      {capsuleTypes.find((type) => type.id === selectedType)?.title}
                    </h2>
                  </motion.div>

                  {selectedType === "hereditary" && (
                    <div className="mb-8 space-y-8">
                      <div className="relative">
                        <Card className="bg-[#0a0a0a] border-none backdrop-blur-sm relative overflow-hidden transform perspective-1000 rotate-y-1 hover:rotate-y-2 transition-transform duration-500 shadow-[0_20px_50px_rgba(96,_165,_250,_0.7)] hover:shadow-[0_20px_60px_rgba(124,_58,_237,_0.8)]">
                          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 transform-gpu rotate-x-2"></div>
                          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-slate-50 to-purple-600" />
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-slate-50 to-purple-600 opacity-50 blur-[2px]" />
                          <div className="relative z-20 shadow-[inset_0_1px_8px_rgba(255,255,255,0.1)]">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-slate-50 to-purple-600">
                                Capsule Settings
                              </CardTitle>
                              <CardDescription className="text-lg text-[#a1a1aa]">
                                Configure your time capsule's basic settings and privacy options
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                                <div className="w-full md:w-1/2 space-y-8">
                                  <div className="space-y-4">
                                    <Label htmlFor="capsule-name" className="text-lg font-semibold text-[#ffffff]">
                                      Capsule Name
                                    </Label>
                                    <Input
                                      id="capsule-name"
                                      value={capsuleName}
                                      onChange={(e) => setCapsuleName(e.target.value)}
                                      placeholder="Enter capsule name"
                                      className={`w-full bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white placeholder-white/90`}
                                      onFocus={() => setIsCapsulaNameFocused(true)}
                                      onBlur={() => setIsCapsulaNameFocused(false)}
                                    />
                                    {hasAttemptedSubmit && !capsuleName.trim() && (
                                      <p className="text-red-500 text-sm">Capsule name is required.</p>
                                    )}
                                  </div>

                                  <div className="space-y-4">
                                    <div className="flex items-center">
                                      <Label htmlFor="unlock-date" className="text-lg font-semibold text-[#ffffff]">
                                        Unlock Date
                                      </Label>
                                      <TooltipInfo text="This is the date when your capsule will be unlocked and its contents will be accessible." />
                                    </div>
                                    <DatePicker
                                      id="unlock-date"
                                      selected={unlockDate}
                                      onSelect={(date: Date | undefined) => date && setUnlockDate(date)}
                                      minDate={new Date()}
                                      className="w-full bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white"
                                      options={[
                                        { value: "1", label: "1 Year" },
                                        { value: "3", label: "3 Years" },
                                        { value: "5", label: "5 Years" },
                                        { value: "10", label: "10 Years" },
                                      ]}
                                    />
                                    {hasAttemptedSubmit && (!unlockDate || !unlockDate.getHours() || !unlockDate.getMinutes()) && (
                                      <p className="text-red-500 text-sm">Valid unlock date required</p>
                                    )}
                                  </div>

                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center">
                                        <Label htmlFor="downtime-wallet" className="text-lg font-semibold text-[#ffffff]">
                                          Downtime Wallet
                                        </Label>
                                        <TooltipInfo text="This sets the period of inactivity for your wallet." />
                                      </div>
                                      <div className={styles.container}>
                                        <input
                                          type="checkbox"
                                          id="downtime-wallet-toggle"
                                          className={styles.checkbox}
                                          checked={capsuleData.hasDowntime}
                                          onChange={(e) => handleInputChange('hasDowntime', e.target.checked)}
                                        />
                                        <label htmlFor="downtime-wallet-toggle" className={styles.label}></label>
                                      </div>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Input
                                        id="downtime-wallet"
                                        type="number"
                                        min="0"
                                        placeholder="Time"
                                        value={downtimeWallet}
                                        onChange={(e) => setDowntimeWallet(e.target.value)}
                                        className="w-24 bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white placeholder-white/50"
                                        disabled={!capsuleData.hasDowntime}
                                      />
                                      <Select
                                        value={downtimeUnit}
                                        onValueChange={setDowntimeUnit}
                                        disabled={!capsuleData.hasDowntime}
                                      >
                                        <SelectTrigger className="bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white">
                                          <SelectValue placeholder="Unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="day">Day</SelectItem>
                                          <SelectItem value="month">Month</SelectItem>
                                          <SelectItem value="year">Year</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    {hasAttemptedSubmit && capsuleData.hasDowntime && (!downtimeWallet || Number(downtimeWallet) <= 0) && (
                                      <p className="text-red-500 text-sm">Downtime period is required when downtime wallet is enabled.</p>
                                    )}
                                  </div>
                                </div>

                                <div className="w-full md:w-1/2 h-[400px] flex items-center justify-center">
                                  <GeometricShape />
                                </div>
                              </div>
                            </CardContent>
                          </div>
                          {/* Blue-Purple gradient sphere */}
                          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-bl from-blue-400 via-indigo-500 to-purple-600 opacity-20 blur-2xl transform -translate-y-1/4 translate-x-1/4" />
                          {/* Lighter Blue-Purple gradient sphere */}
                          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-blue-300 via-indigo-400 to-purple-500 opacity-20 blur-2xl transform translate-y-1/4 -translate-x-1/4" />
                        </Card>
                      </div>

                      <div className="relative">
                        <Card className="bg-[#0a0a0a] border-none backdrop-blur-sm relative overflow-hidden">
                          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-purple-600" />
                          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-blue-400 to-purple-600 opacity-50 blur-[2px]" />
                          {/* Blue-Purple gradient sphere */}
                          <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 opacity-20 blur-2xl transform -translate-y-1/4 translate-x-1/4" />
                          {/* Lighter Blue-Purple gradient sphere */}
                          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-tr from-blue-300 via-indigo-400 to-purple-500 opacity-20 blur-2xl transform translate-y-1/4 -translate-x-1/4" />
                          <div className="relative z-20">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
                              Wallet And Fund Settings
                              </CardTitle>
                              <CardDescription className="text-lg text-[#a1a1aa]">
                                Configure inheritance settings and fund locking options
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                              {/* Switches Section */}
                              <div className="space-y-4">
                                {/* Fund Type Toggle */}
                                <div className="flex items-center">
                                  <div className="w-32">
                                    <Label htmlFor="fund-type" className="text-purple-600 text-xl font-semibold">
                                      Fund Type
                                    </Label>
                                  </div>
                                  <TooltipInfo text="Choose between locking a specific amount or a percentage of your funds." />
                                  <div className="flex items-center space-x-2 ml-4">
                                    <div className={styles.container}>
                                      <input
                                        type="checkbox"
                                        id="fund-type"
                                        className={styles.checkbox}
                                        checked={fundInputType === "percentage"}
                                        onChange={(e) => {
                                          setFundInputType(e.target.checked ? "percentage" : "amount");
                                          // Limpiar los inputs al cambiar de tipo
                                          if (e.target.checked) {
                                            setFundAmount("");
                                          } else {
                                            setFundPercentage("");
                                          }
                                        }}
                                      />
                                      <label htmlFor="fund-type" className={styles.label}></label>
                                    </div>
                                    <span className="text-white text-sm">
                                      {fundInputType === "amount" ? "Amount" : "Percentage"}
                                    </span>
                                  </div>
                                </div>

                                {/* Fund Locking Toggle */}
                                <div className="flex items-center">
                                  <div className="w-32">
                                    <Label
                                      htmlFor="fund-locking"
                                      className="text-purple-600 text-xl font-semibold"
                                    >
                                      Fund Locking
                                    </Label>
                                  </div>
                                  <TooltipInfo text="Enable fund locking to secure your assets on the app, withdraw your funds at any time. Or the transaction will be executed at the specified time, giving you the freedom to manage them as you wish." />
                                  <div className="flex items-center space-x-2 ml-4">
                                    <div className={styles.container}>
                                      <input
                                        type="checkbox"
                                        id="fund-locking"
                                        className={styles.checkbox}
                                        checked={isFundLockingEnabled}
                                        onChange={(e) => setIsFundLockingEnabled(e.target.checked)}
                                      />
                                      <label htmlFor="fund-locking" className={styles.label}></label>
                                    </div>
                                    <span className="text-white text-sm">
                                      {isFundLockingEnabled ? "ON" : "OFF"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Inputs Section */}
                              <div className="flex flex-col gap-8">
                                {/* Fund Amount/Percentage Column */}
                                <div className="w-full md:w-1/2 space-y-4">
                                  {fundInputType === "amount" ? (
                                    <FundAmount
                                      fundAmount={fundAmount}
                                      balance={balance}
                                      hasAttemptedSubmit={hasAttemptedSubmit}
                                      onAmountChange={handleAmountChange}
                                    />
                                  ) : (
                                    <div className="space-y-2">
                                      <Label htmlFor="fund-percentage" className="text-white text-xl font-semibold">
                                        Fund Percentage
                                      </Label>
                                      <div className="flex items-center space-x-2">
                                        <Input
                                          id="fund-percentage"
                                          type="number"
                                          min="0"
                                          max="100"
                                          step="0.01"
                                          placeholder="Enter percentage"
                                          value={fundPercentage}
                                          onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value <= 100) {
                                              setFundPercentage(e.target.value);
                                            }
                                          }}
                                          className="flex-grow bg-gradient-to-r from-blue-400 to-purple-600 border-none text-white placeholder-white/50 focus:text-white"
                                        />
                                      </div>
                                      {hasAttemptedSubmit &&
                                        (!fundPercentage.trim() ||
                                          Number(fundPercentage) <= 0 ||
                                          Number(fundPercentage) > 100) && (
                                          <p className="text-red-500 text-sm mt-1">
                                            Fund percentage must be between 0 and 100.
                                          </p>
                                        )}
                                    </div>
                                  )}
                                </div>

                                {/* Heir's Wallet Addresses Column */}
                                <HeirWallet
                                  newHeirAddress={newHeirAddress}
                                  heirAddresses={heirAddresses}
                                  hasAttemptedSubmit={hasAttemptedSubmit}
                                  fundInputType={fundInputType}
                                  fundAmount={fundAmount}
                                  fundPercentage={fundPercentage}
                                  onNewHeirAddressChange={setNewHeirAddress}
                                  onAddHeirAddress={addHeirAddress}
                                  onRemoveHeirAddress={removeHeirAddress}
                                />
                              </div>

                              <style jsx global>{`
                                .custom-scrollbar::-webkit-scrollbar {
                                  width: 8px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                  background: rgba(0, 0, 0, 0.2);
                                  border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                  background: linear-gradient(to bottom, #4169E1, #9370DB);
                                  border-radius: 4px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                  background: linear-gradient(to bottom, #3158D0, #8260CB);
                                }
                              `}</style>
                            </CardContent>
                          </div>
                        </Card>
                      </div>

                      <div className="w-full">
                        <div className="bg-transparent rounded-lg p-4">
                          <AIInsightsPanel selectedDate={unlockDate} onDateSuggestion={handleSuggestedDateSelect} />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <AI_button
                          onClick={handleCreateCapsule}
                          className="w-full max-w-md mx-auto text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                          Capsule Review
                        </AI_button>
                      </div>
                    </div>
                  )}

                  {selectedType === "message" && (
                    <div className="space-y-2">
                      <Label htmlFor="message-content" className="text-[#f7e2ad]">
                        📝 Message Content
                      </Label>
                      <Textarea
                        id="message-content"
                        placeholder="Enter your time-locked message"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        className="w-full bg-black/50 border-[#d8b04a]/30 text-[#f7e2ad] placeholder-[#d8b04a]/50"
                      />
                    </div>
                  )}

                  {selectedType !== "hereditary" && selectedType !== "message" && (
                    <div className="mb-8">
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                          {/* Placeholder for future file upload feature */}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mb8"></div>
                </>
              )}
            </>
          )}
        </main>{" "}
      </div>{" "}
      <CapsuleReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onConfirm={handleConfirmTransaction}
        validateForm={validateForm}
        walletAddress={walletAddress}
        capsuleData={{
          name: capsuleName,
          type: selectedType || "Unknown",
          unlockDate,
          heirAddresses,
          fundAmount,
          fundType: fundInputType === "amount" ? "SOL" : "%",
          hasDowntime: capsuleData.hasDowntime,
          downtimeWallet,
          downtimeUnit,
          balance,
          isFundLockingEnabled,
          fundInputType,
          fundPercentage
        }}
      />
      <PopUp 
        isVisible={isConfirmationPopupVisible}
        onClose={handleCloseConfirmationPopup}
      />
    </div>
  )
}
;<style jsx global>{`
.sphere-gradient {
  position: fixed;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 1;
  z-index: 1;
}

.sphere-gradient-1 {
  width: 100vw;
  height: 100vw;
  top: -50vh;
  left: -50vw;
  background: radial-gradient(circle, rgba255, 0, 0, 0.7), rgba(0, 0, 255, 0.7));
}

.sphere-gradient-2 {
  width: 100vw;
  height: 100vw;
  bottom: -50vh;
  right: -50vw;
  background: radial-gradient(circle, rgba(0, 255, 0, 0.7), rgba(255, 255, 0, 0.7));
}
`}</style>

