import { Transaction, TransactionInstruction, sendAndConfirmTransaction, PublicKey, SystemProgram } from "@solana/web3.js";
import * as borsh from "borsh";
import BN from "bn.js";

function createInstructionDiscriminator(name) {
  // Anchor usa sha256("global:" + name)[..8]
  const preimage = `global:${name}`;
  // Simular el hash que Anchor usa
  const buffer = Buffer.from(preimage, 'utf8');
  const hash = require('crypto').createHash('sha256');
  hash.update(buffer);
  return Buffer.from(hash.digest()).slice(0, 8);
}

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

// 📝 Definir la estructura de datos para serializar
export class VaultData {
  constructor(fields) {
    this.sol_amount = new Numberu64(fields.sol_amount.toString());
    this.release_time = new Numberu64(fields.release_time.toString());
    this.destination = fields.destination;
    this.bump = fields.bump;
  }

  static schema = {
    struct: {
      sol_amount: 'u64',
      release_time: 'u64',
      destination: { array: { type: 'u8', len: 32 } },
      bump: 'u8'
    }
  };

  serialize() {
    const buffer = Buffer.alloc(8 + 8 + 32 + 1);
    this.sol_amount.toBuffer().copy(buffer, 0);
    this.release_time.toBuffer().copy(buffer, 8);
    this.destination.toBuffer().copy(buffer, 16);
    buffer.writeUInt8(this.bump, 48);
    return buffer;
  }
}

// Esquema para serialización Borsh
export const VAULT_SCHEMA = new Map([
  [VaultData, {
    kind: 'struct',
    fields: [
      ['sol_amount', 'u64'],
      ['release_time', 'u64'],
      ['destination', [32]],
      ['bump', 'u8']
    ]
  }]
]);

// 🔑 Obtener la dirección de la PDA usando la versión recomendada
const [capsulePDA, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from("capsule")],
  new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod")
);

// 🔄 Función para monitorear el tiempo
const monitorTime = async (connection, releaseTime, vaultPDA, destination) => {
    console.log("🚀 Iniciando monitor de tiempo en el navegador");

    const checkAndRelease = async () => {
        try {
            console.log("🔍 Verificando si los fondos pueden ser liberados...");

            // Obtener la información de la cuenta
            const accountInfo = await connection.getAccountInfo(vaultPDA);
            if (!accountInfo) {
                console.log("❌ La Vault PDA no existe.");
                return false;
            }

            // Deserializar los datos (saltando el discriminador de 8 bytes)
            const dataWithoutDiscriminator = accountInfo.data.slice(8);
            const vaultData = borsh.deserialize(
                VaultData.schema,
                VaultData,
                dataWithoutDiscriminator
            );

            console.log("📊 Datos de la Vault:", {
                tiempoDesbloqueo: new Date(vaultData.release_time * 1000).toLocaleString(),
                walletDestino: vaultData.destination.toString(),
                cantidadSOL: vaultData.sol_amount / 1e9,
                bump: vaultData.bump
            });

            const currentTime = Math.floor(Date.now() / 1000);
            
            if (currentTime >= releaseTime) {
                console.log("✅ Tiempo cumplido, preparando liberación de fondos...");

                // Crear instrucción release_funds
                const discriminator = createInstructionDiscriminator('release_funds');
                const instruction = new TransactionInstruction({
                    keys: [
                        { pubkey: vaultPDA, isSigner: false, isWritable: true },
                        { pubkey: destination, isSigner: true, isWritable: true },
                        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
                    ],
                    programId: new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod"),
                    data: discriminator
                });

                const transaction = new Transaction().add(instruction);
                const { blockhash } = await connection.getLatestBlockhash();
                transaction.recentBlockhash = blockhash;
                transaction.feePayer = destination;

                // Aquí necesitaremos que el usuario firme la transacción
                console.log("⚠️ Fondos listos para ser liberados. El heredero debe conectar su wallet y ejecutar release_funds.");
                return true;
            } else {
                const timeRemaining = releaseTime - currentTime;
                console.log("⏳ Tiempo restante:", {
                    segundos: timeRemaining,
                    minutos: Math.floor(timeRemaining / 60),
                    horas: Math.floor(timeRemaining / 3600),
                    dias: Math.floor(timeRemaining / 86400)
                });
                return false;
            }
        } catch (error) {
            console.error("❌ Error en checkAndRelease:", error);
            return false;
        }
    };

    // Primera verificación inmediata
    const shouldStop = await checkAndRelease();
    if (shouldStop) {
        console.log("✅ Monitoreo finalizado: Fondos listos para ser liberados");
        return;
    }

    // Configurar verificación cada 30 segundos
    const intervalId = setInterval(async () => {
        const shouldStop = await checkAndRelease();
        if (shouldStop) {
            clearInterval(intervalId);
            console.log("✅ Monitoreo finalizado: Fondos listos para ser liberados");
        }
    }, 30000);

    // Limpiar el intervalo si la página se cierra
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
        console.log("👋 Deteniendo el monitor...");
    });
};

