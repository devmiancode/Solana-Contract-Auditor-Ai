use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("B9dR7ceaFRdmHhoY5NDpy4VGkkYE3vydzYWgoyd7qrod");

#[program]
pub mod basic {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.bump = ctx.bumps.vault;
        vault.sol_amount = 0;
        vault.release_time = 0;
        vault.destination = ctx.accounts.signer.key();
        
        msg!("✨ Cuenta PDA inicializada");
        Ok(())
    }

    pub fn store_vault_data(
        ctx: Context<StoreVaultData>,
        sol_amount: u64,
        release_time: u64,
        destination: Pubkey,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        
        // Actualizar los datos en la PDA
        vault.sol_amount = vault.sol_amount.checked_add(sol_amount)
            .ok_or(VaultError::AmountOverflow)?;
        vault.release_time = release_time;
        vault.destination = destination;

        msg!("💰 SOL almacenado: {} lamports", sol_amount);
        msg!("💰 SOL total en vault: {} lamports", vault.sol_amount);
        msg!("🕒 Tiempo de desbloqueo: {}", release_time);
        msg!("📍 Wallet destino: {}", destination);
        
        Ok(())
    }

    pub fn release_funds(ctx: Context<ReleaseFunds>) -> Result<()> {
        let current_time = Clock::get()?.unix_timestamp as u64;

        // 🕒 Verificar si ya pasó el tiempo de desbloqueo
        if current_time < ctx.accounts.vault.release_time {
            msg!("❌ Aún no es el tiempo de liberar los fondos.");
            return err!(VaultError::TimeNotReached);
        }

        let amount = ctx.accounts.vault.sol_amount;

        // 💰 Transferir SOL desde la Vault a la wallet destino
        let seeds = &[b"capsule".as_ref(), &[ctx.bumps.vault]];
        let signer = [&seeds[..]];
        
        system_program::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.destination.to_account_info(),
                },
                &signer,
            ),
            amount,
        )?;

        msg!("✅ SOL enviados automáticamente a la wallet destino.");
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 8 + 8 + 32 + 1, // discriminator + sol_amount + release_time + destination + bump
        seeds = [b"capsule"],
        bump
    )]
    pub vault: Account<'info, VaultData>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StoreVaultData<'info> {
    #[account(
        mut,
        seeds = [b"capsule"],
        bump = vault.bump,
    )]
    pub vault: Account<'info, VaultData>,

    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ReleaseFunds<'info> {
    #[account(
        mut,
        seeds = [b"capsule"],
        bump,
    )]
    pub vault: Account<'info, VaultData>,

    #[account(mut, address = vault.destination)] // 🔒 Solo la wallet destino puede recibir los fondos
    pub destination: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct VaultData {
    pub sol_amount: u64,     // Cantidad de SOL en lamports
    pub release_time: u64,   // Timestamp UNIX de desbloqueo
    pub destination: Pubkey, // Wallet destino
    pub bump: u8,           // Bump de la PDA
}

#[error_code]
pub enum VaultError {
    #[msg("La cantidad de SOL debe ser mayor que 0")]
    InvalidAmount,
    #[msg("Error de overflow al sumar cantidades de SOL")]
    AmountOverflow,
    #[msg("Aún no ha llegado el tiempo de desbloqueo")]
    TimeNotReached,
}
