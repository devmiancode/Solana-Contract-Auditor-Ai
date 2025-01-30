# Solana Contract Auditor AI

An intelligent system for contract management and auditing in Solana, with AI capabilities for predictive analytics and automated suggestions.

## Prerequisites

- Node.js v20 o superior
- npm o pnpm 9.0.0 o superior
- Rust (última versión estable)
- Solana CLI v1.18.9
- Anchor CLI v0.30.1

## Quick Installation

```bash
# Clone repository
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

## IMPORTANT NOTE:
When running the app reload the first time the web page in order to load correctly the 3D rendered models from SPLINE, the Wallet Widget and the Chatbot! We will be optimizing the webpage in order to make it load all at one fast. But for this Prototype we had to implement this fast loading in order to make things smoot.  


## Key Features

- 🤖 Predictive analytics with AI for smart contracts.
- 💼 Management of legacy capsules in Solana
- 🔒 Automatic funds release system.
- 📊 Real-time monitoring of contracts.
- 🎯 Intelligent suggestions for transfer dates.

## Project Structure

### Solana (./anchor) Program.
Smart contract developed with Anchor Framework that handles:
- Inherited capsule creation.
- Timed release system
- PDA management

### Web Application (./src)
Frontend developed with Next.js that includes:
- Interactive control panel
- AI integration for analytics
- Capsule management interface
- Real-time monitoring

  
## Project Commands

### Frontend Commands
```bash
# Install dependencies
npm install
# or
pnpm install

<<<<<<< HEAD
You will manually need to update the constant in `anchor/lib/basic-exports.ts` to match the new program id.

```shell
npm anchor keys sync
```

#### Build the program:

```shell
npm anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm anchor-localnet
```

#### Run the tests

```shell
npm anchor-test
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
# Start the development server
npm run dev
# or
pnpm dev

# Building the project
npm run build
# or
pnpm build

# Start in production
npm start
# o
pnpm start

# Clear cache and reinstall
npm clean-install
>>>>>>> 1930320 (Details)
```

### Solana/Anchor Commands
```bash
# Configure Solana to devnet
solana config set --url devnet

# Generate a new wallet
solana-keygen new

# Building the program
cd anchor && anchor build

# Deploy to devnet (from the anchor directory)
anchor deploy --provider.cluster devnet

# Obtain wallet balance
solana balance

# Request SOL airdrop on devnet
solana airdrop 2

# Monitoring a hereditary capsule
node src/components/conexion/timemonitor.js

# Search capsules on the web
node src/components/conexion/dappsearch.js
```

## Development Configuration

The project is configured to run immediately after cloning. The OpenAI API key is included for demonstration at the hackathon.

## License

MIT