// 🔄 Función para procesar los datos de los componentes
export const processCapsuleData = async (connection, sender, capsuleData) => {
  console.log("🔍 Datos recibidos en processCapsuleData:", {
    connection: connection ? "Conectado" : "No conectado",
    sender: sender ? sender.toString() : "No hay sender",
    capsuleData: {
      unlockDate: capsuleData.unlockDate,
      fundAmount: capsuleData.fundAmount,
      heirAddresses: capsuleData.heirAddresses,
      fundInputType: capsuleData.fundInputType,
      fundPercentage: capsuleData.fundPercentage,
      balance: capsuleData.balance
    }
  });

  const { 
    unlockDate,      // De date-picker.tsx
    fundAmount,      // De fundamount.tsx
    heirAddresses,   // De heirwallet.tsx
    fundInputType,   // Tipo de entrada (amount/percentage)
    fundPercentage,  // En caso de ser porcentaje
    balance         // Balance actual de la wallet
  } = capsuleData;

  // Validar que tenemos todos los datos necesarios
  if (!unlockDate || !heirAddresses || heirAddresses.length === 0) {
    console.error("❌ Faltan datos requeridos:", {
      unlockDate: unlockDate ? "✅" : "❌",
      heirAddresses: heirAddresses ? `✅ (${heirAddresses.length} direcciones)` : "❌"
    });
    throw new Error("Faltan datos requeridos para la transacción");
  }

  // Calcular el monto real en SOL
  let finalAmount;
  if (fundInputType === "amount") {
    finalAmount = Number(fundAmount);
  } else {
    finalAmount = (Number(fundPercentage) / 100) * balance;
  }

  console.log("💰 Monto calculado:", {
    fundInputType,
    fundAmount,
    fundPercentage,
    balance,
    finalAmount
  });

  // Procesar la transacción para cada heredero
  for (const heirAddress of heirAddresses) {
    const amountPerHeir = finalAmount / heirAddresses.length;
    console.log("👥 Procesando heredero:", {
      address: heirAddress,
      amount: amountPerHeir
    });
    
    try {
      await processTransaction(
        connection,
        sender,
        unlockDate,
        amountPerHeir,
        heirAddress
      );
      console.log(`✅ Transacción completada para heredero: ${heirAddress}`);
    } catch (error) {
      console.error(`❌ Error procesando transacción para ${heirAddress}:`, error);
      throw error;
    }
  }
};

