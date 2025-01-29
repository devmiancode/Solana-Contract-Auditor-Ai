import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Box, Clock, ExternalLink, Settings, Calendar, Trash2, Lock, Unlock, Users, Eye, DollarSign, ArrowRight, ArrowLeftRight } from "lucide-react"
import { ModifyCapsuleModal } from "./modifycapsulemodal"
import { DeleteCapsuleModal } from "./deletecapsulemodal"
import { MessageSquare, File } from "lucide-react"

// Ejemplo de cápsula para referencia de diseño
const mockCapsules: Capsule[] = [];

const STORAGE_KEY = 'prototypecapsules_all';

interface CapsuleOverviewDashboardProps {
  onSelectCapsule: (capsule: Capsule | null) => void;
  searchQuery: string;
  updateTrigger: number;
  filterType: string;
}

interface Capsule {
  id: number;
  name: string;
  unlockDate: string;
  status: string;
  type: string;
  content: string;
  description: string;
  visibility: "Public" | "Private" | "DAO-Only";
  isPublic: boolean;
  isLocked: boolean;
  canExtend: boolean;
  timeLeft?: string;
  formattedDate?: string;
  heirAddresses?: string[];
  downtimeEnabled?: boolean;
  downtimeWallet?: string;
  downtimeUnit?: string;
  isFundLockingEnabled?: boolean;
  fundAmount?: string;
  fundPercentage?: string;
  fundInputType?: "amount" | "percentage";
  balance?: number;
  deleted?: boolean;
}

interface CapsuleCardProps {
  capsule: Capsule;
  onSelect: (capsule: Capsule) => void;
  index: number;
  onSaveModifications: (capsule: Capsule) => void;
  setIsModifyModalOpen: (isOpen: boolean) => void;
  setSelectedCapsule: (capsule: Capsule | null) => void;
}

const CapsuleOverviewDashboard = ({
  onSelectCapsule,
  searchQuery,
  updateTrigger,
  filterType,
}: CapsuleOverviewDashboardProps) => {
  const { publicKey, connected } = useWallet();
  const [capsules, setCapsules] = useState<Capsule[]>(mockCapsules);
  const [filteredCapsules, setFilteredCapsules] = useState<Capsule[]>(mockCapsules);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState<Capsule | null>(null);

  // Efecto para cargar cápsulas cuando cambia la conexión de la wallet
  useEffect(() => {
    if (connected && publicKey) {
      const savedCapsules = localStorage.getItem(`${STORAGE_KEY}_${publicKey.toString()}`);
      if (savedCapsules) {
        const capsules = JSON.parse(savedCapsules);
        // Ordenar cápsulas por fecha de creación (más reciente primero)
        const sortedCapsules = capsules.sort((a: Capsule, b: Capsule) => {
          return new Date(b.unlockDate).getTime() - new Date(a.unlockDate).getTime();
        });
        setCapsules(sortedCapsules);
      }
    } else {
      setCapsules(mockCapsules);
      setFilteredCapsules(mockCapsules);
      setSelectedCapsule(null);
      setIsModifyModalOpen(false);
    }
  }, [connected, publicKey]);

  // Efecto para manejar cierre de ventana
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (connected && publicKey && capsules.length > 0) {
        localStorage.setItem(`${STORAGE_KEY}_${publicKey.toString()}`, JSON.stringify(capsules));
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [capsules, connected, publicKey]);

  // Efecto para manejar nuevas cápsulas
  useEffect(() => {
    const newCapsuleData = localStorage.getItem("newCapsule");
    if (newCapsuleData && connected && publicKey) {
      const newCapsule = JSON.parse(newCapsuleData);
      
      // Verificar si ya existe una cápsula para este heredero
      const existingCapsuleIndex = capsules.findIndex(
        (capsule) => capsule.heirAddresses?.[0] === newCapsule.heirAddresses?.[0]
      );

      let updatedCapsules;
      if (existingCapsuleIndex !== -1) {
        // Actualizar la cápsula existente
        updatedCapsules = [...capsules];
        updatedCapsules[existingCapsuleIndex] = {
          ...updatedCapsules[existingCapsuleIndex],
          ...newCapsule
        };
      } else {
        // Agregar nueva cápsula
        updatedCapsules = [newCapsule, ...capsules];
      }

      setCapsules(updatedCapsules);
      saveCapsules(updatedCapsules);
      localStorage.removeItem("newCapsule");
    }
  }, [updateTrigger, connected, publicKey, capsules]);

  // Guardar cápsulas cuando se modifiquen
  const saveCapsules = (updatedCapsules: Capsule[]) => {
    if (connected && publicKey) {
      localStorage.setItem(`${STORAGE_KEY}_${publicKey.toString()}`, JSON.stringify(updatedCapsules));
    }
  };

  const handleSaveModifications = (updatedCapsule: Capsule) => {
    const updatedCapsules = capsules.map((capsule) => 
      capsule.id === updatedCapsule.id ? { ...capsule, ...updatedCapsule } : capsule
    );
    setCapsules(updatedCapsules);
    saveCapsules(updatedCapsules);
    setIsModifyModalOpen(false);
  };

  const confirmDelete = (capsuleId: number) => {
    const updatedCapsules = capsules.filter(capsule => capsule.id !== capsuleId);
    setCapsules(updatedCapsules);
    // Actualizar localStorage después de eliminar
    saveCapsules(updatedCapsules);
    setIsModifyModalOpen(false);
  };

  useEffect(() => {
    // Filter capsules based on search query and filter type
    const filtered = capsules.filter((capsule) => {
      const matchesSearch = capsule.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || capsule.type.toLowerCase() === filterType.toLowerCase();
      const notDeleted = !capsule.deleted;
      return matchesSearch && matchesType && notDeleted;
    });
    setFilteredCapsules(filtered);
  }, [searchQuery, filterType, capsules]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCapsules.map((capsule, index) => (
        <CapsuleCard
          key={capsule.id}
          capsule={capsule}
          onSelect={onSelectCapsule}
          index={index}
          onSaveModifications={handleSaveModifications}
          setIsModifyModalOpen={setIsModifyModalOpen}
          setSelectedCapsule={setSelectedCapsule}
        />
      ))}
      {selectedCapsule && (
        <ModifyCapsuleModal
          isOpen={isModifyModalOpen}
          onClose={() => setIsModifyModalOpen(false)}
          capsule={selectedCapsule}
          onSave={handleSaveModifications}
        />
      )}
    </div>
  )
}

