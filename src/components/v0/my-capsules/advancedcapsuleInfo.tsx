import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronDown } from "lucide-react"

// Mock data for demonstration
const mockBlockchainLog = [
  { id: 1, timestamp: "2023-07-01 10:30:15", action: "Contract Creation", hash: "0x1234...5678" },
  { id: 2, timestamp: "2023-07-02 14:45:30", action: "Content Update", hash: "0xabcd...efgh" },
  { id: 3, timestamp: "2023-07-03 09:15:00", action: "Ownership Transfer", hash: "0x9876...5432" },
]

const mockAuditTrail = [
  { id: 1, timestamp: "2023-07-01 10:30:15", action: "Capsule Created", user: "Alice" },
  { id: 2, timestamp: "2023-07-02 14:45:30", action: "Content Updated", user: "Alice" },
  { id: 3, timestamp: "2023-07-03 09:15:00", action: "Ownership Transferred", user: "Alice to Bob" },
]

const mockDAOCapsules = [
  { id: 1, name: "DAO Treasury 2025", unlockDate: "2025-01-01", status: "Locked" },
  { id: 2, name: "Community Rewards", unlockDate: "2024-06-30", status: "Processing" },
  { id: 3, name: "Governance Proposals", unlockDate: "2023-12-31", status: "Unlocked" },
]

export default function AdvancedCapsuleInfo() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mt-8 bg-gradient-to-br from-blue-600/60 to-purple-600/60 bg-black/30 border-blue-400/30 hover:bg-gradient-to-br hover:from-blue-700/60 hover:to-purple-700/60 transition-all duration-300">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-between">
          Advanced Capsule Information
          <ChevronDown
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "transform rotate-180" : ""}`}
          />
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="blockchain-log">
              <AccordionTrigger className="text-white">Blockchain Transaction Log</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Timestamp</TableHead>
                      <TableHead className="text-white">Action</TableHead>
                      <TableHead className="text-white">Transaction Hash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBlockchainLog.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-white">{log.timestamp}</TableCell>
                        <TableCell className="text-white">{log.action}</TableCell>
                        <TableCell className="text-white">{log.hash}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="audit-trail">
              <AccordionTrigger className="text-white">Audit Trail</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Timestamp</TableHead>
                      <TableHead className="text-white">Action</TableHead>
                      <TableHead className="text-white">User</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockAuditTrail.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="text-white">{entry.timestamp}</TableCell>
                        <TableCell className="text-white">{entry.action}</TableCell>
                        <TableCell className="text-white">{entry.user}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="dao-capsules">
              <AccordionTrigger className="text-white">DAO-Shared Capsules</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Name</TableHead>
                      <TableHead className="text-white">Unlock Date</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockDAOCapsules.map((capsule) => (
                      <TableRow key={capsule.id}>
                        <TableCell className="text-white">{capsule.name}</TableCell>
                        <TableCell className="text-white">{capsule.unlockDate}</TableCell>
                        <TableCell className="text-white">
                          <Badge
                            variant={
                              capsule.status === "Locked"
                                ? "default"
                                : capsule.status === "Processing"
                                  ? "secondary"
                                  : "outline"
                            }
                            className="text-xs"
                          >
                            {capsule.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      )}
    </Card>
  )
}

