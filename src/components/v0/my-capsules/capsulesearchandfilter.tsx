import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"

interface CapsuleSearchAndFilterProps {
  onSearch: (query: string) => void
  onFilterDate: (filter: string) => void
  onFilterType: (filter: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function CapsuleSearchAndFilter({
  onSearch,
  onFilterDate,
  onFilterType,
  searchQuery,
  setSearchQuery,
}: CapsuleSearchAndFilterProps) {
  //const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-gradient-to-br from-blue-600 to-purple-600 p-6 rounded-lg border border-white/30">
      <div className="flex-1 flex items-center">
        <Input
          type="text"
          placeholder="Search capsules..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-black/50 border-blue-400/30 text-white placeholder-blue-400/50 flex-grow"
        />
        <Button onClick={handleSearch} className="ml-2 bg-blue-400 text-black hover:bg-blue-500">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Select onValueChange={onFilterDate}>
          <SelectTrigger className="w-[180px] bg-black/50 border-blue-400/30 text-white">
            <SelectValue placeholder="Filter by unlock date" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-blue-400/30">
            <SelectItem value="all" className="text-white">
              All dates
            </SelectItem>
            <SelectItem value="late" className="text-white">
              Late
            </SelectItem>
            <SelectItem value="soon" className="text-white">
              Unlocking soon
            </SelectItem>
            <SelectItem value="thisYear" className="text-white">
              This year
            </SelectItem>
            <SelectItem value="nextYear" className="text-white">
              Next year
            </SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onFilterType}>
          <SelectTrigger className="w-[180px] bg-black/50 border-blue-400/30 text-white">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-blue-400/30">
            <SelectItem value="all" className="text-white">
              All types
            </SelectItem>
            <SelectItem value="messages" className="text-white">
              Messages
            </SelectItem>
            <SelectItem value="nfts" className="text-white">
              NFTs
            </SelectItem>
            <SelectItem value="contracts" className="text-white">
              Contracts
            </SelectItem>
            <SelectItem value="hereditary" className="text-white">
              Hereditary
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