const CapsuleCard = ({ capsule, onSelect, index, onSaveModifications, setIsModifyModalOpen, setSelectedCapsule }: CapsuleCardProps) => {
  const [timeLeft, setTimeLeft] = useState("")
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showAddresses, setShowAddresses] = useState(false)

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date()
      const unlockDate = new Date(capsule.unlockDate)
      const difference = unlockDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        let timeString = ""
        if (days > 0) {
          timeString = `${days}d ${hours}h ${minutes}m`
        } else if (hours > 0) {
          timeString = `${hours}h ${minutes}m`
        } else if (minutes > 0) {
          timeString = `${minutes}m ${seconds}s`
        } else {
          timeString = `${seconds}s`
        }
        
        setTimeLeft(timeString.trim())
      } else {
        setTimeLeft("Unlocked")
      }
    }

    updateTimeLeft()
    const timer = setInterval(updateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [capsule.unlockDate])

  const handleModify = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (capsule.status !== "Locked") {
      setSelectedCapsule(capsule)
      setIsModifyModalOpen(true)
    }
  }

  const handleExtend = (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("Extend unlock date for capsule:", capsule.id)
    // Implement extend logic here
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    console.log("Deleting capsule:", capsule.id);
    // Implement actual deletion logic here
    setIsDeleteModalOpen(false);
    onSaveModifications({ ...capsule, deleted: true }); // Marcar como eliminada
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="bg-gradient-to-br from-blue-600/60 to-purple-600/60 bg-black/30 border-blue-400/20 hover:from-blue-700/60 hover:to-purple-700/60 transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={() => onSelect(capsule)}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{capsule.name}</h3>
            </div>
            <div className="flex space-x-2">
              {capsule.heirAddresses && capsule.heirAddresses.length > 0 && (
                <>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Aquí tu lógica para ArrowLeftRight
                      }}
                      disabled={timeLeft === "Unlocked"}
                    >
                      <ArrowLeftRight className="h-4 w-4 text-white" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAddresses(true);
                      }}
                    >
                      <Eye className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <Dialog open={showAddresses} onOpenChange={setShowAddresses}>
                    <DialogContent className="bg-black/90 border border-white/20 max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle className="text-lg font-semibold text-white">Heir Addresses</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 mt-4">
                        {capsule.heirAddresses.map((address, i) => (
                          <div key={i} className="flex items-center justify-between gap-2 bg-white/5 p-3 rounded hover:bg-white/10">
                            <span className="font-mono text-sm text-white select-all">{address}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0 hover:bg-white/20"
                              onClick={() => window.open(`https://explorer.solana.com/address/${address}?cluster=devnet`, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-white/10"
                      onClick={handleModify}
                      disabled={timeLeft === "Unlocked"}
                    >
                      <Settings className="h-4 w-4 text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modify Capsule</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:bg-white/10" 
                      onClick={handleDelete}
                      disabled={timeLeft === "Unlocked"}
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete Capsule</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Unlock in: {timeLeft}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Date: {new Date(capsule.unlockDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Heirs: {capsule.heirAddresses?.length || 0}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Downtime: {capsule.downtimeEnabled ? `${capsule.downtimeWallet} ${capsule.downtimeUnit}(s)` : 'Disabled'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Fund Locking: {capsule.isFundLockingEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Total: {
                capsule.fundInputType === "amount" 
                  ? `${capsule.fundAmount} SOL` 
                  : `${capsule.fundPercentage}% (≈ ${((capsule.balance || 0) * Number(capsule.fundPercentage) / 100).toFixed(3)} SOL)`
              }</span>
            </div>
            {(capsule.heirAddresses?.length || 0) > 1 && (
              <div className="flex items-center space-x-2">
                <ArrowRight className="h-4 w-4" />
                <span>Distribution: ≈ {
                  capsule.fundInputType === "amount"
                    ? `${(Number(capsule.fundAmount) / (capsule.heirAddresses?.length || 1)).toFixed(3)} SOL`
                    : `${(Number(capsule.fundPercentage) / (capsule.heirAddresses?.length || 1)).toFixed(2)}% (≈ ${((capsule.balance || 0) * Number(capsule.fundPercentage) / 100 / (capsule.heirAddresses?.length || 1)).toFixed(3)} SOL)`
                } each</span>
              </div>
            )}
          </div>

          <DeleteCapsuleModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            capsuleName={capsule.name}
            capsuleType={capsule.type}
            unlockCountdown={timeLeft}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default CapsuleOverviewDashboard

