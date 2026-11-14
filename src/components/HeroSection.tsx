import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { SculptedDebitCard } from './BitspendCardVisual';
import { ApplePayMark, GooglePayMark, WalletLogo } from './WalletLogo';
import { StripeMeshCanvas } from './StripeMeshCanvas';

interface HeroSectionProps {
  onGetStarted: () => void;
  onGoogleQuickStart: () => void;
  onSelectWallet: (walletId: string) => void;
}

const HERO_WALLETS = [
  { id: 'ledger', name: 'Ledger' },
  { id: 'phantom', name: 'Phantom' },
  { id: 'trust', name: 'Trust Wallet' },
  { id: 'metamask', name: 'MetaMask' },
  { id: 'coinbase', name: 'Coinbase Wallet' },
  { id: 'trezor', name: 'Trezor' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onGoogleQuickStart,
  onSelectWallet,
}) => {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white -mt-16 pt-20 pb-14 lg:pt-24 lg:pb-16 border-b border-[#E3E8EE]"
    >
      {/* Seamless Stripe-style animated mesh sweep extending right behind the transparent header */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-full lg:w-[68%] h-[420px] sm:h-[500px] lg:h-[580px] overflow-hidden"
        style={{
          clipPath: 'polygon(26% 0%, 100% 0%, 100% 72%, 4% 100%)',
        }}
      >
        <StripeMeshCanvas />
        {/* Soft left fade so hero text sits cleanly on crisp white */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(95deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.86) 24%, rgba(255,255,255,0) 54%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Crisp, High-Impact Stripe Typography */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5"
          >
            <div className="text-xs sm:text-sm font-medium text-[#425466]">
              Bitspend crypto card · Zero upfront deposit · No KYC on sign-up
            </div>

            <h1
              className="font-extrabold tracking-tight leading-[1.06] text-balance"
              style={{ fontSize: 'clamp(2.35rem, 4.3vw, 3.65rem)' }}
            >
              <span className="text-[#0A2540]">Spend your bitcoin. </span>
              <span className="text-[#3C4B64]">
                Straight from your wallet, anywhere cards work.
              </span>
            </h1>

            <p className="text-base sm:text-[17px] text-[#425466] leading-relaxed max-w-lg">
              Get your <span className="font-semibold text-[#0A2540]">Bitspend</span> card in
              seconds, connect instantly to Apple Pay or Google Pay, and pay directly from Ledger,
              Phantom, Trust Wallet, and more without depositing funds first.
            </p>

            {/* Primary CTA + Google Quick Sign-up */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onGetStarted}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#635BFF] hover:bg-[#5249F5] rounded-md shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Get started</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onGoogleQuickStart}
                className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold text-[#0A2540] bg-white hover:bg-[#F6F9FC] border border-[#E3E8EE] rounded-md shadow-2xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.3 0 6.08-1.09 8.11-2.96l-3.88-3.05c-1.1.74-2.51 1.18-4.23 1.18-3.25 0-6.01-2.2-7-5.15H.98v3.14C3.05 21.3 7.21 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5 14.02c-.25-.74-.39-1.54-.39-2.36 0-.82.14-1.62.39-2.36V6.16H.98C.35 7.42 0 8.85 0 10.34s.35 2.92.98 4.18l4.02-3.14Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.8 0 3.41.62 4.68 1.84l3.51-3.51C18.07 1.19 15.3 0 12 0 7.21 0 3.05 2.7.98 6.16l4.02 3.14c.99-2.95 3.75-5.15 7-5.15Z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>

            {/* Authentic Apple Pay & Google Pay marks */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <span className="text-xs font-medium text-[#425466]">Instant setup on</span>
              <div className="flex items-center gap-2">
                <ApplePayMark className="h-7 w-auto" />
                <GooglePayMark className="h-7 w-auto" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Non-Interactive Sculpted Debit Cards Side-by-Side */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <SculptedDebitCard
                variant="obsidian"
                holderName="ALEX MERCER"
                lastFour="8841"
              />
              <SculptedDebitCard
                variant="aurora"
                holderName="ALEX MERCER"
                lastFour="3092"
              />
            </div>
          </motion.div>
        </div>

        {/* Clean Monochrome-to-Brand Supported Wallets Row */}
        <div className="mt-12 lg:mt-16 pt-7 border-t border-[#E3E8EE]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-5 items-center">
            {HERO_WALLETS.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                onClick={() => onSelectWallet(wallet.id)}
                className="group flex items-center justify-center sm:justify-start gap-2.5 text-[#425466] hover:text-[#0A2540] transition-colors py-1 cursor-pointer"
              >
                <WalletLogo
                  walletId={wallet.id}
                  className="w-6 h-6 transition-transform duration-200 group-hover:scale-105 shrink-0"
                />
                <span className="text-sm font-bold tracking-tight whitespace-nowrap">
                  {wallet.name}
                </span>
              </button>
            ))}
            <a
              href="#wallets"
              className="flex items-center justify-center sm:justify-end gap-1 text-xs font-semibold text-[#635BFF] hover:text-[#5249F5] whitespace-nowrap"
            >
              <span>+ Many others</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
