# Solana Contract Auditor AI

Un sistema inteligente para la gestión y auditoría de contratos en Solana, con capacidades de IA para análisis predictivo y sugerencias automatizadas.

## Requisitos Previos

- Node.js v20 o superior
- npm o pnpm 9.0.0 o superior
- Rust (última versión estable)
- Solana CLI v1.18.9
- Anchor CLI v0.30.1

## Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/devmiancode/Solana-Contract-Auditor-Ai.git
cd Solana-Contract-Auditor-Ai

<<<<<<< HEAD
#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
npm install
```

#### Start the web app

```
npm run dev
=======
# Instalar dependencias (elige uno)
npm install
# o
pnpm install

# Iniciar la aplicación (elige uno)
npm run dev
# o
pnpm dev
>>>>>>> 1930320 (Details)
```

## Características Principales

- 🤖 Análisis predictivo con IA para contratos inteligentes
- 💼 Gestión de cápsulas hereditarias en Solana
- 🔒 Sistema de liberación automática de fondos
- 📊 Monitoreo en tiempo real de contratos
- 🎯 Sugerencias inteligentes para fechas de transferencia

## Estructura del Proyecto

### Programa Solana (./anchor)
Contrato inteligente desarrollado con Anchor Framework que maneja:
- Creación de cápsulas hereditarias
- Sistema de liberación temporizada
- Gestión de PDAs

### Aplicación Web (./src)
Frontend desarrollado con Next.js que incluye:
- Panel de control interactivo
- Integración con IA para análisis
- Interfaz de gestión de cápsulas
- Monitoreo en tiempo real

## Comandos del Proyecto

### Comandos Frontend
```bash
# Instalar dependencias
npm install
# o
pnpm install

<<<<<<< HEAD
You will manually need to update the constant in `anchor/lib/basic-exports.ts` to match the new program id.

```shell
pnpm anchor keys sync
```

#### Build the program:

```shell
pnpm anchor-build
```

#### Start the test validator with the program deployed:

```shell
pnpm anchor-localnet
```

#### Run the tests

```shell
pnpm anchor-test
```

#### Deploy to Devnet

```shell
npm anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
npm dev
```

Build the web app

```shell
npm build
=======
# Iniciar el servidor de desarrollo
npm run dev
# o
pnpm dev

# Construir el proyecto
npm run build
# o
pnpm build

# Iniciar en producción
npm start
# o
pnpm start

# Limpiar caché e instalar de nuevo
npm clean-install
>>>>>>> 1930320 (Details)
```

### Comandos Solana/Anchor
```bash
# Configurar Solana a devnet
solana config set --url devnet

# Generar una nueva wallet
solana-keygen new

# Construir el programa
cd anchor && anchor build

# Desplegar en devnet (desde el directorio anchor)
anchor deploy --provider.cluster devnet

# Obtener balance de la wallet
solana balance

# Solicitar airdrop de SOL en devnet
solana airdrop 2

# Monitorear una cápsula hereditaria
node src/components/conexion/timemonitor.js

# Buscar cápsulas en la red
node src/components/conexion/dappsearch.js
```

## Configuración de Desarrollo

El proyecto está configurado para funcionar inmediatamente después de la clonación. La clave API de OpenAI está incluida para demostración en el hackathon.

## Licencia

MIT
