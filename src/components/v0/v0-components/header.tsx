"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import styles from "@/app/css/header.module.css"
import { usePathname } from "next/navigation"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '@/components/solana/solana-provider'
import { Connection } from '@solana/web3.js'

interface HeaderProps {
  walletConnected?: boolean;
  setWalletConnected?: (connected: boolean) => void;
}

export default function Header({ walletConnected, setWalletConnected }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    const getBalance = async () => {
      if (connected && publicKey) {
        try {
          console.log('Obteniendo balance de:', publicKey.toString());
          // Usar conexión a devnet
          const devnetConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
          const balanceInLamports = await devnetConnection.getBalance(publicKey, 'confirmed');
          const balanceInSOL = balanceInLamports / 1000000000;
          console.log('Balance obtenido:', balanceInSOL, 'SOL');
          setBalance(balanceInSOL);
        } catch (error) {
          console.error('Error al obtener el balance:', error);
          setBalance(0);
        }
      } else {
        setBalance(0);
      }
    };

    getBalance();

    let subscriptionId: number | undefined;
    if (publicKey) {
      const devnetConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
      subscriptionId = devnetConnection.onAccountChange(
        publicKey,
        (accountInfo) => {
          const newBalance = accountInfo.lamports / 1000000000;
          console.log('Balance actualizado:', newBalance, 'SOL');
          setBalance(newBalance);
        },
        'confirmed'
      );
    }

    return () => {
      if (subscriptionId) {
        const devnetConnection = new Connection('https://api.devnet.solana.com', 'confirmed');
        devnetConnection.removeAccountChangeListener(subscriptionId);
      }
    };
  }, [publicKey, connected]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (path: string) => {
    router.push(`/paginas${path}`)
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`${styles.header} bg-black bg-opacity-80 backdrop-blur-sm`}>
      <div className={styles.logoContainer}>
        <Button variant="link" onClick={() => handleNavigation("/")} className={styles.logo}>
          AI Time Capsule
        </Button>
      </div>
      <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNavOpen : ""}`}>
        <Button
          variant="link"
          onClick={() => handleNavigation("/")}
          className={`${styles.navLink} ${pathname === "/paginas" ? styles.active : ""}`}
        >
          Home
        </Button>
        <Button
          variant="link"
          onClick={() => handleNavigation("/create-capsule")}
          className={`${styles.navLink} ${pathname === "/create-capsule" ? styles.active : ""}`}
        >
          Create Capsule
        </Button>
        <Button
          variant="link"
          onClick={() => handleNavigation("/capsules")}
          className={`${styles.navLink} ${pathname === "/capsules" ? styles.active : ""}`}
        >
          Capsules
        </Button>
        <Button
          variant="link"
          onClick={() => handleNavigation("/explore")}
          className={`${styles.navLink} ${pathname === "/explore" ? styles.active : ""}`}
        >
          Explore
        </Button>

        <div className={`${styles.navItem} ${styles.dropdown}`}>
          <Button
            variant="link"
            onClick={() => handleNavigation("/how-it-works")}
            className={`${styles.navLink} ${pathname === "/paginas/how-it-works" ? styles.active : ""}`}
          >
            How It Works
          </Button>
        </div>

        <Button
          variant="link"
          onClick={() => handleNavigation("/roadmap")}
          className={`${styles.navLink} ${pathname === "/paginas/roadmap" ? styles.active : ""}`}
        >
          Roadmap
        </Button>

        <Button
          variant="link"
          onClick={() => handleNavigation("/top-g")}
          className={`${styles.navLink} ${pathname === "/paginas/top-g" ? styles.active : ""}`}
        >
          Top G
        </Button>
      </nav>

      <div className={styles.walletContainer}>
        <div className="flex items-center space-x-4">
          <WalletButton />
          {connected && publicKey && (
            <span className="text-white">
              Balance: {balance.toFixed(2)} SOL
            </span>
          )}
        </div>
      </div>

      <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>
    </header>
  )
}

