import { Connection, PublicKey, Transaction, TransactionInstruction, SystemProgram } from "@solana/web3.js";
import * as borsh from "borsh";
import BN from "bn.js";
import * as nacl from "tweetnacl";

// Función para crear el discriminador (igual que en dappsearch.js)
function createInstructionDiscriminator(name) {
    const preimage = `global:${name}`;
    const buffer = Buffer.from(preimage, 'utf8');
    const hash = require('crypto').createHash('sha256');
    hash.update(buffer);
    return Buffer.from(hash.digest()).slice(0, 8);
}

// 📌 Conexión a la red de Solana
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Clase para manejar números u64
class Numberu64 extends BN {
    toBuffer() {
        const a = super.toArray().reverse();
        const b = Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        const zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    }
}

// 📝 Estructura de datos de la PDA
class VaultData {
    constructor(properties) {
        if (properties) {
            this.sol_amount = new Numberu64(properties.sol_amount.toString());
            this.release_time = new Numberu64(properties.release_time.toString());
            this.destination = properties.destination;
            this.bump = properties.bump;
        } else {
            this.sol_amount = new Numberu64('0');
            this.release_time = new Numberu64('0');
            this.destination = new Uint8Array(32);
            this.bump = 0;
        }
    }

    static schema = {
        struct: {
            sol_amount: 'u64',
            release_time: 'u64',
            destination: { array: { type: 'u8', len: 32 } },
            bump: 'u8'
        }
    };
}

// 🔑 Configuración de la PDA
const programId = new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod");
const [vaultPDA, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("capsule")],
    programId
);

console.log("🚀 Monitoreando la PDA Vault:", vaultPDA.toString());

async function releaseFunds(destinationPubkey, bump) {
    try {
        // Crear el discriminador para release_funds
        const discriminator = Buffer.from([]);  // El programa maneja el discriminador

        // Crear la instrucción de liberación
        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: vaultPDA, isSigner: false, isWritable: true },
                { pubkey: destinationPubkey, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId,
            data: discriminator
        });

        // Crear y configurar la transacción
        const transaction = new Transaction().add(instruction);
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = vaultPDA;

        // Obtener los seeds para el signing de la PDA
        const seeds = [Buffer.from("capsule"), Buffer.from([bump])];
        
        // Firmar la transacción con la PDA
        transaction.sign({
            publicKey: vaultPDA,
            secretKey: null,
            sign: (tx) => {
                const signData = tx.serializeMessage();
                const signature = nacl.sign.detached(
                    signData,
                    seeds
                );
                return signature;
            }
        });

        // Enviar y confirmar la transacción
        const signature = await connection.sendTransaction(transaction);
        console.log("🚀 Transacción enviada:", signature);

        const confirmation = await connection.confirmTransaction(signature);
        console.log("✅ Fondos liberados exitosamente");
        
        return signature;
    } catch (error) {
        console.error("❌ Error al liberar fondos:", error);
        throw error;
    }
}

async function checkAndRelease() {
    try {
        console.log("\n🔄 Verificando cuenta...");
        
        const accountInfo = await connection.getAccountInfo(vaultPDA);
        if (!accountInfo) {
            console.log("❌ La cuenta no existe");
            return;
        }

        // 🔍 Análisis del discriminador
        const discriminator = accountInfo.data.slice(0, 8);
        const expectedDiscriminator = createInstructionDiscriminator('VaultData');
        
        console.log("🔍 Análisis del Discriminador:", {
            recibido: Buffer.from(discriminator).toString('hex'),
            esperado: expectedDiscriminator.toString('hex'),
            coincide: Buffer.from(discriminator).equals(expectedDiscriminator),
            tamañoTotal: accountInfo.data.length,
            primeros16Bytes: Buffer.from(accountInfo.data.slice(0, 16)).toString('hex')
        });

        // Saltar el discriminador de Anchor (8 bytes)
        const data = accountInfo.data.slice(8);
        
        try {
            const vaultData = borsh.deserialize(
                VaultData.schema,
                VaultData,
                Buffer.from(data)
            );

            const destinationPubkey = new PublicKey(vaultData.destination);
            const currentTime = Math.floor(Date.now() / 1000);
            
            console.log("📊 Estado de la cuenta:", {
                cantidadSOL: `${vaultData.sol_amount.toNumber() / 1e9} SOL`,
                tiempoDesbloqueo: new Date(vaultData.release_time.toNumber() * 1000).toLocaleString(),
                walletDestino: destinationPubkey.toString(),
                tiempoActual: new Date(currentTime * 1000).toLocaleString(),
                bump: vaultData.bump
            });

            if (currentTime >= vaultData.release_time.toNumber()) {
                console.log("✨ Tiempo cumplido - Iniciando liberación automática de fondos");
                
                try {
                    const signature = await releaseFunds(destinationPubkey, vaultData.bump);
                    console.log("✅ Fondos liberados exitosamente:", {
                        signature,
                        explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`
                    });
                    
                    // Detener el monitoreo después de liberar los fondos
                    process.exit(0);
                } catch (error) {
                    console.error("❌ Error al liberar fondos:", error);
                }
            } else {
                const timeRemaining = vaultData.release_time.toNumber() - currentTime;
                console.log("⏳ Tiempo restante:", {
                    dias: Math.floor(timeRemaining / 86400),
                    horas: Math.floor((timeRemaining % 86400) / 3600),
                    minutos: Math.floor((timeRemaining % 3600) / 60)
                });
            }
        } catch (error) {
            console.error("❌ Error al deserializar:", {
                mensaje: error.message,
                datosHex: Buffer.from(data).toString('hex'),
                longitudDatos: data.length
            });
        }
    } catch (error) {
        console.error("❌ Error al verificar cuenta:", error.message);
    }
}

// Iniciar monitoreo
console.log("🚀 Iniciando monitor automático de liberación...");
checkAndRelease();
setInterval(checkAndRelease, 30000);

process.on('SIGINT', () => {
    console.log("\n👋 Deteniendo monitor...");
    process.exit(0);
});