// 🔄 Función para procesar la transacción individual
const processTransaction = async (connection, sender, dateSelected, solAmount, destinationWallet) => {
  try {
    console.log("🔄 Iniciando processTransaction:", {
      dateSelected,
      solAmount,
      destinationWallet
    });

    // 🕒 Obtener la PDA Vault donde se guardarán los SOL
    const [vaultPDA] = await PublicKey.findProgramAddressSync(
      [Buffer.from("capsule")],
      new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod")
    );

    console.log("📍 PDA Vault generada:", vaultPDA.toString());

    // Verificar si la cuenta PDA ya existe
    const pdaAccount = await connection.getAccountInfo(vaultPDA);
    console.log("🔍 Estado de la cuenta PDA:", {
      exists: pdaAccount !== null,
      size: pdaAccount?.data.length || 0,
      owner: pdaAccount?.owner?.toString() || 'N/A'
    });

    // Si la cuenta no existe, necesitamos inicializarla primero
    if (!pdaAccount) {
      console.log("🔧 Inicializando nueva cuenta PDA");
      const initializeDiscriminator = createInstructionDiscriminator('initialize');
      console.log("🔑 Discriminador de initialize generado:", initializeDiscriminator);

      const initializeInstruction = new TransactionInstruction({
        keys: [
          { pubkey: vaultPDA, isSigner: false, isWritable: true },
          { pubkey: sender.publicKey, isSigner: true, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod"),
        data: initializeDiscriminator
      });

      // Crear una transacción separada para la inicialización
      const initTransaction = new Transaction();
      initTransaction.add(initializeInstruction);
      
      const latestBlockhash = await connection.getLatestBlockhash();
      initTransaction.recentBlockhash = latestBlockhash.blockhash;
      initTransaction.feePayer = sender.publicKey;

      console.log("🔄 Enviando transacción de inicialización...");
      const initSignature = await sender.sendTransaction(initTransaction, connection);
      console.log("⏳ Esperando confirmación de inicialización...");
      
      await connection.confirmTransaction(initSignature, {
        commitment: 'confirmed',
        maxRetries: 3
      });
      
      console.log("✅ PDA inicializada correctamente");
    }

    // Verificar balance de la PDA
    const pdaBalance = await connection.getBalance(vaultPDA);
    console.log("💰 Balance actual de la PDA:", {
      balanceLamports: pdaBalance,
      balanceSOL: pdaBalance / 1000000000,
      address: vaultPDA.toString()
    });

    // Verificar balance del pagador
    const payerBalance = await connection.getBalance(sender.publicKey);
    console.log("💰 Balance del pagador:", {
      balanceLamports: payerBalance,
      balanceSOL: payerBalance / 1000000000,
      address: sender.publicKey.toString()
    });

    // 📊 Datos ingresados por el usuario
    const solAmountLamports = solAmount * 1000000000;
    const releaseTime = Math.floor(dateSelected.getTime() / 1000);
    const destinationPublicKey = new PublicKey(destinationWallet);

    console.log("📊 Datos convertidos:", {
      solAmountLamports,
      releaseTime,
      destinationPublicKey: destinationPublicKey.toString()
    });

    // 📦 Serializar los datos usando Borsh
    const vaultData = new VaultData({ 
      sol_amount: solAmountLamports,
      release_time: releaseTime,
      destination: destinationPublicKey,
      bump: bump
    });
    
    console.log("📦 Datos a serializar:", {
      sol_amount: vaultData.sol_amount.toString(),
      release_time: vaultData.release_time.toString(),
      destination: vaultData.destination.toBase58(),
      bump: vaultData.bump
    });
    
    // Serializar los argumentos en el orden correcto
    const argsBuffer = Buffer.concat([
      vaultData.sol_amount.toBuffer(),      // sol_amount: u64
      vaultData.release_time.toBuffer(),    // release_time: u64
      vaultData.destination.toBuffer(),     // destination: Pubkey
    ]);

    // 🔧 Crear la instrucción para almacenar los datos en la PDA
    const discriminator = createInstructionDiscriminator('store_vault_data');
    console.log("🔑 Discriminador de store_vault_data generado:", discriminator);
    
    const storeInstruction = new TransactionInstruction({
      keys: [
        { pubkey: vaultPDA, isSigner: false, isWritable: true },
        { pubkey: sender.publicKey, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      programId: new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod"),
      data: Buffer.concat([
        discriminator,
        argsBuffer
      ])
    });

    console.log("🔍 Datos de la instrucción:", {
      discriminator: discriminator.toString('hex'),
      argsLength: argsBuffer.length,
      totalLength: discriminator.length + argsBuffer.length
    });

    // Calcular el espacio necesario y la renta
    const space = 8 + 8 + 32 + 1;
    const rentExemptionAmount = await connection.getMinimumBalanceForRentExemption(space);

    console.log("💰 Detalles de Rent Exemption:", {
      spaceNeeded: space,
      rentExemption: rentExemptionAmount / 1000000000,
      programId: "B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod"
    });

    // Verificar si hay suficiente SOL para la transacción
    const totalNeeded = rentExemptionAmount + solAmountLamports;
    console.log("💰 Verificación de fondos:", {
      rentNeeded: rentExemptionAmount / 1000000000,
      solNeeded: solAmountLamports / 1000000000,
      totalNeeded: totalNeeded / 1000000000,
      payerHas: payerBalance / 1000000000,
      sufficient: payerBalance >= totalNeeded
    });

    if (payerBalance < totalNeeded) {
      throw new Error(`Fondos insuficientes. Necesita ${totalNeeded / 1000000000} SOL pero solo tiene ${payerBalance / 1000000000} SOL`);
    }

    // Crear instrucción para crear la cuenta y transferir SOL
    const createAccountInstruction = SystemProgram.createAccount({
      fromPubkey: sender.publicKey,
      newAccountPubkey: vaultPDA,
      space: space,
      lamports: rentExemptionAmount,
      programId: new PublicKey("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod")
    });

    // 🚀 Preparar la transacción con las instrucciones en orden correcto
    const transaction = new Transaction();
    
    // Si la cuenta no existe, agregar createAccount
    if (!pdaAccount) {
      console.log("📝 Agregando instrucción createAccount (la PDA no existe)");
      transaction.add(createAccountInstruction);
    }
    
    // Crear instrucción para transferir SOL antes de store_vault_data
    console.log("📝 Agregando instrucción transfer");
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: vaultPDA,
      lamports: solAmountLamports
    });

    // Agregar transferencia de SOL antes de store_vault_data
    console.log("📝 Agregando instrucción transfer");
    transaction.add(transferInstruction);
    
    // Finalmente agregar la instrucción de almacenamiento
    console.log("📝 Agregando instrucción store_vault_data");
    transaction.add(storeInstruction);

    console.log("🔄 Orden de instrucciones:", {
      numInstrucciones: transaction.instructions.length,
      orden: transaction.instructions.map((inst, index) => {
        if (inst === createAccountInstruction) {
          return `${index + 1}. createAccount`;
        } else if (inst === transferInstruction) {
          return `${index + 1}. transfer`;
        } else {
          return `${index + 1}. store_vault_data`;
        }
      })
    });

    // Obtener el último bloque para el blockhash reciente
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = sender.publicKey;

    console.log("🔄 Detalles de la transacción:", {
      feePayer: transaction.feePayer.toString(),
      recentBlockhash: transaction.recentBlockhash,
      numInstrucciones: transaction.instructions.length,
      rentExemptionAmount: rentExemptionAmount / 1000000000,
      solAmount: solAmountLamports / 1000000000,
      totalAmount: (rentExemptionAmount + solAmountLamports) / 1000000000
    });

    try {
      console.log("🔑 Intentando enviar transacción con wallet:", sender.publicKey.toString());
      console.log("📝 Métodos disponibles en wallet:", Object.keys(sender));
      
      // Primero firmar la transacción
      const signedTransaction = await sender.signTransaction(transaction);
      console.log("✅ Transacción firmada correctamente");

      // Luego enviar la transacción firmada
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());
      console.log("✅ Transacción enviada, signature:", signature);
      
      console.log("⏳ Esperando confirmación de la transacción...");

      // Esperar confirmación con más detalles
      const confirmation = await connection.confirmTransaction(signature, {
        commitment: 'confirmed',
        maxRetries: 3
      });

      console.log("📊 Detalles de confirmación:", {
        status: confirmation.value.err ? 'Error' : 'Éxito',
        slot: confirmation.context.slot,
        error: confirmation.value.err
      });

      if (confirmation.value.err) {
        console.error("❌ Error específico en confirmación:", confirmation.value.err);
        throw new Error(`Error en la confirmación: ${confirmation.value.err}`);
      }

      console.log("✅ Transacción confirmada:", signature);
      console.log("🔍 Ver en Solana Explorer:", `https://explorer.solana.com/tx/${signature}?cluster=devnet`);

      // Iniciar el monitor directamente
      console.log("⏰ Iniciando monitoreo de tiempo para liberación automática...");
      const releaseTime = Math.floor(dateSelected.getTime() / 1000);
      const destinationPublicKey = new PublicKey(destinationWallet);
      
      monitorTime(connection, releaseTime, vaultPDA, destinationPublicKey);

    } catch (error) {
      console.error("❌ Error detallado al procesar la transacción:", {
        mensaje: error.message,
        código: error.code,
        nombre: error.name,
        stack: error.stack
      });
      throw error;
    }
  } catch (error) {
    console.error("❌ Error en processTransaction:", error);
    throw error;
  }
};

// Exportar la dirección de la PDA para uso en otros componentes
export const getCapsulePDA = () => {
  return { capsulePDA, bump };
};

console.log("🔑 Dirección de la PDA Capsule:", capsulePDA.toString());
console.log("🔢 Bump:", bump);
